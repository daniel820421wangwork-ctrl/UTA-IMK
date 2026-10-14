(window.ARTICLES = window.ARTICLES || []).push({
  id: 18, day: 3, topic: "Marketing Channels & Supply Chains",
  title: "The relationship between national cultural dimensions and retail format strategies",
  authors: "Michael Etgar & Dalia Rachman-Moore", year: 2011, source: "Journal of Retailing and Consumer Services, 18, 397–404",
  pages: "8 頁（實證論文）", difficulty: 3,
  oneLiner: "全球大型零售商的母國文化會影響其選擇『通才型（generalist）』或『專才型（specialist）』零售模式。",
  summary: [
    "以 Deloitte 2005 年全球 250 大零售商（取 233 家）與 <b>GLOBE</b> 的五個文化構面，檢驗母國文化與零售形態策略的關聯。",
    "<b>Generalist</b>：同時賣食品與非食品、商品類別多元（one-stop shop）；<b>Specialist</b>：只賣食品或只賣非食品、專注特定類別。34% 為通才，66% 為專才。",
    "結果（邏輯迴歸）：母國高 <b>不確定性規避</b>、高 <b>集體主義</b>（制度與內團體）、低 <b>未來導向</b>（較現在導向）、低 <b>權力距離</b> → 更可能為通才型；相反則偏專才型。四個假設全部成立。"
  ],
  keyPoints: [
    "模型：National cultural values → Organizational culture & skills → Retail format strategy（本研究只檢驗首尾）。",
    "通才零售：較低策略風險、需要協調與分權；專才零售：較高風險、需嚴守單一概念。",
    "H1 UA(+)、H2 Collectivism(+)、H3 Future orientation(−)、H4 Power distance(−)。",
    "控制變數：進入的區域數量（國際化程度）→ 不影響文化效果。",
    "Nagelkerke R² = 0.29；分類正確率 72.5%。",
    "使用 GLOBE『as is』分數而非 Hofstede。"
  ],
  concepts: [
    {term: "Generalist retailer（通才型零售商）", def: "同時賣食品與非食品、商品類別很多的零售商，像一站購足的超市。對一次要買很多類別的顧客很方便。"},
    {term: "Specialist retailer（專才型零售商）", def: "只專注於某一類商品（只賣食品或只賣非食品）的零售商，提供專業資訊與服務；毛利可能較高，但風險也集中。"},
    {term: "Width vs. depth of assortment（商品組合的寬度與深度）", def: "寬度＝賣幾種不同的商品類別（通才或專才的決策）；深度＝每一類別裡有多少品項可選。"},
    {term: "Institutional vs. in-group collectivism（制度集體主義 vs. 內團體集體主義）", def: "GLOBE 把集體主義分兩種：制度性＝社會制度鼓勵集體分配與集體行動；內團體＝個人對家庭或組織的忠誠與凝聚。"},
    {term: "Future orientation（未來導向）", def: "社會重視規劃、投資未來的程度，與 Hofstede 的「長期導向」相近。"},
    {term: "Logistic regression & Nagelkerke R²（邏輯迴歸與配適指標）", def: "邏輯迴歸：預測「是／否」這類二分結果（例如是不是通才零售商）的統計方法；Nagelkerke R² 表示模型解釋力的大小。"},
    {term: "Uppsala school（烏普薩拉學派）", def: "國際化的漸進學習理論：企業累積國際經驗後，資訊與信心增加，會逐步擴大海外投入。"}
  ],
  sections: [
    {title: "四個假設與結果", html: `
      <table class="t"><thead><tr><th>文化構面</th><th>預測通才機率</th><th>理由</th><th>b</th></tr></thead><tbody>
      <tr><td><b>Uncertainty avoidance ↑</b></td><td>↑</td><td>通才可擴張／收縮不同品類，降低策略風險；不確定性規避者偏好低風險業態</td><td>+4.19***</td></tr>
      <tr><td><b>Collectivism ↑</b></td><td>↑</td><td>通才需高度團隊合作與協調；集體文化培養凝聚與合作</td><td>+1.69** / +2.55***</td></tr>
      <tr><td><b>Future orientation ↑</b></td><td>↓</td><td>專才面臨較高風險、需為未來威脅做準備；未來導向文化更適合專才</td><td>−3.45**</td></tr>
      <tr><td><b>Power distance ↑</b></td><td>↓</td><td>通才需分權、自主決策；專才需嚴格遵守單一概念，少授權，與高權力距離相容</td><td>−1.96*</td></tr></tbody></table>`},
    {title: "研究設計", html: `
      <ul>
        <li><b>資料</b>：Deloitte 2005 全球零售商 250 大（Stores 雜誌）；GLOBE 提供其中 233 家母國文化。</li>
        <li><b>依變數</b>：通才＝1（食品與非食品皆有）；專才＝0。</li>
        <li><b>控制變數</b>：目標區域數量（九大區域）。</li>
        <li><b>方法</b>：多層次分析顯示國家層級變異不顯著，故採一般邏輯迴歸。</li>
      </ul>`},
    {title: "管理意涵與限制", html: `
      <ul>
        <li>零售管理者應先分析母國文化價值，才能預測最合適的零售形態策略。</li>
        <li>通才業態可視為一種降低不確定性的策略，與特許加盟、產品適應等風險降低手段競爭。</li>
        <li>限制：僅檢驗首尾變項；僅大型零售商；母國多元化使國家文化較難界定；未檢驗中介的組織文化。</li>
      </ul>`}
  ],
  examTips: [
    "記住方向：UA(+)、Collectivism(+)、Future orientation(−)、Power distance(−) 對『通才』的影響。",
    "通才定義：同時有食品與非食品。",
    "此研究使用 GLOBE 而非 Hofstede 分數（但構面對應）。",
    "進入區域數量不改變文化效果。"
  ],
  quiz: [
    {q: "本研究如何定義『generalist retailer』？", o: ["營收超過 100 億美元", "同時販售食品與非食品", "有電商通路", "有超過 10 個國家的店面"], a: 1, e: "Carries both food and non-food product lines。"},
    {q: "下列哪一種母國文化特徵會提高零售商成為通才型的機率？", o: ["低不確定性規避", "高未來導向", "高集體主義", "高權力距離"], a: 2, e: "H2：集體主義(+)；UA(+)；未來導向(−)；PD(−)。"},
    {q: "為什麼高權力距離與專才零售較為相容？", o: ["專才需要更多資金", "專才依賴嚴守單一概念，少授權；高權力距離偏集權", "專才店面較大", "專才較國際化"], a: 1, e: "專才的概念通常由特定個人發展，需嚴格遵守。"},
    {q: "本研究的控制變數為？", o: ["零售商成立年數", "零售商進入的區域數量（國際化程度）", "員工人數", "營收"], a: 1, e: "Number of target regions。"},
    {q: "文化價值與零售形態之間的概念模型，中介變數是？", o: ["消費者偏好", "組織文化與技能", "政府政策", "科技水準"], a: 1, e: "National culture → organizational culture/skills → format strategy。"},
    {q: "在 233 家零售商中，通才型約佔多少？", o: ["約 34%", "約 50%", "約 66%", "約 90%"], a: 0, e: "34% 為通才、66% 為專才。"}
  ]
});
