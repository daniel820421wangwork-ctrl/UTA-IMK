(window.ARTICLES = window.ARTICLES || []).push({
  id: 12, day: 2, topic: "Marketing Research",
  title: "Examining survey response styles in cross-cultural marketing research: A comparison between Mexican and South Korean respondents",
  authors: "Beuthner, Friedrich, Herbes & Ramme", year: 2018, source: "International Journal of Market Research, 60(3), 257–267",
  pages: "11 頁（實證論文）", difficulty: 2,
  oneLiner: "不同文化的受訪者有不同的『作答風格』：墨西哥傾向極端回答、韓國傾向中間點與避免反對，直接比較問卷分數可能誤導。",
  summary: [
    "<b>Response style</b>：受訪者無論題目內容如何，都以某種固定方式作答。若不加以處理，跨國問卷比較會產生偏誤。",
    "作者用 Hofstede/Minkov 與 GLOBE 預測墨西哥與南韓的作答風格，並以一份關於綠色包裝的 28 題問卷（墨西哥 n = 500、南韓 n = 525）驗證。",
    "結果：預測大致成立。墨西哥 ERS 約 48%（韓國僅 14%）；韓國 MRS 較高（33.6% vs. 22%）；兩國 ARS 都高，但墨西哥的 DRS 約為韓國的兩倍（18.1% vs. 9.1%）。"
  ],
  keyPoints: [
    "五種風格：ERS、NERS、MRS、ARS、DRS。",
    "ERS = [f(1) + f(5)] / k；MRS = f(3)/k；ARS = [f(4)+f(5)]/k；DRS = [f(1)+f(2)]/k。",
    "墨西哥：高權力距離、高陽剛、高 UA、低個人主義 → 預測高 ERS，結果證實。",
    "南韓：高集體主義（特別是制度集體主義）、低性別平等 → 預測高 MRS、低 DRS。",
    "兩國都高 ARS（高權力距離、不願說 no）。",
    "問卷以 5 點量表，美式英文翻成韓文與西班牙文（parallel translation）。"
  ],
  concepts: [
    {term: "Response style（作答風格）", def: "受訪者不管題目內容，以特定方式作答的傾向。"},
    {term: "ERS — Extreme Response Style", def: "傾向選擇量表兩端（1 或 5）。"},
    {term: "NERS — Non-extreme Response Style", def: "避免極端、偏好 2、3、4。"},
    {term: "MRS — Mid-point Response Style", def: "偏好中間值（5 點量表中的 3）；常與 NERS 混淆但不同。"},
    {term: "ARS — Acquiescence Response Style", def: "『同意傾向／yea-saying』，不論內容皆選 agree / strongly agree；可能源於模糊、疲勞、款待或服從的文化規範。"},
    {term: "DRS — Disacquiescence Response Style", def: "『不同意傾向／nay-saying』，傾向選 disagree / strongly disagree。"},
    {term: "Ipsative rescaling", def: "Cunningham 等人建議：以每位受訪者自己的平均與標準差標準化其答案以處理 ERS。"},
    {term: "Parallel translation", def: "由母語者獨立翻譯的方法，用於將問卷翻成各語言。"}
  ],
  sections: [
    {title: "預測 vs. 結果", html: `
      <table class="t"><thead><tr><th>指標</th><th>墨西哥</th><th>南韓</th><th>解讀</th></tr></thead><tbody>
      <tr><td>ERS</td><td><b>約 48%</b></td><td>約 14%</td><td>墨西哥極端回答；其中 84% 為正向極端</td></tr>
      <tr><td>MRS</td><td>22%</td><td><b>33.6%</b></td><td>韓國較多中間；但差距小於預期，因為多選 4 = agree</td></tr>
      <tr><td>ARS</td><td>59.9%</td><td>56.9%</td><td>兩國皆高</td></tr>
      <tr><td>DRS</td><td><b>18.1%</b></td><td>9.1%</td><td>韓國人不願表示反對</td></tr></tbody></table>`},
    {title: "影響作答風格的因素", html: `
      <ul>
        <li><b>ARS</b>：模糊（同意是『我不知道』的替代）、疲勞、款待與服從的文化規範。</li>
        <li><b>MRS</b>：漠不關心或猶豫不決。</li>
        <li>人口特徵（性別、年齡、教育）：研究結果不一致。</li>
        <li>國家／文化：歐盟內地中海國家 ARS、ERS 較高；西語國家高 ERS/ARS；亞洲高 MRS（Harzing, 2006）。</li>
        <li>問卷語言：母語作答 ERS 較高；英語作答 MRS 較高。</li>
      </ul>`},
    {title: "Hofstede／GLOBE 與作答風格的關係（Table 1 概要）", html: `
      <table class="t"><thead><tr><th>文化構面</th><th>ERS</th><th>MRS</th><th>ARS</th></tr></thead><tbody>
      <tr><td>Power distance</td><td>＋</td><td>−</td><td>＋</td></tr>
      <tr><td>Individualism</td><td></td><td>−</td><td>−</td></tr>
      <tr><td>Masculinity</td><td>＋</td><td></td><td></td></tr></tbody></table>
      <p class="small">（方向僅供概念記憶；各研究結果並不完全一致。）</p>`},
    {title: "對實務的建議", html: `
      <ul>
        <li>跨國比較問卷時，高同意比例可能是作答風格而非真實偏好（如法國 vs. 西班牙）。</li>
        <li>計算各國 ERS/MRS/ARS/DRS 分布；偏態提示需調整詮釋。</li>
        <li>處理方式：ipsative 標準化、加入反向題、結構方程模型等；尚無通用解法。</li>
        <li>限制：配額抽樣；單一主題（綠色包裝）；建議未來用機率樣本。</li>
      </ul>`}
  ],
  examTips: [
    "ERS/MRS/ARS/DRS 的定義與算式要會。",
    "墨西哥＝極端、願意不同意；韓國＝中間、避免反對；兩國皆高 ARS。",
    "高 PD → 高 ARS（服從）；跨國資料不可直接比較。",
    "MRS 與 NERS 不同：MRS 只指中間點。"
  ],
  quiz: [
    {q: "作答風格中，『MRS』指的是？", o: ["偏好 1 或 5", "偏好中間值（如 5 點量表的 3）", "總是同意", "總是反對"], a: 1, e: "Mid-point response style。"},
    {q: "哪一國家受訪者在此研究中表現出明顯較高的 ERS？", o: ["南韓", "墨西哥", "德國", "日本"], a: 1, e: "墨西哥 ERS 約 48%（韓國 14%）。"},
    {q: "此研究中兩國在哪一個作答風格上最為相似？", o: ["ERS", "MRS", "ARS（同意傾向）", "DRS"], a: 2, e: "兩國 ARS 都高（約 57–60%）。"},
    {q: "高 Power Distance 預測哪一種作答風格？", o: ["高 ARS", "低 ARS", "低 ERS 且低 ARS", "無關"], a: 0, e: "高權力距離與服從 → 較高的同意傾向。"},
    {q: "DRS 的計算方式為？", o: ["[f(4)+f(5)]/k", "[f(1)+f(2)]/k", "f(3)/k", "[f(1)+f(5)]/k"], a: 1, e: "DRS = 選 1 與 2 的比例。"},
    {q: "為什麼跨國比較問卷分數時須考慮作答風格？", o: ["因為問卷太長", "較高的同意率可能只是作答偏誤而非真實偏好", "因為翻譯錯誤", "因為樣本太大"], a: 1, e: "否則會產生錯誤結論。"}
  ]
});
