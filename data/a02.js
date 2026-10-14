(window.ARTICLES = window.ARTICLES || []).push({
  id: 2, day: 2, topic: "Cultural Frameworks",
  title: "Dimensionalizing Cultures: The Hofstede Model in Context",
  authors: "Geert Hofstede", year: 2011, source: "Online Readings in Psychology and Culture, 2(1)",
  pages: "僅讀 pp.1–16", difficulty: 3,
  oneLiner: "Hofstede 的六大國家文化構面：權力距離、不確定性規避、個人／集體、陽剛／陰柔、長期／短期導向、放縱／克制。",
  summary: [
    "Hofstede 定義文化為『<b>心智的集體程式設計（collective programming of the mind）</b>』，區分一群人與另一群人。國家文化存在於（常為無意識的）<b>價值觀</b>，組織文化則存在於可見的<b>實務（practices）</b>。",
    "模型源自 1970 年代 IBM 在 50 多國、超過 10 萬份問卷的資料。關鍵突破是在『<b>國家層級（ecological level）</b>』而非個人層級分析平均分數。最早有四構面，後加入第五（Bond 的 Confucian Work Dynamism）與第六（Minkov 的 Indulgence vs. Restraint）。",
    "文章強調：構面是『統計傾向』，<b>不可用來刻板化個人</b>；分析層級（個人 vs. 國家）不可混淆；比較時要控制國家財富（GNP per capita）。"
  ],
  keyPoints: [
    "六構面：PDI、UAI、IDV、MAS、LTO、IVR。",
    "Culture ≠ 個人性格；是『鐘形曲線的位移』。",
    "資料來源：IBM 員工（配對樣本，只有國籍不同）。",
    "Individualism 與小權力距離與國家財富高度相關；因果可能是財富→個人主義。",
    "不要把國家分數用來對個人刻板印象（ecological fallacy）。",
    "GLOBE 擴為 9 構面；Trompenaars 7 構面缺乏實證支持。"
  ],
  concepts: [
    {term: "Power Distance（權力距離）", def: "較無權力的成員接受且預期權力分配不平等的程度（從『下位者』角度定義）。高：服從、老師為中心、階層代表存在性不平等；低：諮詢、學生為中心、階層只是角色方便。"},
    {term: "Uncertainty Avoidance（不確定性規避）", def: "社會對模糊、未知情境的容忍度（≠ 風險規避）。高：嚴格規則、對異端不容忍、需要結構與明確；低：容忍模糊、可接受『我不知道』、換工作容易。"},
    {term: "Individualism vs. Collectivism（個人主義／集體主義）", def: "個人被整合進群體的程度。個人：『I』意識、犯錯→罪惡感、任務優先；集體：『We』意識、犯錯→羞恥感、關係優先、內團體／外團體。"},
    {term: "Masculinity vs. Femininity（陽剛／陰柔）", def: "價值觀在性別間的分配。陽剛：堅定、競爭、工作優先於家庭、性別角色明確；陰柔：謙虛、關懷、工作家庭平衡、同情弱者。"},
    {term: "Long- vs. Short-Term Orientation（長期／短期導向）", def: "努力的焦點在未來或過去／現在。長期：堅持、節儉、依地位排序關係、傳統可調整（東亞）；短期：尊重傳統、保護面子、社會義務（美國、澳洲、拉美、非洲）。"},
    {term: "Indulgence vs. Restraint（放縱／克制）", def: "對享樂與樂趣需求之滿足的允許程度。放縱：較快樂、重視休閒與言論自由（美洲、西歐）；克制：嚴格社會規範（東歐、亞洲、穆斯林世界）。"},
    {term: "Confucian Work Dynamism", def: "Michael Bond 的 Chinese Value Survey 所發現的構面，後來被 Hofstede 改名為 Long-Term Orientation 並成為第五構面。"},
    {term: "Ecological level analysis", def: "以國家平均分數而非個人分數做分析；個人層級與國家層級的相關模式可能完全不同。"},
    {term: "High-context vs. Low-context（Hall, 1976）", def: "高情境文化訊息多為隱含；低情境文化幾乎一切明說。"},
    {term: "GLOBE project", def: "Robert House 的大型研究（約 60 社會、17,000 位經理），擴展為 9 構面 × (as is / should be) = 18 分數。"}
  ],
  sections: [
    {title: "六大構面速查表", html: `
      <table class="t"><thead><tr><th>構面</th><th>低分極端</th><th>高分極端</th><th>高分地區例</th></tr></thead><tbody>
      <tr><td><b>Power Distance</b></td><td>平等、諮詢</td><td>服從、階層</td><td>東歐、拉丁、亞洲、非洲</td></tr>
      <tr><td><b>Uncertainty Avoidance</b></td><td>容忍模糊</td><td>需要規則與結構</td><td>東／中歐、拉丁、日本、德語國家</td></tr>
      <tr><td><b>Individualism</b></td><td>Collectivism：我們</td><td>Individualism：我</td><td>已開發、西方（美國最高）；日本居中</td></tr>
      <tr><td><b>Masculinity</b></td><td>Femininity：關懷、謙虛</td><td>Masculinity：競爭、堅定</td><td>日本、德語國家、義大利、墨西哥</td></tr>
      <tr><td><b>Long-Term Orientation</b></td><td>Short：傳統、當下</td><td>Long：堅持、節儉</td><td>東亞 &gt; 東／中歐</td></tr>
      <tr><td><b>Indulgence</b></td><td>Restraint：克制</td><td>Indulgence：享樂</td><td>美洲、西歐、撒哈拉以南非洲</td></tr>
      </tbody></table>`},
    {title: "Hofstede 之前的分類", html: `
      <ul>
        <li><b>Kluckhohn</b>：文化是對人類共通問題的不同回答。</li>
        <li><b>Edward Hall</b>：high- vs. low-context。</li>
        <li><b>Parsons & Shils</b>：五種 pattern variables（如 universalism vs. particularism）。</li>
        <li><b>Kluckhohn & Strodtbeck</b>：人性、人與自然、時間、活動、人際關係。</li>
        <li><b>Inkeles & Levinson</b>：對權威、自我概念、主要衝突 —— 與 IBM 資料的發現吻合。</li>
      </ul>`},
    {title: "研究方法重點", html: `
      <ul>
        <li>IBM 資料庫：50+ 國、10 萬+ 問卷、約 1970 年。員工是『配對樣本』，除國籍外其他特徵相似。</li>
        <li>突破：改看<b>國家層級平均分數</b>的相關，而不是個人層級。</li>
        <li>外部效度：與其他研究的 400+ 個顯著相關；六次主要replications（1990–2002）。</li>
        <li>與 Big Five 人格的連結：Neuroticism 55% 可由 UAI + MAS 解釋；Extraversion 39% 可由 IDV 解釋。</li>
        <li>警告：<b>不要用國家分數去刻板化個人</b>；跨文化研究常混淆層級（Kirkman et al. 發現超過一半的研究沒有區分）。</li>
      </ul>`},
    {title: "其他框架比較", html: `
      <table class="t"><thead><tr><th>框架</th><th>重點</th><th>Hofstede 評語</th></tr></thead><tbody>
      <tr><td>Schwartz</td><td>56 價值；國家層級 7 構面（Embeddedness, Hierarchy, Mastery, ...）</td><td>與 IDV, MAS, UAI 顯著相關</td></tr>
      <tr><td>GLOBE</td><td>9 構面 × as is/should be</td><td>重新分析後仍反映 Hofstede 結構</td></tr>
      <tr><td>Trompenaars</td><td>7 構面（借自 Parsons & Shils 等）</td><td>缺乏實證支持，僅 2 因子與 IDV/PDI 相關</td></tr>
      <tr><td>Inglehart (WVS)</td><td>Well-being vs. survival；Secular-rational vs. traditional</td><td>分別與 IDV+MAS、PDI 相關</td></tr>
      <tr><td>Minkov</td><td>Exclusionism, Indulgence, Monumentalism</td><td>促成第六構面 IVR</td></tr></tbody></table>`}
  ],
  examTips: [
    "背熟六構面的定義與高／低兩端的 3–4 個典型對比。",
    "注意：UAI ≠ 風險規避，而是對『模糊』的容忍度。",
    "Power distance 是從『較無權力者』角度定義。",
    "Collectivism：shame；Individualism：guilt。",
    "第五構面來源：Michael Harris Bond；第六構面來源：Michael Minkov。",
    "避免 stereotyping：構面是統計傾向。"
  ],
  quiz: [
    {q: "Hofstede 對 Power Distance 的定義，是從哪個角度出發？", o: ["掌權者希望保有多少權力", "較無權力的成員接受權力不平等的程度", "政府的集權程度", "組織的層級數量"], a: 1, e: "Power distance 是從『下位者』接受與期待不平等的程度來定義。"},
    {q: "下列何者最能描述高 Uncertainty Avoidance 文化？", o: ["喜歡冒險", "老師被期待知道所有答案、需要明確規則", "鼓勵頻繁換工作", "容忍異端意見"], a: 1, e: "高 UAI：需要結構、規則；老師被期待有所有答案。"},
    {q: "違反規範時，集體主義文化較常出現的感受是？", o: ["罪惡感", "羞恥感", "自豪感", "漠不關心"], a: 1, e: "Collectivism：shame；Individualism：guilt。"},
    {q: "哪一構面最初源自 Michael Harris Bond 的 Chinese Value Survey？", o: ["Power Distance", "Masculinity", "Long-Term Orientation", "Indulgence"], a: 2, e: "原名 Confucian Work Dynamism，後改為 Long-Term Orientation。"},
    {q: "Hofstede 提醒研究者在比較文化構面與其他變數的相關時，必須控制什麼？", o: ["人口數", "國家財富（GNP per capita）", "宗教", "語言"], a: 1, e: "Individualism 與小權力距離與國家財富高度相關。"},
    {q: "Hofstede 模型最初資料主要來自哪家公司？", o: ["Nestlé", "Toyota", "IBM", "Unilever"], a: 2, e: "IBM 在 50+ 國子公司的員工問卷。"},
    {q: "下列何者『不是』Hofstede 六構面之一？", o: ["Indulgence vs. Restraint", "Monochronic vs. Polychronic", "Masculinity vs. Femininity", "Long vs. Short-Term Orientation"], a: 1, e: "Monochronic/Polychronic 是 Hall 的時間概念。"}
  ]
});
