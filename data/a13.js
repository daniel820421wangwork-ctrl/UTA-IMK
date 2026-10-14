(window.ARTICLES = window.ARTICLES || []).push({
  id: 13, day: 2, topic: "Marketing Research",
  title: "How Generative AI Is Transforming Market Research",
  authors: "Jeremy Korst, Stefano Puntoni & Olivier Toubia", year: 2025, source: "Harvard Business Review, May–June 2025, 90–99",
  pages: "10 頁", difficulty: 2,
  oneLiner: "Gen AI 在市場研究的四類機會：支援現有做法、取代現有做法（合成資料）、填補缺口、創造新型資料（數位孿生）；同時須留意偏誤與限制。",
  summary: [
    "作者研究與合作企業兩年，並與 GBK Collective 調查 170+ 位市調從業者，歸納 <b>四類機會</b>：(1) 支援現有做法（supporting）、(2) 取代現有做法（replacing）、(3) 填補既有缺口（filling gaps）、(4) 創造新型資料與洞察（creating new）。",
    "生成式 AI（Gen AI）的四項核心能力——<b>綜整（synthesis）、寫程式（coding）、與人互動（human interaction）、寫作（writing）</b>—— 可套用到市調三階段：機會辨識與研究設計、資料蒐集與分析、報告與傳播。",
    "但也有顯著限制：偏誤、對代表性樣本的模擬不足、實驗中的 confounding、對多感官刺激的情緒反應預測差。"
  ],
  keyPoints: [
    "四類機會：支援、取代、填補缺口、創造新資料。",
    "四項核心能力：綜整、寫程式、與人互動、寫作。",
    "三階段：辨識機會與研究設計 → 資料蒐集與分析 → 報告與傳播。",
    "Synthetic data（合成資料）：模擬真人行為與偏好的人工資料。",
    "Digital twins（數位孿生）：個別顧客的虛擬複製。",
    "限制：偏誤（77% 受訪者擔心）、順序／措辭敏感、價格實驗的 confounding、嗅覺偏好難預測。"
  ],
  concepts: [
    {term: "Synthetic data（合成資料）", def: "由 AI 產生、用來模擬真人行為與偏好的人造資料，可用來預測顧客或競爭對手的反應。調查中 81% 的受訪者已使用或計畫使用。"},
    {term: "Digital twin（數位孿生）", def: "以公開或企業資料建立的「某位顧客的虛擬複製人」，可在面對真人之前，先測試與修正行銷內容與銷售說詞。"},
    {term: "AI-moderated interview（AI 主持的訪談）", def: "由 AI 主持訪談，並依對方回答動態追問，兼具問卷的規模與訪談的深度（例：Outset.ai）。"},
    {term: "Confounding（混淆）", def: "某個沒被考慮的變數同時影響「處理」（例如價格）與「結果」（例如購買），讓因果關係被混淆。Gen AI 不容易把價格視為隨機變動，所以模擬價格實驗常不準。"},
    {term: "合成資料的驗證案例（Evidenza × EY）", def: "兩者雙盲測試：用超過 1,000 個合成人格回答品牌調查，結論與真人調查約 95% 相同。"},
    {term: "Small gen AI models（企業自建的小型生成式 AI 模型）", def: "公司用自己的內部資料訓練、完全自己掌控的小模型（如 Rockfish Data），資料較安全，但多半只能處理結構化資料。"},
    {term: "Prompt sensitivity（對提示敏感）", def: "Gen AI 的回答會受選項順序與標示影響，研究者要像對真人一樣隨機排列選項。"}
  ],
  sections: [
    {title: "四類機會一覽", html: `
      <table class="t"><thead><tr><th>類別</th><th>內涵</th><th>例子</th></tr></thead><tbody>
      <tr><td><b>1. 支援</b><br><small>Supporting</small></td><td>讓現有做法更快、更便宜、更易規模化</td><td>摘要文獻、訪談逐字稿綜整（62%）、分析資料（58%）、撰寫報告（54%）；Outset.ai 的 AI 訪談</td></tr>
      <tr><td><b>2. 取代</b><br><small>Replacing</small></td><td>以合成資料取代部分傳統研究</td><td>Evidenza × EY；Synthetic Users；合成受訪者人格</td></tr>
      <tr><td><b>3. 填補缺口</b><br><small>Filling gaps</small></td><td>在沒有資料或預算時提供證據，當作隨時可用的洞察引擎</td><td>General Mills 產品構想；競爭情報；B2B 客群（難觸及）</td></tr>
      <tr><td><b>4. 創造新資料</b><br><small>Creating new</small></td><td>新型資料與洞察</td><td>數位孿生（Arena、CivicSync、Ogilvy）；NotebookLM；哥倫比亞商學院建立的 2,500 位真人數位孿生面板</td></tr></tbody></table>`},
    {title: "限制與倫理", html: `
      <ul>
        <li><b>偏誤</b>：訓練資料與人為調校造成；模型更像「自由派、高教育者」，較不像 65 歲以上或宗教性強者。</li>
        <li><b>預測劇烈變化</b>：以既有資料訓練，難預測顛覆性創新與行為劇變。</li>
        <li><b>Prompt 敏感</b>：選項順序、標示影響回答。</li>
        <li><b>合成受訪者</b>：回答與真人相近，但變異較小、對措辭敏感、三個月後不穩定。</li>
        <li><b>實驗模擬</b>：價格彈性不合理（confounding）。</li>
        <li><b>多感官</b>：Takasago 發現香氣偏好無法預測。</li>
        <li><b>隱私</b>：提供專有資料給模型的疑慮 → 企業版或內部小模型。</li>
      </ul>`},
    {title: "調查重點數字", html: `
      <ul>
        <li>45% 已使用、另 45% 計畫使用；&gt;70% 擔心副作用；77% 擔心偏誤。</li>
        <li>&gt;80% 同意可提升生產力，且是保持競爭力的關鍵。</li>
        <li>僅 31% 認為 gen AI 資料價值「極佳」（滿意度最低領域之一）。</li>
        <li>&gt;40% 正在試驗數位孿生，另 42% 計畫試驗。</li>
        <li>Stanford/DeepMind 研究：數位孿生重現真人首次回答的準確度約為真人兩週後重答的 85%。</li>
      </ul>`}
  ],
  examTips: [
    "背四類機會與四項能力，並能舉例。",
    "合成資料 ≠ 完全取代：有 bias、變異小、不穩定。",
    "Digital twin 的用途：測試內容與銷售說詞。",
    "Gen AI 做「對話」工作時幻覺問題幾乎消失（Outset.ai 觀點）。"
  ],
  quiz: [
    {q: "下列何者「不是」文中提出的 Gen AI 在市場研究的四類機會之一？", o: ["支援現有做法", "取代現有做法", "完全取代人類研究員", "創造新型資料與洞察"], a: 2, e: "四類為：支援、取代、填補缺口、創造新型資料與洞察。"},
    {q: "「Digital twin」在行銷中的用途是？", o: ["備份資料庫", "虛擬複製個別顧客，以便測試與調整銷售內容", "加密客戶資料", "自動翻譯"], a: 1, e: "在真人面前先測試並精修素材與說詞。"},
    {q: "在價格實驗模擬中，gen AI 遇到什麼問題？", o: ["速度太慢", "把價格視為與其他變數一同變動（confounding），導致不合理的需求曲線", "不懂數學", "無法讀取資料"], a: 1, e: "AI 難以把價格視為隨機。"},
    {q: "哪個領域被作者指出 gen AI 預測效果不佳？", o: ["文字摘要", "多感官刺激（如香氣）的情緒反應", "逐字稿分析", "報告撰寫"], a: 1, e: "Takasago 的經驗。"},
    {q: "Evidenza 與 EY 的雙盲測試結果為何？", o: ["結論差異極大", "合成人格與真人調查結論約 95% 相同", "合成資料完全無用", "只有定性資料相同"], a: 1, e: "'The conclusions were 95% the same.'"},
    {q: "企業對於提供專有資料給 gen AI 的疑慮，常見解法是？", o: ["不使用 AI", "付費企業版或自建受控的小型模型", "公開所有資料", "只用免費版"], a: 1, e: "如企業版、Rockfish Data 的內部模型。"}
  ]
});
