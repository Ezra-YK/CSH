// =========================================================
// 1. GLOBAL INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('/header.html?v=' + new Date().getTime()).then(res => res.text()),
    fetch('/footer.html?v=' + new Date().getTime()).then(res => res.text())
  ])
  .then(([headerData, footerData]) => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) headerPlaceholder.innerHTML = headerData;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerData;

    initializeSite();
    initializeComplianceEngine();
  })
  .catch(error => console.error('Error loading global components:', error));
});

function initializeSite() {
  // Dark Mode Logic
  const themeBtn = document.getElementById('theme-btn');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Mobile Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // --- Mobile Mega-Menu Accordion (Fixed for multiple menus) ---
  const dropdownToggles = document.querySelectorAll('.with-dropdown');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        
        // Find the specific mega-menu that belongs to the clicked link
        const wrapper = toggle.closest('.nav-link-wrapper');
        if (wrapper) {
          const targetMegaMenu = wrapper.querySelector('.mega-menu');
          if (targetMegaMenu) {
            // Close any other open dropdowns first for a clean UI
            document.querySelectorAll('.mega-menu').forEach(menu => {
              if (menu !== targetMegaMenu) {
                menu.classList.remove('mobile-open');
              }
            });
            
            // Toggle the one you just clicked
            targetMegaMenu.classList.toggle('mobile-open');
          }
        }
      }
    });
  });

  // Smart Contact Routing
  document.body.addEventListener('click', (e) => {
    const smartBtn = e.target.closest('.smart-contact-btn');
    if (smartBtn) {
      e.preventDefault();
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = 'tel:+917010658650';
      } else {
        const email = 'caspraveenkumars@gmail.com';
        const subject = encodeURIComponent('Consultation Inquiry - CS HARIHARAN & CO LLP');
        const body = encodeURIComponent('Hello,\n\nI would like to book a consultation to discuss my business requirements.\n\nRegards,');
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
      }
    }
  });

  // Intersection Observer Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Header Elevation on Scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // Careers Application Submission
  const form = document.getElementById('career-form');
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append('_captcha', 'false');

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch('https://formsubmit.co/ajax/yashvanthyk.16@gmail.com', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const data = await response.json();
        if (response.ok) {
          alert('Success! Application and resume sent.');
          form.reset();
        } else {
          alert('Error: ' + (data.message || 'Failed to send.'));
        }
      } catch (error) {
        alert('Network error. Check your connection.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// =========================================================
// 2. STATUTORY COMPLIANCE ENGINE & MASTER REPOSITORY
// =========================================================
const complianceMaster = [
  { id: "INC_22", title: "INC-22: Registered Office Verification", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "incorporationDate", daysToAdd: 30, section: "Section 12(2)", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹1,000/day (max ₹1,00,000) under Sec 12(8)" },
  { id: "INC_20A", title: "INC-20A: Commencement of Business", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "incorporationDate", daysToAdd: 180, section: "Section 10A", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "Co: ₹50,000; Officers: ₹1,000/day (max ₹1,00,000)" },
  { id: "FIRST_AUDITOR", title: "First Auditor Appointment (ADT-1)", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "incorporationDate", daysToAdd: 30, section: "Section 139(6)", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "Fine under Sec 147 (₹25,000 to ₹5,00,000)" },
  { id: "SHARE_CERT", title: "Issue of Share Certificates to Subscribers", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "incorporationDate", daysToAdd: 60, section: "Section 56(4)(a)", authority: "Internal Records", authorityLink: "", penalty: "Company & Officer: ₹50,000 fine each" },
  { id: "AOC_4", title: "AOC-4: Financial Statements Filing", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "agmDate", daysToAdd: 30, section: "Section 137", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹100/day per form without ceiling; Sec 137(3) director fines" },
  { id: "MGT_7", title: "MGT-7 / MGT-7A: Annual Return", entityTypes: ["Private Limited", "Public Limited", "Section 8"], nature: "Event-Based", triggerEvent: "agmDate", daysToAdd: 60, section: "Section 92(4)", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹100/day (max ₹5,00,000 under Sec 92(5))" },
  { id: "DIR_3_KYC", title: "DIR-3 KYC: Director Identification Verification", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP"], nature: "Fixed-Annual", fixedMonthDay: "09-30", section: "Rule 12A of MCA Rules", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "DIN Deactivation + ₹5,000 reactivation fee" },
  { id: "DPT_3", title: "DPT-3: Return of Deposits & Exempted Deposits", entityTypes: ["Private Limited", "Public Limited"], nature: "Fixed-Annual", fixedMonthDay: "06-30", section: "Rule 16 of Deposit Rules", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹5,000 + ₹500/day continuous default" },
  { id: "MSME_1", title: "MSME-1: Half-Yearly Outstanding Dues Return", entityTypes: ["Private Limited", "Public Limited"], nature: "Static-Text", customText: "Apr 30 (for Oct-Mar) | Oct 31 (for Apr-Sep)", section: "Specified Companies (MSME) Order", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "Company: ₹20,000; Directors: ₹20,000" },
  { id: "LLP_FORM_11", title: "LLP Form 11: Annual Return of LLP", entityTypes: ["LLP"], nature: "Fixed-Annual", fixedMonthDay: "05-30", section: "Section 35 of LLP Act", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹100/day without upper threshold limit" },
  { id: "LLP_FORM_8", title: "LLP Form 8: Statement of Account & Solvency", entityTypes: ["LLP"], nature: "Fixed-Annual", fixedMonthDay: "10-30", section: "Section 34 of LLP Act", authority: "ROC (MCA)", authorityLink: "https://www.mca.gov.in/content/mca/global/en/home.html", penalty: "₹100/day without upper threshold limit" },
  { id: "ITR_NON_AUDIT", title: "Income Tax Return (Non-Audit Cases)", entityTypes: ["Individual", "Firm", "LLP"], nature: "Fixed-Annual", fixedMonthDay: "07-31", section: "Section 139(1)", authority: "Income Tax Dept", authorityLink: "https://eportal.incometax.gov.in/iec/foservices/#/login", penalty: "Sec 234F: ₹5,000 (₹1,000 if income < ₹5L) + Interest u/s 234A" },
  { id: "ITR_AUDIT", title: "Income Tax Return (Audit Cases / Companies)", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Fixed-Annual", fixedMonthDay: "10-31", section: "Section 139(1)", authority: "Income Tax Dept", authorityLink: "https://eportal.incometax.gov.in/iec/foservices/#/login", penalty: "Sec 234F penalty + Sec 271B penalty (0.5% turnover, max ₹1.5L)" },
  { id: "ADVANCE_TAX", title: "Advance Tax: Installment Schedule", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Static-Text", customText: "15% by Jun 15 | 45% by Sep 15 | 75% by Dec 15 | 100% by Mar 15", section: "Section 208 / 211", authority: "Income Tax Dept", authorityLink: "https://eportal.incometax.gov.in/iec/foservices/#/login", penalty: "Interest u/s 234B (1%/mo) & 234C (1%/mo)" },
  { id: "TDS_RETURNS", title: "TDS Quarterly Returns (Form 24Q / 26Q)", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Static-Text", customText: "Q1: Jul 31 | Q2: Oct 31 | Q3: Jan 31 | Q4: May 31", section: "Section 200(3) / Rule 31A", authority: "Income Tax Dept", authorityLink: "https://eportal.incometax.gov.in/iec/foservices/#/login", penalty: "₹200/day under Sec 234E (Max up to TDS sum)" },
  { id: "GSTR_1", title: "GSTR-1: Outward Supplies Return", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Recurring-Monthly", versions: [{ effectiveFrom: "2020-01-01", effectiveTo: "2026-12-31", dueDay: 11 }, { effectiveFrom: "2027-01-01", effectiveTo: null, dueDay: 13 }], section: "Section 37 of CGST Act", authority: "GSTN Portal", authorityLink: "https://services.gst.gov.in/services/login", penalty: "₹50/day (₹20/day for NIL return) under Sec 47" },
  { id: "GSTR_3B", title: "GSTR-3B: Monthly Summary & Tax Payment", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Recurring-Monthly", versions: [{ effectiveFrom: "2017-07-01", effectiveTo: null, dueDay: 20 }], section: "Section 39 of CGST Act", authority: "GSTN Portal", authorityLink: "https://services.gst.gov.in/services/login", penalty: "₹50/day (₹20/day for NIL) + 18% p.a. interest u/s 50" },
  { id: "GSTR_9", title: "GSTR-9: GST Annual Return", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Fixed-Annual", fixedMonthDay: "12-31", section: "Section 44 of CGST Act", authority: "GSTN Portal", authorityLink: "https://services.gst.gov.in/services/login", penalty: "₹200/day (Max 0.25% of State turnover)" },
  { id: "GSTR_9C", title: "GSTR-9C: Reconciliation Statement (Turnover > 5Cr)", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Fixed-Annual", fixedMonthDay: "12-31", section: "Section 35(5) of CGST Act", authority: "GSTN Portal", authorityLink: "https://services.gst.gov.in/services/login", penalty: "General statutory penalty up to ₹25,000" },
  { id: "TDS_PAYMENT", title: "TDS Monthly Deposit (Challan 281)", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm", "Individual"], nature: "Recurring-Monthly", versions: [{ effectiveFrom: "2010-04-01", effectiveTo: null, dueDay: 7 }], section: "Section 200(1) / Rule 30", authority: "TRACES", authorityLink: "https://www.tdscpc.gov.in/app/login.xhtml", penalty: "1.5% per month penal interest u/s 201(1A)" },
  { id: "EPF_PAYMENT", title: "EPF Deposit & ECR Filing", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm"], nature: "Recurring-Monthly", versions: [{ effectiveFrom: "2000-01-01", effectiveTo: null, dueDay: 15 }], section: "EPF & MP Act", authority: "EPFO Portal", authorityLink: "https://unifiedportal-emp.epfindia.gov.in/epfo/", penalty: "Damages up to 25% p.a. + 12% penal interest" },
  { id: "ESI_PAYMENT", title: "ESI Monthly Deposit & Return Filing", entityTypes: ["Private Limited", "Public Limited", "Section 8", "LLP", "Firm"], nature: "Recurring-Monthly", versions: [{ effectiveFrom: "2000-01-01", effectiveTo: null, dueDay: 15 }], section: "ESI Act", authority: "ESIC Portal", authorityLink: "https://www.esic.in/ESICInsurance1/ESICInsurancePortal/PortalLogin.aspx", penalty: "12% p.a. interest + tiered damages" }
];

class ComplianceEngine {
  constructor(data) {
    this.data = data;
    this.currentDate = new Date();
  }

  async syncDate() {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      try {
        const res = await fetch(window.location.href, { method: "HEAD", cache: "no-store" });
        const serverDate = res.headers.get("Date");
        if (serverDate) this.currentDate = new Date(serverDate);
      } catch (e) {
        this.currentDate = new Date();
      }
    } else {
      this.currentDate = new Date();
    }
  }

  addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  resolveVersioned(versions) {
    const todayStr = this.currentDate.toISOString().split("T")[0];
    return versions.find(v => {
      const startValid = todayStr >= v.effectiveFrom;
      const endValid = !v.effectiveTo || todayStr <= v.effectiveTo;
      return startValid && endValid;
    }) || versions[versions.length - 1];
  }

  getNextMonthlyDate(dueDay) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const todayDate = this.currentDate.getDate();

    const targetMonth = todayDate > dueDay ? month + 1 : month;
    const nextDate = new Date(year, targetMonth, dueDay);

    const dd = String(nextDate.getDate()).padStart(2, '0');
    const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
    const yyyy = nextDate.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  calculate(entity, inputs, auditStatus) {
    const applicable = this.data.filter(item => item.entityTypes.includes(entity));
    const currentYear = this.currentDate.getFullYear();
    const todayStr = this.currentDate.toISOString().split("T")[0];

    return applicable.filter(item => {
      if (entity !== "Private Limited" && entity !== "Public Limited" && entity !== "Section 8") {
        if (item.id === "ITR_NON_AUDIT" && auditStatus === "Yes") return false;
        if (item.id === "ITR_AUDIT" && auditStatus === "No") return false;
      }
      return true;
    }).map(item => {
      let deadline = "Pending Inputs", badgeClass = "badge-annual", statusText = "Active", isRowActive = true;

      if (item.nature === "Event-Based") {
        const val = inputs[item.triggerEvent];
        if (val) {
          deadline = this.addDays(val, item.daysToAdd);
          const isOverdue = todayStr > deadline;
          badgeClass = isOverdue ? "badge-overdue" : "badge-active";
          statusText = isOverdue ? "Overdue" : "Pending Action";
        } else {
          if (item.triggerEvent === "incorporationDate") {
            deadline = "N/A (Existing Entity)";
            badgeClass = "badge-inactive";
            statusText = "Not Applicable";
            isRowActive = false;
          } else {
            deadline = "Enter event date above";
            badgeClass = "badge-annual";
            statusText = "Pending Inputs";
          }
        }
      } else if (item.nature === "Fixed-Annual") {
        deadline = `${currentYear}-${item.fixedMonthDay}`;
        const isOverdue = todayStr > deadline;
        badgeClass = isOverdue ? "badge-overdue" : "badge-annual";
        statusText = isOverdue ? "Expired this FY" : "Upcoming";
      } else if (item.nature === "Recurring-Monthly") {
        const activeVer = this.resolveVersioned(item.versions);
        deadline = this.getNextMonthlyDate(activeVer.dueDay);
        badgeClass = "badge-recurring";
        statusText = "Next Due";
      } else if (item.nature === "Static-Text") {
        deadline = item.customText;
        badgeClass = "badge-recurring";
        statusText = "Recurring";
      }

      return {
        title: item.title, authority: item.authority, authorityLink: item.authorityLink,
        section: item.section, deadline: deadline, penalty: item.penalty,
        badgeClass: badgeClass, statusText: statusText, isRowActive: isRowActive
      };
    });
  }
}

let complianceApp = null;

async function initializeComplianceEngine() {
  const entitySelect = document.getElementById('entitySelect');
  if (!entitySelect) return; 

  complianceApp = new ComplianceEngine(complianceMaster);
  await complianceApp.syncDate();

  const handleEntityState = () => {
    const entity = entitySelect.value;
    const isCompany = (entity === "Private Limited" || entity === "Public Limited" || entity === "Section 8");
    const isLLP = (entity === "LLP");
    const isSelected = entity !== "";

    const agmGroup = document.getElementById("agmDateGroup");
    const incGroup = document.getElementById("incDateGroup");
    const auditGroup = document.getElementById("auditGroup");

    if (agmGroup) agmGroup.style.display = isCompany ? "flex" : "none";
    if (incGroup) incGroup.style.display = (isCompany || isLLP) ? "flex" : "none";
    if (auditGroup) auditGroup.style.display = (isSelected && !isCompany) ? "flex" : "none";

    runComplianceCalculations();
  };

  entitySelect.addEventListener('change', handleEntityState);

  const calcBtn = document.getElementById('btn-calc');
  if (calcBtn) calcBtn.addEventListener('click', runComplianceCalculations);

  handleEntityState();
}

function runComplianceCalculations() {
  if (!complianceApp) return;

  const entity = document.getElementById("entitySelect").value;
  const auditStatusEl = document.getElementById("auditSelect");
  const auditStatus = auditStatusEl ? auditStatusEl.value : "No";
  const incDateEl = document.getElementById("incorporationDate");
  const agmDateEl = document.getElementById("agmDate");

  const inputs = {
    incorporationDate: incDateEl ? incDateEl.value : "",
    agmDate: agmDateEl ? agmDateEl.value : ""
  };

  const tbody = document.getElementById("tableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (entity === "") {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--color-text-muted); font-weight: 600;">Please select an Entity Type to view applicable compliance deadlines.</td></tr>`;
    return;
  }

  const results = complianceApp.calculate(entity, inputs, auditStatus);

  results.forEach(row => {
    const tr = document.createElement("tr");
    if (!row.isRowActive) {
      tr.style.opacity = '0.55';
    }

    const authorityHTML = row.authorityLink
      ? `<a href="${row.authorityLink}" title="Go to ${row.authority} portal: ${row.authorityLink}" target="_blank" rel="noopener noreferrer" class="authority-link">${row.authority} ↗</a>`
      : row.authority;

    tr.innerHTML = `
      <td><strong>${row.title}</strong></td>
      <td>${authorityHTML}</td>
      <td><span class="law-code">${row.section}</span></td>
      <td>
        <div class="deadline-text">${row.deadline}</div>
        <span class="badge ${row.badgeClass}">${row.statusText}</span>
      </td>
      <td class="penalty-text">${row.penalty}</td>
    `;
    tbody.appendChild(tr);
  });
}
