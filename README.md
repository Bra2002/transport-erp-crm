# Transport ERP Starter (Node + SQLite + Vanilla JS)

## تشغيل محلي
1) ثبّت Node.js 18+.
2) انسخ الملف `.env.example` إلى `.env` وعدّل `JWT_SECRET` إذا رغبت.
3) شغّل:
```bash
npm install
npm run dev
```
يفتح السيرفر على `http://localhost:3000` وواجهة الدخول في الصفحة الرئيسية.

- بيانات دخول افتراضية: `admin@company.com` / `admin123`
- قاعدة البيانات SQLite تُنشأ تلقائياً في `backend/models/app.db`
- لمسح القاعدة: `npm run reset` ثم إعادة التشغيل.

## الموديولات
- auth (JWT)
- clients (CRUD)
- vehicles (CRUD)
- shipments (CRUD + join مع العملاء والمركبات)

## ملاحظات
- يمكن الترقية لاحقاً إلى PostgreSQL بسهولة.
- أضف خرائط وGPS ورفع مستندات لاحقاً.
