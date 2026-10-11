const complianceMaster = [
  // --- 1. INCORPORATION & INITIAL SETUP (EVENT-TRIGGERED) ---
  {
    id: "INC_22",
    title: "INC-22: Registered Office Verification",
    entityTypes: ["Private Limited", "Public Limited", "OPC"],
    nature: "Event-Based",
    triggerEvent: "incorporationDate",
    daysToAdd: 30,
    section: "Section 12(2)",
    filingPlatform: "ROC (MCA)",
    penalty: "₹1,000/day (max ₹1,00,000) under Sec 12(8)"
  },
  {
    id: "INC_20A",
    title: "INC-20A: Declaration of Commencement of Business",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "incorporationDate",
    daysToAdd: 180,
    section: "Section 10A",
    filingPlatform: "ROC (MCA)",
    penalty: "Company: ₹50,000; Officers: ₹1,000/day (max ₹1,00,000)"
  },
  {
    id: "AUDITOR_FIRST",
    title: "Appointment of First Auditor (Board Meeting & ADT-1)",
    entityTypes: ["Private Limited", "Public Limited", "OPC"],
    nature: "Event-Based",
    triggerEvent: "incorporationDate",
    daysToAdd: 30, // Appointment within 30 days; ADT-1 within 15 days of appointment
    section: "Section 139(6)",
    filingPlatform: "ROC (MCA)",
    penalty: "Section 147 fine (₹25,000 to ₹5,00,000)"
  },
  {
    id: "SHARE_CERT",
    title: "Issue of Share Certificates to MOA Subscribers",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "incorporationDate",
    daysToAdd: 60, // 2 months under Sec 56(4)(a)
    section: "Section 56(4)(a)",
    filingPlatform: "Internal (SH-1 & MGT-1)",
    penalty: "Company: ₹50,000; Officers in default: ₹50,000"
  },

  // --- 2. ANNUAL CALENDAR COMPLIANCES (FIXED & TIME-VERSIONED) ---
  {
    id: "DIR_3_KYC",
    title: "DIR-3 KYC: Director Identification Number Verification",
    entityTypes: ["Private Limited", "Public Limited", "OPC", "LLP"],
    nature: "Fixed-Annual",
    fixedDate: "09-30", // September 30
    section: "Rule 12A of MCA Rules",
    filingPlatform: "ROC (MCA)",
    penalty: "DIN Deactivation + ₹5,000 fee for reactivation"
  },
  {
    id: "FLA_RETURN",
    title: "FLA Return (Foreign Liabilities and Assets)",
    entityTypes: ["Private Limited", "Public Limited", "LLP"],
    nature: "Conditional-Annual",
    conditionText: "Applicable if company has received FDI or made ODI",
    fixedDate: "07-15", // July 15
    section: "FEMA Regulations",
    filingPlatform: "RBI (FIRMS Portal)",
    penalty: "Penalties under Section 13 of FEMA (up to 3x sum involved)"
  },

  // --- 3. POST-AGM ANNUAL FILINGS (AGM-EVENT TRIGGERED) ---
  {
    id: "AOC_4",
    title: "AOC-4: Filing of Financial Statements",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "agmDate",
    daysToAdd: 30,
    section: "Section 137",
    filingPlatform: "ROC (MCA)",
    penalty: "₹100/day per form without ceiling; Sec 137(3) director fines"
  },
  {
    id: "MGT_7",
    title: "MGT-7 / MGT-7A: Annual Return",
    entityTypes: ["Private Limited", "Public Limited", "OPC"],
    nature: "Event-Based",
    triggerEvent: "agmDate",
    daysToAdd: 60,
    section: "Section 92(4)",
    filingPlatform: "ROC (MCA)",
    penalty: "₹100/day (max ₹5,00,000 under Sec 92(5))"
  },

  // --- 4. CORPORATE EVENT-BASED COMPLIANCES ---
  {
    id: "PAS_3",
    title: "PAS-3: Return of Allotment of Shares",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "allotmentDate",
    daysToAdd: 30,
    section: "Section 39(4) / 42",
    filingPlatform: "ROC (MCA)",
    penalty: "₹1,000/day (max ₹25,00,000)"
  },
  {
    id: "DIR_12",
    title: "DIR-12: Particulars of Appointment/Change of Director/KMP",
    entityTypes: ["Private Limited", "Public Limited", "OPC"],
    nature: "Event-Based",
    triggerEvent: "directorChangeEvent",
    daysToAdd: 30,
    section: "Section 170 / Rule 18",
    filingPlatform: "ROC (MCA)",
    penalty: "Section 172 general penalties"
  },
  {
    id: "CHG_1",
    title: "CHG-1: Creation or Modification of Charge",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "chargeCreationDate",
    daysToAdd: 30,
    section: "Section 77",
    filingPlatform: "ROC (MCA)",
    penalty: "Higher ad-valorem ROC filing fees after 30 days"
  },
  {
    id: "CHG_4",
    title: "CHG-4: Satisfaction of Charge",
    entityTypes: ["Private Limited", "Public Limited"],
    nature: "Event-Based",
    triggerEvent: "chargeSatisfactionDate",
    daysToAdd: 30,
    section: "Section 82",
    filingPlatform: "ROC (MCA)",
    penalty: "Section 86 penalties"
  },

  // --- 5. GST COMPLIANCE (TIME-VERSIONED FOR CIRCULAR SHIFTS) ---
  {
    id: "GSTR_1",
    title: "GSTR-1: Outward Supplies Return",
    entityTypes: ["Private Limited", "Public Limited", "LLP", "Firm", "Individual"],
    nature: "Recurring-Monthly",
    category: "GST",
    versions: [
      {
        effectiveFrom: "2020-01-01",
        effectiveTo: "2026-12-31",
        dueDay: 11,
        ruleText: "11th of succeeding month"
      },
      {
        effectiveFrom: "2027-01-01",
        effectiveTo: null,
        dueDay: 13,
        ruleText: "13th of succeeding month (Updated as per Notification)"
      }
    ],
    penalty: "Late fee ₹50/day (₹20/day for NIL return) under Sec 47"
  }
];