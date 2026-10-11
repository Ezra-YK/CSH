class ComplianceEngine {
  constructor(data) {
    this.data = data;
    this.serverDate = null;
  }

  // 1. Get tamper-proof date from HTTP Header
  async syncServerDate() {
    try {
      const response = await fetch(window.location.href, { method: "HEAD", cache: "no-store" });
      const serverDateHeader = response.headers.get("Date");
      this.serverDate = serverDateHeader ? new Date(serverDateHeader) : new Date();
    } catch {
      this.serverDate = new Date(); // Fallback if offline
    }
    return this.serverDate;
  }

  // 2. Add exact days to an event date
  addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  }

  // 3. Resolve active rule version based on synced date
  resolveActiveVersion(versions) {
    const today = this.serverDate.toISOString().split("T")[0];
    return versions.find(v => {
      const afterStart = today >= v.effectiveFrom;
      const beforeEnd = !v.effectiveTo || today <= v.effectiveTo;
      return afterStart && beforeEnd;
    }) || versions[versions.length - 1];
  }
// NEW: Calculates the exact next date for monthly recurring items
  getNextMonthlyDate(dueDay) {
    const year = this.serverDate.getFullYear(); // Changed to serverDate
    const month = this.serverDate.getMonth();   // Changed to serverDate
    const todayDate = this.serverDate.getDate();// Changed to serverDate

    // If today is past the due day, roll over to the next month
    const targetMonth = todayDate > dueDay ? month + 1 : month;
    
    const nextDate = new Date(year, targetMonth, dueDay);
    const dd = String(nextDate.getDate()).padStart(2, '0');
    const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
    const yyyy = nextDate.getFullYear();
    
    return `${dd}-${mm}-${yyyy}`;
  }

  // 4. Compute all compliances for an entity
  calculate(entityType, eventInputs = {}) {
    const applicable = this.data.filter(item => item.entityTypes.includes(entityType));
    const currentYear = this.serverDate.getFullYear();

    return applicable.map(item => {
      let deadlineDate = "Event Input Required";
      let status = "Pending Date";

      // Case A: Event-driven calculation
      if (item.nature === "Event-Based") {
        const inputDate = eventInputs[item.triggerEvent];
        if (inputDate) {
          deadlineDate = this.addDays(inputDate, item.daysToAdd);
          const isOverdue = this.serverDate.toISOString().split("T")[0] > deadlineDate;
          status = isOverdue ? "Overdue" : "Active";
        }
      }

      // Case B: Fixed Annual Date
      if (item.nature === "Fixed-Annual" || item.nature === "Conditional-Annual") {
        deadlineDate = `${currentYear}-${item.fixedDate}`;
        const isOverdue = this.serverDate.toISOString().split("T")[0] > deadlineDate;
        status = isOverdue ? "Filing Passed for FY" : "Upcoming";
      }

      // Case C: Recurring Versioned (GST/TDS)
      if (item.nature === "Recurring-Monthly") {
        const activeVer = this.resolveActiveVersion(item.versions);
        deadlineDate = activeVer.ruleText;
        status = "Recurring Monthly";
      }

      return {
            title: item.title,
            authority: item.authority,
            authorityLink: item.authorityLink, // ADD THIS LINE
            section: item.section,
            deadline: deadline,
            penalty: item.penalty,
            badgeClass: badgeClass,
            statusText: statusText,
            isRowActive: isRowActive
          };
    });
  }
}