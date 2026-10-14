(window.ARTICLES = window.ARTICLES || []).push({
  id: 16, day: 3, topic: "Marketing Communications",
  title: "A cross-cultural comparison of perceived hazard in response to warning components and configurations: US vs. China",
  authors: "Mary F. Lesch, Pei-Luen Patrick Rau, Zhengxuan Zhao & Chengyi Liu", year: 2009, source: "Applied Ergonomics, 40, 953–961",
  pages: "9 頁（實證論文）", difficulty: 2,
  oneLiner: "美國 ANSI 的警示標準元素（顏色、警示字、符號）在中國的『危險感知』不同：中國受試者整體評分較低，黃色與 CAUTION／WARNING 的排序也不同，因此需要更強的警示。",
  summary: [
    "背景：國際警示標準 harmonization 的趨勢，使得需要檢驗 <b>ANSI Z535</b> 標準是否適用於不同文化。",
    "實驗：40 位美國與 43 位中國大學生，對顏色（6 種）、警示字（6 個）、符號（3 種）與 11 種複合配置，以 1–9 評定『感知危險度（perceived hazard）』。",
    "發現：<b>美國受試者全面給予較高評分</b>；顏色排序跨文化不同（中國：黃最低、橘高於紅）；警示字 WARNING vs. CAUTION 順序相反；複合配置的『相對』排序則在兩文化相似，但中國的『絕對』評分仍較低。"
  ],
  keyPoints: [
    "ANSI 建議：DANGER（白字紅底）> WARNING（黑字橘底）> CAUTION（黑字黃底）；安全警示符號（三角驚嘆號）。",
    "美國受試者顏色排序（低→高）：blue, green, yellow, black, orange, red；中國：yellow, blue, green, red, black, orange。",
    "中國受試者：黃色最低（2.9）；橘（7.2）高於紅（6.4）。",
    "警示字：美國 BEWARE/WARNING > CAUTION；中國相反（CAUTION > WARNING）。",
    "符號：美國最高為 cracked skull & crutches；中國最高為安全警示符號。",
    "實務：對中國使用者需要『更強』的警示元素以達到同等感知危險。"
  ],
  concepts: [
    {term: "Perceived hazard（感知危險度）", def: "使用者對警示標籤所傳達危險程度的主觀評估；被認為需要達到某閾值才會觸發遵從行為。"},
    {term: "Signal words", def: "NOTICE、CAUTION、WARNING、DANGER 等；ANSI 以它們表示可能性與傷害嚴重度。"},
    {term: "ANSI Z535.4", def: "美國國家標準協會的產品安全標誌與標籤標準：DANGER=紅、WARNING=橘、CAUTION=黃。"},
    {term: "ANSI Z535.2", def: "環境與設施安全標誌標準；藍色＋NOTICE 用於設備／財產損害。"},
    {term: "Safety alert symbol", def: "含驚嘆號的三角形符號，表示人身傷害風險。研究指出其對感知危險影響有限。"},
    {term: "Cracked skull & crutches", def: "Barnett & Wambaja 提議的替代符號；對美國受試者提升感知危險較有效。"},
    {term: "Culture（Goldberger & Veroff）", def: "一套共享意義的系統，提供成員感知與建構現實的共同視角。"},
    {term: "Compliance threshold", def: "感知危險需達到某閾值才能觸發遵從；若中國使用者感知偏低，可能未採取適當預防。"}
  ],
  sections: [
    {title: "顏色排序（感知危險：低 → 高）", html: `
      <table class="t"><thead><tr><th>文化</th><th>排序</th><th>特徵</th></tr></thead><tbody>
      <tr><td>美國</td><td>blue → green → yellow → black → orange → red</td><td>與 ANSI（yellow &lt; orange &lt; red）一致</td></tr>
      <tr><td>中國</td><td>yellow → blue → green → red → black → orange</td><td>黃色最低（2.9）、橘 &gt; 紅；紅與黑無顯著差異</td></tr></tbody></table>`},
    {title: "警示字與符號", html: `
      <ul>
        <li><b>警示字</b>：DEADLY 與 DANGER 最高、NOTICE 最低（兩國皆是）。美國：BEWARE、WARNING &gt; CAUTION；中國：CAUTION &gt; WARNING。美國平均 6.9，中國 5.3。</li>
        <li><b>語言</b>：中國受試者對中文與英文警示字的整體評價相近，但 WARNING、DANGER 以英文寫時評分較高。</li>
        <li><b>符號</b>：美國 skull & bones &lt; safety alert &lt; cracked skull & crutches；中國 cracked skull &lt; skull & bones &lt; safety alert。</li>
      </ul>`},
    {title: "複合配置與實務建議", html: `
      <ul>
        <li>複合配置的『相對排序』兩國相似，且符合 ANSI 建議。</li>
        <li><b>black-DEADLY-skull & bones</b> 在兩文化皆高於 ANSI 的 red-DANGER-safety alert。</li>
        <li>替換符號（以 cracked skull & crutches 代 safety alert）可提升感知危險。</li>
        <li>中國受試者整體絕對評分較低 → 需要『更強』的警示字、顏色與符號；中國的標準尚未完善且執行不一致。</li>
        <li>限制：大學生樣本；顏色在 CRT 螢幕呈現；樣本小。</li>
      </ul>`}
  ],
  examTips: [
    "注意『相對排序』與『絕對評分』的區別：複合配置相對排序一致；但中國絕對較低。",
    "顏色：中國黃色最低；橘高於紅。",
    "WARNING vs. CAUTION：美國 WARNING 較高；中國相反。",
    "實務：國際化產品需要在地化警示設計，而非直接套用 ANSI。"
  ],
  quiz: [
    {q: "此研究中，總體而言哪一文化給予較高的感知危險評分？", o: ["中國", "美國", "兩者相同", "無法判斷"], a: 1, e: "美國參與者一致提供較高評分。"},
    {q: "中國受試者對哪一個顏色的感知危險度最低？", o: ["藍色", "綠色", "黃色", "紅色"], a: 2, e: "黃色（M = 2.9）最低，且橘色高於紅色。"},
    {q: "關於 WARNING 與 CAUTION 的相對評分，何者正確？", o: ["兩文化皆是 WARNING > CAUTION", "美國 WARNING > CAUTION，中國 CAUTION > WARNING", "兩文化皆是 CAUTION > WARNING", "兩者沒有差異"], a: 1, e: "兩文化排序相反。"},
    {q: "此研究對國際產品警示設計的主要建議是？", o: ["統一使用美國標準即可", "對中國使用者可能需要更強的警示元素與在地化設計", "取消警示標籤", "僅用文字"], a: 1, e: "中國受試者絕對評分偏低，可能無法達到遵從閾值。"},
    {q: "下列何者在兩文化中皆被評為比 red-DANGER-safety alert 更高的感知危險配置？", o: ["blue-NOTICE", "yellow-CAUTION-safety alert", "black-DEADLY-skull & bones", "green-BEWARE"], a: 2, e: "符合文中結論。"},
    {q: "ANSI Z535.4 對 DANGER 的建議顏色為？", o: ["黃底黑字", "橘底黑字", "紅底白字", "藍底白字"], a: 2, e: "DANGER：white on red；WARNING：black on orange；CAUTION：black on yellow。"}
  ]
});
