(window.ARTICLES = window.ARTICLES || []).push({
  id: 19, day: 3, topic: "Marketing Channels & Supply Chains",
  title: "The Future of Global Supply Chains in a Post-COVID-19 World",
  authors: "Rajat Panwar, Jonatan Pinkse & Valentina De Marchi", year: 2022, source: "California Management Review, 64(2), 5–23",
  pages: "19 頁（特刊導論）", difficulty: 2,
  oneLiner: "疫情造成供應鏈的『完美風暴』；解方不是放棄全球供應鏈，而是重新設計：GVC 的四大支柱（地理範圍、升級、治理、國家—企業關係）皆需改變，並以自動化與數位化為關鍵。",
  summary: [
    "疫情造成消費衝擊（需求量與需求點轉移）、供給短缺、物流危機（貨櫃失衡、運價上漲）與意外快速的經濟復甦，形成 <b>perfect storm</b>。",
    "回流（reshoring）與區域化的呼聲高漲，但<b>全面本地化不切實際</b>，且會傷害依賴貿易的開發中國家。重點是『redesign, not abandonment』。",
    "用 GVC 的四大支柱分析：geographic scope、upgrading、governance、state–firm relationships；並預測未來供應鏈管理的變化：監視 + 合作、需求預測與機器學習、微供應鏈、SKU 精簡、最後一哩路。"
  ],
  keyPoints: [
    "94% 的 Fortune 1000 公司受供應鏈中斷影響；3/4 受負面衝擊。",
    "McKinsey：準備充分（雙重採購等）的公司僅銷售下降 5%；未準備者下降 35%。",
    "貨櫃運價 $2,000 → $9,000；美國貨櫃進出口失衡 40%。",
    "2020 年 7 月調查：93% 計畫提高韌性；53% 雙重採購、47% 增加庫存、40% 近岸、38% 區域化。",
    "僅 2% 的公司對第二層以外供應商有可視性。",
    "全球貿易復甦速度：4 季回到衰退前，遠快於 2009（9 季）與 2015（13 季）。"
  ],
  concepts: [
    {term: "Global value chain (GVC)", def: "跨國獨立但互聯公司的功能整合；由 lead firm（如 Apple、Ikea、Ferrero）主導。"},
    {term: "Geographic scope", def: "GVC 支柱一：活動配置於何處；疫情顯示利用區位優勢會帶來脆弱性。依產品性質而異（手套留在海外；呼吸器、疫苗因國安受壓回流）。"},
    {term: "Upgrading", def: "GVC 支柱二：供應商能力提升（產品、流程、功能升級，如 OEM → OBM）；未來重點由效率轉為資訊共享、可靠度、敏捷度。"},
    {term: "Governance", def: "GVC 支柱三：lead firm 如何管理價值分配與關係（captive、relational、modular）；趨向更『發展型』與價值分享（ASML）。"},
    {term: "State–firm relationships", def: "GVC 支柱四：國家作為促進者、監管者、買家、生產者；疫苗民族主義扭曲 GVC。"},
    {term: "Reshoring / Nearshoring / Regionalization", def: "回流本國／近岸／區域化；多數主管預期三年內進行某種程度區域化。"},
    {term: "Micro-supply chains", def: "有限、分散、敏捷的迷你營運模式，靠近購買點；作為並行補充，而非主要策略。"},
    {term: "Redistributed manufacturing / Local Customizer", def: "3D 列印、微型工廠使在地客製化低成本生產成為可能。"},
    {term: "Surveillance + collaboration", def: "企業同時加強監視供應商並與其合作強化能力的悖論式共演。"}
  ],
  sections: [
    {title: "完美風暴四要素", html: `
      <ol>
        <li><b>消費衝擊</b>：需求量與需求『點』改變（餐廳→居家；冷凍櫃、啞鈴、麵粉、居家辦公設備；二手車）。</li>
        <li><b>供給短缺</b>：停工、工人返鄉、上游訂單暫停；缺原料與工人。</li>
        <li><b>物流危機</b>：貨櫃失衡、運價四倍、洛杉磯外海近百艘船積壓；Ikea 購買貨櫃，Walmart、Target 租船。</li>
        <li><b>意外快速復甦</b>：財政刺激與儲蓄推升需求，供需落差擴大。</li>
      </ol>`},
    {title: "為什麼『把製造搬回家』可能是錯的？", html: `
      <ul>
        <li>全面本地化＝逆轉全球經濟體系，不切實際；多虧全球供應鏈才能快速克服口罩、PPE 短缺與全球疫苗供應。</li>
        <li>傷害依賴出口的開發中國家（如孟加拉成衣工人失業無保障），拖累減貧與性別平等。</li>
        <li>結論：<b>Redesign, not abandonment</b>；重點是『resilient（恢復）』與『robust（維持運作）』。</li>
        <li>專家對拜登行政命令抱持懷疑（藥品供應鏈的複雜度）。</li>
      </ul>`},
    {title: "GVC 四大支柱與預測", html: `
      <table class="t"><thead><tr><th>支柱</th><th>變化</th><th>例</th></tr></thead><tbody>
      <tr><td><b>1. Geographic scope</b></td><td>依產品性質調整；區域化供應商選擇可提升穩健性；有限度的回流</td><td>Apple 轉向東南亞但留在區域；Medtronic 信任單一海外子公司</td></tr>
      <tr><td><b>2. Upgrading</b></td><td>能力由效率轉為資訊共享、可靠、敏捷；開發中國家小供應商可能受益；西方也出現『Local Customizer』</td><td>Packhelp（波蘭）；Apple 提升中國供應商能力</td></tr>
      <tr><td><b>3. Governance</b></td><td>更多協調與價值共享；供應商要求重談價格</td><td>ASML 價值共享；Cooper-Standard 要求漲價約 $1 億</td></tr>
      <tr><td><b>4. State–firm</b></td><td>國家參與加深；企業政治／外交責任</td><td>疫苗民族主義；公私 R&D 合作</td></tr></tbody></table>`},
    {title: "未來的供應鏈管理（五大變化）", html: `
      <ul>
        <li><b>可視性與監視 + 合作</b>：RFID（G-Star RAW × Nedap）。</li>
        <li><b>需求預測與機器學習</b>：3–4 週內偵測零售趨勢；IoT、雲端、5G、AI、機器人。</li>
        <li><b>微供應鏈</b>（micro-supply chains）。</li>
        <li><b>產品／SKU 精簡</b>（Mondelez 砍 25% SKU 僅 2% 營收）。</li>
        <li><b>最後一哩路</b>：電商 +25%；自動送貨車（Nuro）；迷你倉（Tesco × Gorillas）。</li>
      </ul>`}
  ],
  examTips: [
    "GVC 四支柱名稱（geographic scope, upgrading, governance, state-firm relationships）必記。",
    "『Redesign, not abandonment』是文章主旨。",
    "回流不等於去全球化；GVC 不會消失。",
    "預測：自動化與數位化是關鍵。"
  ],
  quiz: [
    {q: "下列何者『不是』GVC 分析的四大支柱之一？", o: ["Geographic scope", "Upgrading", "Branding", "State–firm relationships"], a: 2, e: "四支柱：地理範圍、升級、治理、國家—企業關係。"},
    {q: "作者對於『全面回流本國製造』的看法是？", o: ["最佳解方", "不切實際，焦點應是重新設計而非放棄全球供應鏈", "完全可行", "只適用美國"], a: 1, e: "Redesign, not abandonment。"},
    {q: "McKinsey 模型指出準備充分的公司在半導體供應中斷時銷售約下降？", o: ["5%", "15%", "35%", "50%"], a: 0, e: "未準備者下降 35%。"},
    {q: "『Micro-supply chains』的特徵是？", o: ["大規模集中式", "有限、分散、敏捷、靠近購買點", "長期固定合約", "純海外生產"], a: 1, e: "作為並行補充，而非主要策略。"},
    {q: "文中提到企業在『upgrading』方面的重點將如何改變？", o: ["更重視效率", "更重視資訊共享、可靠度與敏捷度", "只重視成本", "只重視品牌"], a: 1, e: "Kano et al. 的觀點。"},
    {q: "疫情下國家角色的哪一種現象被稱為扭曲 GVC 正常運作？", o: ["貿易自由化", "疫苗民族主義", "關稅減讓", "外包"], a: 1, e: "Vaccine nationalism。"}
  ]
});
