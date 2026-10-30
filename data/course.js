window.COURSE = {
  title: "International Marketing（國際行銷）",
  code: "MARK 5331 · Taipei City",
  instructor: "Dr. Adwait Khare · UT Arlington",
  term: "Fall 2026 · 台北密集班",
  exam: "11/2（一）18:00–20:00 · Open-book · 選擇題，範圍為所有教材（教科書章節＋指定文章）",
  grading: "八次小組練習 850 分（85%）＋期末考 150 分（15%）",
  days: {
    1: {label: "Day 1 · 10/30（五）", note: "導論、行銷基礎、4Ps、STP、消費者決策（教科書 Lamb ch.6, 8）"},
    2: {label: "Day 2 · 10/31（六）", note: "文化框架 · 市場進入與地緣政治 · 談判 · 行銷研究（文章 1–15、Lamb ch.9）"},
    3: {label: "Day 3 · 11/1（日）", note: "產品與服務 · 行銷溝通 · 通路與供應鏈 · 定價（文章 16–28、Lamb ch.11, 12）"}
  },
  topics: {
    "Cultural Frameworks": "文化框架",
    "Market Entry, Geopolitics": "市場進入與地緣政治",
    "Negotiations": "國際談判",
    "Marketing Research": "國際行銷研究",
    "Products & Services": "產品與服務",
    "Marketing Communications": "行銷溝通",
    "Marketing Channels & Supply Chains": "通路與供應鏈",
    "Pricing": "國際定價"
  },
  // 課表：r = 連結的文章編號；c = 連結的教科書章節（0 = 導論）
  schedule: [
    {date: "10/30（五）", time: "18:00–21:00", title: "Day 1：導論與行銷基礎", blocks: [
      {time: "18:00–19:30", topic: "Introduction · Foundations of Marketing", zh: "課程導論；行銷基礎：4Ps 與行銷組合、STP（區隔—目標—定位）、消費者決策", read: "Syllabus、Introduction PPT、Lamb 第 6、8 章", c: [0, 6, 8]},
      {time: "19:30–20:00", topic: "Snack break", zh: "點心休息"},
      {time: "20:00–21:00", topic: "Group Exercise 0（不計分）", zh: "課堂公布"}
    ]},
    {date: "10/31（六）", time: "09:00–21:00", title: "Day 2：文化、市場進入、談判、行銷研究", blocks: [
      {time: "09:00–12:00", topic: "Cultural Frameworks", zh: "文化框架", read: "Hofstede (2011)、Lubin (2015)、Steenkamp (2019)、LaPlante (2005)、Earley & Mosakowski (2004)，另有課堂公布讀物", r: [1, 2, 3, 4, 5], ex: "Group Exercise 1"},
      {time: "12:00–13:30", topic: "Lunch break", zh: "午餐"},
      {time: "13:30–15:45", topic: "Market Entry, Geopolitics", zh: "市場進入與地緣政治", read: "Witt et al. (2023)、Bremmer (2014)、Friedrich, Noam & Ofek (2014)、Shih (2024)，另有課堂公布讀物", r: [6, 7, 8, 9], ex: "Group Exercise 2"},
      {time: "15:45–16:00", topic: "Coffee break", zh: "休息"},
      {time: "16:00–17:30", topic: "Negotiations", zh: "國際談判", read: "Brett (2000)、Yang & De Cremer (2016)、Ogliastri et al. (2023)，另有課堂公布讀物", r: [10, 11, 12], ex: "Group Exercise 3"},
      {time: "17:30–19:00", topic: "Dinner break", zh: "晚餐"},
      {time: "19:00–21:00", topic: "Marketing Research", zh: "國際行銷研究", read: "Lamb 第 9 章、Viglia et al. (2021)、Braun et al. (2024)、Beuthner et al. (2018)，另有課堂公布讀物", r: [13, 14, 15], c: [9], ex: "Group Exercise 4"}
    ]},
    {date: "11/1（日）", time: "09:00–21:00", title: "Day 3：產品、溝通、通路、定價", blocks: [
      {time: "09:00–12:00", topic: "Products and Services", zh: "產品與服務", read: "Lamb 第 11、12 章（全章）、van Mesdag (2000)、Chang & Lii (2008)、Carneiro & Faria (2016)，另有課堂公布讀物", r: [16, 17, 18], c: [11, 12], ex: "Group Exercise 5"},
      {time: "12:00–13:30", topic: "Lunch break", zh: "午餐"},
      {time: "13:30–15:45", topic: "Marketing Communications", zh: "行銷溝通", read: "Czarnecka (2018)、Hudders & Lou (2023)、Lesch et al. (2009)，另有課堂公布讀物", r: [19, 20, 21], ex: "Group Exercise 6"},
      {time: "15:45–16:00", topic: "Coffee break", zh: "休息"},
      {time: "16:00–17:30", topic: "Marketing Channels & Supply Chains", zh: "通路與供應鏈", read: "Etgar & Rachman-Moore (2011)、Handfield (2025)、McCrea (2024)，另有課堂公布讀物", r: [22, 23, 24], ex: "Group Exercise 7"},
      {time: "17:30–19:00", topic: "Dinner break", zh: "晚餐"},
      {time: "19:00–21:00", topic: "Pricing", zh: "國際定價", read: "Hunt (2012)、Narayandas et al. (2000)、Fisher et al. (2023)、Mohammed (2025)，另有課堂公布讀物", r: [25, 26, 27, 28], ex: "Group Exercise 8"}
    ]},
    {date: "11/2（一）", time: "18:00–21:00", title: "期末考", blocks: [
      {time: "18:00–20:00", topic: "OPEN-BOOK EXAM", zh: "開書考：選擇題，範圍為教科書章節與指定文章"},
      {time: "20:15–20:30", topic: "Summary & Conclusion", zh: "課程總結"}
    ]}
  ],
  materials: [
    "<b>Book 1：</b>MKTG 14th ed.（Lamb, Hair & McDaniel；Cengage；ISBN 978-0-357-92921-6）— 第 6、8、9、11、12 章。",
    "<b>指定文章：</b>共 28 篇，PDF 放在 Canvas → Modules → Assigned Papers（Hofstede 只讀 pp. 1–16）。",
    "<b>投影片：</b>約 10/20 前放上 Canvas → Modules → PPTs；投影片以教科書章節為主，另有額外例子與討論題。老師這次也提供了每篇文章的投影片。"
  ],
  rules: [
    "分組：每組 4 人（人數不是 4 的倍數時可有少數 5 人組）。",
    "期末考：選擇題，範圍為所有教材；有正當緊急事由時，補考方式與評分由教授決定。",
    "等第：A ≥ 90%、B 80–89%、C 70–79%、D 60–69%、F < 60%。",
    "上課須攜帶教科書與指定讀物；不可遲到、聊天、使用手機或上網做與課程無關的事。",
    "聯絡教授請用 e-mail（依校規只回覆 UTA 信箱）；上課可能會被點名參與討論。",
    "遵守 UTA 學術誠信守則（Honor Code）。"
  ],
  changes: [
    "評分：「九次小組活動」改為「八次小組練習（Group Exercise 1–8）」，第一天的 Group Exercise 0 不計分；配分仍是 850 / 150。",
    "期末考：課綱前言從「選擇題與申論題」改為只有「選擇題」，與課表一致。",
    "Day 2 晚上行銷研究的教科書改為 Lamb 第 9 章（舊版誤寫為第 6、8 章）。",
    "第一天日期改正為 10/30（舊版誤寫 10/20）。"
  ],
  notes: [
    "第 6–8 頁閱讀清單的小標仍寫「October 30, Saturday」「October 31, Sunday」，實際上 10/31 是星期六、11/1 是星期日。",
    "文章 10：課綱列的是 Brett (2000) International Journal of Psychology，但 PDF 與老師投影片都是 Brett, Gunia & Teucher (2017)；本站依 PDF 與投影片整理。",
    "文章 14（Braun et al., 2024）仍在課綱上，但這次的教材資料夾沒有它的 PDF 與投影片；本站保留先前依原 PDF 寫的筆記。",
    "文章 2（Lubin）沒有投影片；第 9 章沒有投影片。"
  ],
  books: [
    {name: "MKTG 14e（Lamb, Hair, McDaniel）— 唯一指定教科書", items: ["Ch.6 消費者決策（Day 1）", "Ch.8 區隔與目標市場（Day 1）", "Ch.9 行銷研究（Day 2）", "Ch.11 產品開發與管理（Day 3，全章）", "Ch.12 服務與非營利組織行銷（Day 3，全章）"]}
  ]
};
