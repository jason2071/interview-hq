## Frontend

**React (16+)**
- **Hooks + functional components** — เขียน component แบบฟังก์ชัน ใช้ `useState`, `useEffect` แทน class
- **State management** — จัดการ state ข้าม component: Redux (ใหญ่/ซับซ้อน), Zustand (เบา), Context API (ในตัว React)
- **React Router** — จัดการเปลี่ยนหน้า/URL ใน SPA
- **Component library** — ใช้ UI สำเร็จรูป เช่น MUI, Ant Design แทนเขียนเอง
- **API integration** — ยิง API ไป backend (fetch/axios)
- **Responsive UI/UX** — หน้าจอปรับตามขนาด device

**OAuth 2.0 ฝั่ง Frontend**
- **Authorization Code flow** — วิธี login มาตรฐาน: ผู้ใช้ไปที่ auth server แล้วได้ code กลับมาแลก token
- **Client library** — `react-oauth`, `oidc-client-ts` ช่วยจัดการ flow ให้
- **Token management** — เก็บ/ใช้ token ใน browser อย่างปลอดภัย
- **Secure redirect** — จัดการ redirect กลับหลัง login ให้ปลอดภัย
- **PKCE** — กลไกเสริมความปลอดภัยสำหรับ public client (แอปที่เก็บ secret ไม่ได้ เช่น SPA) กัน code ถูกดักขโมย
- **Token refresh** — ต่ออายุ token อัตโนมัติเมื่อหมดอายุ

## Backend

**Go Fiber**
- **Routing + middleware** — กำหนด endpoint และ logic ที่ทำก่อน/หลัง request
- **Context handling** — จัดการข้อมูลใน request ผ่าน `c *fiber.Ctx`
- **Middleware ecosystem** — CORS, compression, logger ที่ Fiber มีให้
- **Performance** — จูนให้เร็ว (Fiber เร็วอยู่แล้วเพราะใช้ fasthttp)

**Go libraries**
- **GORM** — ORM สำหรับ PostgreSQL / **mongo-driver** — client สำหรับ MongoDB
- **HTTP client** — เรียก API ภายนอก
- **`golang.org/x/oauth2`, `ory/fosite`** — lib ทำ OAuth (fosite ใช้ทำ **ฝั่ง server/provider** ออก token เอง)
- **testify, ginkgo** — framework เขียน test

**Go ecosystem**
- **Go modules** — จัดการ dependency (`go.mod`)
- **Standard library** — ใช้ lib ในตัวคล่อง
- **Error handling** — จัดการ error แบบ Go (`if err != nil`, wrap error)
- **Context & cancellation** — `context.Context` ยกเลิก/ตั้ง timeout งานได้

**Authorization & Access Control**
- **ACL** — กำหนดสิทธิ์เป็นรายการ ใครทำอะไรได้
- **RBAC** — ให้สิทธิ์ตาม **role** (เช่น admin, user)
- **ABAC** — ให้สิทธิ์ตาม **attribute** (เช่น แผนก, เวลา, สถานะ) ยืดหยุ่นกว่า RBAC
- **JWT (`golang-jwt/jwt`)** — token ที่แนบข้อมูล user มาในตัว ตรวจได้โดยไม่ต้องถาม DB