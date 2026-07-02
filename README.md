# Mock Interview — HQ Core System

หน้าเว็บซ้อมสัมภาษณ์ Software Engineer แบบ Q&A แบบพับได้ (accordion) ภาษาไทย.
เนื้อหาแยกอยู่ใน `data.json` แล้ว render ด้วย vanilla JS — ไม่มี build step, ไม่มี dependency.

## หัวข้อ

Go Fiber · Go Ecosystem · OAuth 2.0/PKCE · ory/fosite · RBAC vs ABAC · JWT · MongoDB/GORM · Testing · Behavioral · จิตวิทยาสัมภาษณ์

## วิธีรัน

ต้องเปิดผ่าน **local server** — `fetch('data.json')` ทำงานบน `file://` ไม่ได้ (browser block CORS).

```bash
cd interview
python -m http.server 8000
```

เปิด http://localhost:8000

ทางเลือกอื่น: VS Code "Live Server", `npx serve`, หรือ static server ตัวไหนก็ได้.

## โครงไฟล์

```
interview/
├── index.html          shell — header, toolbar, sidebar, containers ว่าง
├── README.md
├── assets/
│   ├── css/styles.css  style (responsive: desktop sticky sidebar → mobile off-canvas drawer)
│   └── js/app.js       fetch qa.json → render DOM + drawer toggle + scroll-spy
└── data/
    └── qa.json         เนื้อหา Q&A (sections + recap)
```

## แก้เนื้อหา

แก้ `data/qa.json` อย่างเดียว — ไม่ต้องแตะ HTML/JS.

```jsonc
{
  "sections": [
    {
      "id": "s1",              // ต้อง unique — ใช้เป็น anchor (#s1) ใน TOC
      "num": "01",             // เลขหัวข้อที่โชว์
      "title": "Go Fiber",     // ชื่อ section (โชว์ใน TOC ด้วย)
      "tag": null,             // หรือ { "class": "must" | "strong", "label": "ต้องเตรียม" }
      "items": [
        {
          "q": "คำถาม?",        // plain text (render ด้วย textContent)
          "a": "<p>คำตอบ</p>"   // HTML (render ด้วย innerHTML — เนื้อหา authored เชื่อถือได้)
        }
      ]
    }
  ],
  "recap": {
    "title": "สรุป",
    "items": ["<b>ข้อ 1</b> — ...", "..."]   // HTML แต่ละ bullet
  }
}
```

> **หมายเหตุ security:** `a` และ `recap.items` ถูก inject ด้วย `innerHTML` เพราะเป็นเนื้อหาที่เราเขียนเอง (trusted). อย่าเอา user input ใส่ตรงนี้โดยไม่ sanitize.
