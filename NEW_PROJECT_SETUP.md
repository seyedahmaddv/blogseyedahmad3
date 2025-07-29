# راهنمای راه‌اندازی پروژه جدید در Vercel

## مرحله ۱: ایجاد پروژه جدید در Vercel

1. به [Vercel Dashboard](https://vercel.com/dashboard) بروید
2. روی **New Project** کلیک کنید
3. Repository گیت‌هاب خود را انتخاب کنید
4. نام پروژه را وارد کنید (مثلاً `blogseyedahmad3-new`)
5. روی **Deploy** کلیک کنید

## مرحله ۲: ایجاد دیتابیس PostgreSQL

1. بعد از ایجاد پروژه، به تب **Storage** بروید
2. روی **Create Database** کلیک کنید
3. **PostgreSQL** را انتخاب کنید
4. نام دیتابیس را وارد کنید (مثلاً `blog-db`)
5. منطقه جغرافیایی نزدیک به خود را انتخاب کنید
6. روی **Create** کلیک کنید

## مرحله ۳: اتصال دیتابیس به پروژه

1. در صفحه Storage، روی دیتابیس ایجاد شده کلیک کنید
2. روی **Connect** کلیک کنید
3. پروژه خود را انتخاب کنید
4. روی **Connect** کلیک کنید

## مرحله ۴: تنظیم Environment Variables

1. در پروژه Vercel، به **Settings** بروید
2. **Environment Variables** را انتخاب کنید
3. این متغیرها را اضافه کنید:

```
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-new-app-name.vercel.app
```

**نکته:** `DATABASE_URL` به طور خودکار توسط Vercel ایجاد می‌شود.

## مرحله ۵: اجرای Migration ها

1. در Vercel Dashboard، به **Deployments** بروید
2. آخرین deployment را انتخاب کنید
3. اگر خطا داشت، یک redeploy انجام دهید

## مرحله ۶: تست کردن

بعد از deployment، این URL ها را تست کنید:

- `https://your-app.vercel.app/api/health` - تست کلی سلامت
- `https://your-app.vercel.app/api/test-db` - تست اتصال دیتابیس
- `https://your-app.vercel.app/posts` - تست صفحه پست‌ها

## نکات مهم

1. **نام پروژه جدید:** از نام متفاوتی استفاده کنید
2. **دیتابیس جدید:** یک دیتابیس کاملاً جدید ایجاد کنید
3. **Environment Variables:** فقط `DATABASE_URL`، `NEXTAUTH_SECRET` و `NEXTAUTH_URL` را تنظیم کنید
4. **Migration ها:** بعد از اتصال دیتابیس، migration ها به طور خودکار اجرا می‌شوند

## عیب‌یابی

### اگر خطا داشتید:

1. **بررسی Environment Variables:**
   - مطمئن شوید `DATABASE_URL` صحیح است
   - مطمئن شوید `NEXTAUTH_SECRET` تنظیم شده است

2. **بررسی Logs:**
   - در Vercel Dashboard، به **Functions** بروید
   - روی function های خطا دار کلیک کنید
   - Log ها را بررسی کنید

3. **تست اتصال دیتابیس:**
   - به `/api/test-db` بروید
   - نتیجه را بررسی کنید

## مراحل نهایی

1. پروژه جدید ایجاد کنید
2. دیتابیس PostgreSQL ایجاد کنید
3. دیتابیس را به پروژه متصل کنید
4. Environment Variables را تنظیم کنید
5. پروژه را deploy کنید
6. Migration ها را اجرا کنید
7. تست کنید

اگر باز هم مشکل داشتید، متن خطا را ارسال کنید. 