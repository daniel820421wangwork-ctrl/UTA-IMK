(window.ARTICLES = window.ARTICLES || []).push({
  id: 1, day: 2, topic: "Cultural Frameworks",
  title: "Dimensionalizing Cultures: The Hofstede Model in Context",
  authors: "Geert Hofstede", year: 2011, source: "Online Readings in Psychology and Culture, 2(1)",
  pages: "僅讀 pp.1–16", difficulty: 3,
  emphasis: "介紹比較各國文化的經典構面架構。",
  oneLiner: "Hofstede 的六大國家文化構面：權力距離、不確定性規避、個人／集體、陽剛／陰柔、長期／短期導向、放縱／克制。",
  summary: [
    "Hofstede 定義文化為「<b>心智的集體程式設計（collective programming of the mind）</b>」，區分一群人與另一群人。國家文化存在於（常為無意識的）<b>價值觀</b>，組織文化則存在於可見的<b>實務（practices）</b>。",
    "模型源自 1970 年代 IBM 在 50 多國、超過 10 萬份問卷的資料。關鍵突破是在「<b>國家層級（ecological level）</b>」而非個人層級分析平均分數。最早有四構面，後加入第五（Bond 的 Confucian Work Dynamism）與第六（Minkov 的 Indulgence vs. Restraint）。",
    "文章強調：構面是「統計傾向」，<b>不可用來刻板化個人</b>；分析層級（個人 vs. 國家）不可混淆；比較時要控制國家財富（GNP per capita）。"
  ],
  keyPoints: [
    "六構面（英文縮寫）：PDI 權力距離、UAI 不確定性規避、IDV 個人主義、MAS 陽剛、LTO 長期導向、IVR 放縱。",
    "文化不等於個人性格：各國差異是整條「鐘形分布曲線」的位移，同一國內個人差異仍很大。",
    "資料來源：IBM 員工（配對樣本，只有國籍不同）。",
    "個人主義與低權力距離都和國家財富高度相關；因果方向較可能是「先富裕，才更個人主義」。",
    "不要拿國家分數去推論個人（否則犯了生態謬誤）。",
    "GLOBE 擴充為 9 個構面；Trompenaars 宣稱的 7 個構面缺乏實證支持。"
  ],
  concepts: [
    {term: "Power Distance（權力距離）", def: "「較沒有權力的人」能接受權力分配不平等的程度。高：習慣服從、老師說了算、階層代表人天生不平等；低：重視被諮詢、學生為中心、階層只是分工方便。"},
    {term: "Uncertainty Avoidance（不確定性規避，亦譯不確定性避免）", def: "一個社會對「模糊、沒把握、沒有規則」的情況有多不自在（不等於不敢冒險）。高：規則多、不容許異議、需要明確答案；低：能接受「我不知道」、對變動較自在。"},
    {term: "Individualism vs. Collectivism（個人主義／集體主義）", def: "個人和群體綁在一起的程度。個人主義：重視「我」、犯錯會感到罪惡、任務優先於關係；集體主義：重視「我們」、犯錯會感到羞恥、關係優先，並區分「自己人」與「外人」。"},
    {term: "Masculinity vs. Femininity（陽剛／陰柔，亦譯男性化／女性化）", def: "社會價值偏向競爭還是關懷。陽剛：強調堅定、競爭、成就，工作優先於家庭，性別角色分明；陰柔：強調謙虛、關懷、生活品質，工作與家庭平衡。這是社會價值的描述，不是在說男或女。"},
    {term: "Long- vs. Short-Term Orientation（長期／短期導向）", def: "努力的重心放在未來還是過去／現在。長期（東亞較多）：重視堅持、節儉、依地位排序人際關係、有羞恥心，傳統可以調整；短期（美國、澳洲、拉美、非洲）：重視傳統、保住面子、履行社會義務。"},
    {term: "Indulgence vs. Restraint（放縱／克制，亦譯放縱／約束）", def: "社會允許人們享受生活、滿足慾望的程度。放縱（美洲、西歐）：較快樂、重視休閒與言論自由；克制（東歐、亞洲、穆斯林世界）：用嚴格的社會規範約束享樂。"},
    {term: "Confucian Work Dynamism（儒家工作動力，亦譯儒家動態論）", def: "Michael Bond 在華人價值調查中發現的構面，內容是堅持、節儉、依地位排序關係等。Hofstede 把它改名為「長期導向」，加進模型成為第五構面。"},
    {term: "Ecological level analysis（以國家為單位的分析）", def: "Hofstede 的作法：不看每個人的答案，而是把同一國家所有人的答案取平均，再比較各國平均分數。這樣得出的規律，不能直接套用在單一個人身上。"},
    {term: "High-context vs. Low-context（高情境／低情境文化，Hall, 1976）", def: "人類學家 Hall 的分類。高情境：很多意思藏在沒說出口的話、氣氛與關係裡（如東亞、中東）；低情境：幾乎所有意思都明確說出來（如美國）。"},
    {term: "GLOBE project（GLOBE 全球領導與組織行為效能研究）", def: "Robert House 發起的大型研究，約 60 個社會、17,000 位經理人。把 Hofstede 構面擴充成 9 個，並分別問「現況（as is）」與「應該如何（should be）」，共 18 個分數。"}
  ],
  sections: [
    {title: "六大構面速查表", html: `
      <table class="t"><thead><tr><th>構面</th><th>低分極端</th><th>高分極端</th><th>高分地區例</th></tr></thead><tbody>
      <tr><td><b>權力距離</b><br><small>Power Distance</small></td><td>平等、諮詢</td><td>服從、階層</td><td>東歐、拉丁語系國家、亞洲、非洲</td></tr>
      <tr><td><b>不確定性規避</b><br><small>Uncertainty Avoidance</small></td><td>容忍模糊</td><td>需要規則與結構</td><td>東歐與中歐、拉丁語系國家、日本、德語國家</td></tr>
      <tr><td><b>個人主義</b><br><small>Individualism</small></td><td>Collectivism：我們</td><td>Individualism：我</td><td>已開發的西方國家（美國最高）；日本居中</td></tr>
      <tr><td><b>陽剛</b><br><small>Masculinity</small></td><td>Femininity：關懷、謙虛</td><td>Masculinity：競爭、堅定</td><td>日本、德語國家、義大利、墨西哥</td></tr>
      <tr><td><b>長期導向</b><br><small>Long-Term Orientation</small></td><td>Short：傳統、當下</td><td>Long：堅持、節儉</td><td>東亞最高，其次為東歐與中歐</td></tr>
      <tr><td><b>放縱</b><br><small>Indulgence</small></td><td>Restraint：克制</td><td>Indulgence：享樂</td><td>美洲、西歐、撒哈拉以南非洲</td></tr>
      </tbody></table>`},
    {title: "Hofstede 之前的分類", html: `
      <ul>
        <li><b>Kluckhohn</b>：文化是對人類共通問題的不同回答。</li>
        <li><b>Edward Hall</b>：high- vs. low-context。</li>
        <li><b>Parsons & Shils</b>：五組「模式變項」（pattern variables，如普遍主義 vs. 特殊主義）。</li>
        <li><b>Kluckhohn & Strodtbeck</b>：人性、人與自然、時間、活動、人際關係。</li>
        <li><b>Inkeles & Levinson</b>：對權威、自我概念、主要衝突 —— 與 IBM 資料的發現吻合。</li>
      </ul>`},
    {title: "研究方法重點", html: `
      <ul>
        <li>IBM 資料庫：50+ 國、10 萬+ 問卷、約 1970 年。員工是「配對樣本」，除國籍外其他特徵相似。</li>
        <li>突破：改看<b>國家層級平均分數</b>的相關，而不是個人層級。</li>
        <li>外部效度：與其他研究的 400+ 個顯著相關；1990–2002 年間六次大型複製研究。</li>
        <li>與 Big Five 人格的連結：各國「神經質」分數差異的 55% 可由不確定性規避＋陽剛解釋；「外向性」的 39% 可由個人主義解釋。</li>
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
    "注意：UAI ≠ 風險規避，而是對「模糊」的容忍度。",
    "Power distance 是從「較無權力者」角度定義。",
    "Collectivism：shame；Individualism：guilt。",
    "第五構面來源：Michael Harris Bond；第六構面來源：Michael Minkov。",
    "避免 stereotyping：構面是統計傾向。"
  ],
  quiz: [
    {q: "Hofstede 對 Power Distance 的定義，是從哪個角度出發？", o: ["掌權者希望保有多少權力", "較無權力的成員接受權力不平等的程度", "政府的集權程度", "組織的層級數量"], a: 1, e: "Power distance 是從「下位者」接受與期待不平等的程度來定義。"},
    {q: "下列何者最能描述高 Uncertainty Avoidance 文化？", o: ["喜歡冒險", "老師被期待知道所有答案、需要明確規則", "鼓勵頻繁換工作", "容忍異端意見"], a: 1, e: "高 UAI：需要結構、規則；老師被期待有所有答案。"},
    {q: "違反規範時，集體主義文化較常出現的感受是？", o: ["罪惡感", "羞恥感", "自豪感", "漠不關心"], a: 1, e: "Collectivism：shame；Individualism：guilt。"},
    {q: "哪一構面最初源自 Michael Harris Bond 的 Chinese Value Survey？", o: ["Power Distance", "Masculinity", "Long-Term Orientation", "Indulgence"], a: 2, e: "原名 Confucian Work Dynamism，後改為 Long-Term Orientation。"},
    {q: "Hofstede 提醒研究者在比較文化構面與其他變數的相關時，必須控制什麼？", o: ["人口數", "國家財富（GNP per capita）", "宗教", "語言"], a: 1, e: "Individualism 與小權力距離與國家財富高度相關。"},
    {q: "Hofstede 模型最初資料主要來自哪家公司？", o: ["Nestlé", "Toyota", "IBM", "Unilever"], a: 2, e: "IBM 在 50+ 國子公司的員工問卷。"},
    {q: "下列何者「不是」Hofstede 六構面之一？", o: ["Indulgence vs. Restraint", "Monochronic vs. Polychronic", "Masculinity vs. Femininity", "Long vs. Short-Term Orientation"], a: 1, e: "Monochronic/Polychronic 是 Hall 的時間概念。"}
  ]
});
