(window.ARTICLES = window.ARTICLES || []).push({
  id: 21, day: 3, topic: "Pricing",
  title: "A Step-by-Step Guide to Real-Time Pricing",
  authors: "Marshall Fisher, Santiago Gallino & Jun Li", year: 2023, source: "Harvard Business Review, Nov–Dec 2023, 93–101",
  pages: "9 頁", difficulty: 2,
  oneLiner: "AI 動態定價的七步驟：聚焦 → 消費者決策模型 → 實驗 → 衡量 → 最佳化 → 測試與實施 → 重複；核心循環是『model, measure, maximize』。",
  summary: [
    "多數零售商只是爬取對手價格並以『比最低價低 X』的簡單規則定價，或用歷史資料的機器學習，平均只帶來 <b>≤ 1%</b> 的營收或利潤改善。",
    "作者以兩家合作對象（中國母嬰線上零售商、美國線上家居零售商）示範七步驟流程：前者營收 +11%（奶瓶）至 +19%；後者 4 類別營收 +15%、利潤 +10%。",
    "關鍵在於<b>價格彈性（price elasticity）</b>須透過『實驗』而非歷史資料取得，並用約束式最佳化與對照組檢驗效果。"
  ],
  keyPoints: [
    "七步驟：Choose focus → Build consumer decision model → Experiment → Measure → Optimize → Test & implement → Repeat。",
    "ABC 分類：A＝20% SKU 佔 80% 營收；B＝30% 佔 15%；C＝50% 佔 5%。A 用精細模型，B/C 用可擴展模型。",
    "為何要實驗：歷史價格變異不足，且存在 confounders（如區域行銷活動）。",
    "實驗價格變動約 3%、不超過 5%；每三天調整一次。",
    "約束式最佳化：極大化營收，但毛利率不低於某下限。",
    "對照組＋輪替處理組，以排除季節性（counterfactual 問題）。"
  ],
  concepts: [
    {term: "Price elasticity（價格彈性）", def: "價格上升 1% 所造成的需求變動百分比；中國案例大多落在 −8 至 −2；熱銷品彈性較高（−8 的 SKU 日購 22.5 次）。"},
    {term: "Consumer decision model", def: "預測在自己與對手價格、庫存等因素下需求的公式；可簡可繁，需在 sophistication 與 scalability 間取捨。"},
    {term: "Confounder（混淆因子）", def: "同時影響價格與需求但無法由歷史資料捕捉的因素（如針對性行銷活動）。"},
    {term: "Constrained optimization", def: "在業務約束（如毛利下限、價格上下限）下最大化目標（營收）。"},
    {term: "Counterfactual problem", def: "不知道『若不用新演算法會怎樣』；以對照組解決。"},
    {term: "ABC classification", def: "依營收貢獻將 SKU 分三級；A 級用複雜模型、B/C 用簡化模型。"},
    {term: "Electronic shelf labels", def: "電子貨架標籤；讓實體店也能動態定價。"},
    {term: "Left-digit bias", def: "消費者過度重視價格左邊數字（$4.99 vs. $5.00）；部分人更看右邊數字。"}
  ],
  sections: [
    {title: "七步驟", html: `
      <table class="t"><thead><tr><th>#</th><th>步驟</th><th>重點</th></tr></thead><tbody>
      <tr><td>1</td><td><b>Choose your focus</b></td><td>依銷售集中度選頂尖、中段或長尾；模型 sophistication vs. scalability；ABC 分類</td></tr>
      <tr><td>2</td><td><b>Build a consumer decision model</b></td><td>納入品牌、庫存、對手價、星期效應、其他商品價格；中國：複雜；美國：簡化（規模化）</td></tr>
      <tr><td>3</td><td><b>Experiment</b></td><td>系統性變動價格量測彈性；歷史資料不足；變動 ≈3%、≤5%；每三天</td></tr>
      <tr><td>4</td><td><b>Measure</b></td><td>以資料校準參數；個別層級較難預測；找出哪些對手與缺貨最影響你</td></tr>
      <tr><td>5</td><td><b>Optimize</b></td><td>選擇營收／利潤或兩者；採約束式最佳化（如毛利 ≥ 10%）；高彈性商品比價</td></tr>
      <tr><td>6</td><td><b>Test and implement</b></td><td>控制實驗：處理組 vs. 對照組；輪替處理以排除季節性</td></tr>
      <tr><td>7</td><td><b>Repeat steps 3–6</b></td><td>每半年或視市場動態更新；納入行為因素與新型機器學習</td></tr></tbody></table>`},
    {title: "兩個案例", html: `
      <ul>
        <li><b>中國母嬰線上零售商</b>：原先手動為主、對手價格每日爬取；聚焦 30 個奶瓶 SKU（&gt;80% 營收）→ 營收 <b>+11%</b>（毛利不變）；其他類別最高 <b>+19%</b>。</li>
        <li><b>美國線上家居零售商</b>：銷售分散；簡化模型快速擴展到 &gt;10,000 商品；一個月測試：營收 <b>+15%</b>、利潤 <b>+10%</b>（床、腳凳、咖啡桌、吧台椅）。</li>
        <li>另一國際零售商引入『觀看過的商品』資訊，額外提升營收 5%。</li>
      </ul>`}
  ],
  examTips: [
    "七步驟順序與每步重點。",
    "ABC 分類的百分比。",
    "為何要『實驗』：歷史價格變異不足＋confounders。",
    "『Model, measure, maximize』。",
    "對照組的目的：解決 counterfactual 與季節性。"
  ],
  quiz: [
    {q: "為何作者主張必須透過實驗來估計價格彈性？", o: ["歷史資料太昂貴", "歷史價格變異不足，且存在無法捕捉的 confounders", "實驗較快", "法規要求"], a: 1, e: "歷史資料常因價格跟隨對手而缺乏變異。"},
    {q: "在 ABC 分類中，A 組是指？", o: ["50% SKU 佔 5% 營收", "30% SKU 佔 15% 營收", "20% SKU 佔 80% 營收", "全部 SKU"], a: 2, e: "A：20%→80%；B：30%→15%；C：50%→5%。"},
    {q: "文中建議的價格實驗變動幅度大約是？", o: ["約 3%，且不超過 5%", "約 20%", "約 50%", "不得變動"], a: 0, e: "降低風險又足以捕捉消費者反應。"},
    {q: "『Constrained optimization』在本文中的例子為何？", o: ["最大化營收且毛利不低於特定水準", "最小化廣告成本", "最大化庫存", "固定價格"], a: 0, e: "例：奶瓶類別維持毛利率 ≥ 10%。"},
    {q: "使用對照組的主要目的是？", o: ["降低成本", "排除季節性等時間因素，衡量演算法的真實影響", "增加樣本", "符合法規"], a: 1, e: "解決 counterfactual 問題。"},
    {q: "簡單的『比最低價低 X』策略最大問題是？", o: ["太複雜", "未考慮對手缺貨、需求與其他購買因素，平均改善僅約 1% 以下", "違法", "成本高"], a: 1, e: "忽略庫存與品質、品牌等驅動因素。"}
  ]
});
