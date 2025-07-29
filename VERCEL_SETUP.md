# راهنمای کامل تنظیم دیتابیس در Vercel

## مشکل فعلی
اپلیکیشن شما در Vercel با خطای server-side exception مواجه می‌شود که معمولاً به دلیل عدم تنظیم صحیح دیتابیس است.

## مراحل حل مشکل

### 1. ایجاد دیتابیس PostgreSQL در Vercel

1. به [Vercel Dashboard](https://vercel.com/dashboard) بروید
2. پروژه خود را انتخاب کنید
3. به تب **Storage** بروید
4. روی **Create Database** کلیک کنید
5. **PostgreSQL** را انتخاب کنید
6. نام دیتابیس را وارد کنید (مثلاً `blog-db`)
7. منطقه جغرافیایی نزدیک به خود را انتخاب کنید
8. روی **Create** کلیک کنید

### 2. اتصال دیتابیس به پروژه

1. در صفحه Storage، روی دیتابیس ایجاد شده کلیک کنید
2. روی **Connect** کلیک کنید
3. در قسمت **Environment Variables Prefix**، مقدار `STORAGE` را وارد کنید
4. روی **Connect** کلیک کنید

### 3. تنظیم Environment Variables

1. در پروژه Vercel، به **Settings** بروید
2. **Environment Variables** را انتخاب کنید
3. این متغیرها را اضافه کنید:

```
STORAGE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
```

**نکته مهم**: `STORAGE_URL` به طور خودکار توسط Vercel ایجاد می‌شود.

### 4. حذف متغیر قدیمی (در صورت وجود)

1. در Environment Variables، متغیر `DATABASE_URL` قدیمی را حذف کنید
2. فقط `STORAGE_URL` باید باقی بماند

### 5. اجرای Migration ها

بعد از تنظیم `STORAGE_URL`، باید migration ها را اجرا کنید:

1. در Vercel Dashboard، به **Deployments** بروید
2. آخرین deployment را انتخاب کنید
3. به تب **Functions** بروید
4. یک function جدید ایجاد کنید یا deployment جدید انجام دهید

### 6. تست کردن

بعد از deployment، این URL ها را تست کنید:

- `https://your-app.vercel.app/api/health` - تست کلی سلامت
- `https://your-app.vercel.app/api/test-db` - تست اتصال دیتابیس
- `https://your-app.vercel.app/posts` - تست صفحه پست‌ها

## عیب‌یابی

### اگر همچنان خطا دارید:

1. **بررسی Environment Variables**:
   - مطمئن شوید `STORAGE_URL` صحیح است
   - مطمئن شوید `DATABASE_URL` قدیمی حذف شده است
   - مطمئن شوید `NEXTAUTH_SECRET` تنظیم شده است

2. **بررسی Logs**:
   - در Vercel Dashboard، به **Functions** بروید
   - روی function های خطا دار کلیک کنید
   - Log ها را بررسی کنید

3. **تست اتصال دیتابیس**:
   - به `/api/test-db` بروید
   - نتیجه را بررسی کنید

### نمونه Environment Variables:

```bash
# در Vercel Environment Variables
STORAGE_URL=postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
NEXTAUTH_SECRET=my-super-secret-key-123456789
NEXTAUTH_URL=https://blogseyedahmad3-kljb.vercel.app
```

## نکات مهم

1. **دیتابیس محلی vs Vercel**: دیتابیس محلی شما با دیتابیس Vercel متفاوت است
2. **Migration ها**: باید migration ها را در Vercel اجرا کنید
3. **Seed Data**: ممکن است نیاز به seed کردن دیتابیس داشته باشید
4. **Connection Pooling**: Vercel از connection pooling استفاده می‌کند
5. **Environment Variables**: از `STORAGE_URL` به جای `DATABASE_URL` استفاده کنید

## مراحل نهایی

1. دیتابیس PostgreSQL ایجاد کنید
2. با prefix `STORAGE` متصل کنید
3. Environment Variables را بررسی کنید
4. متغیر قدیمی `DATABASE_URL` را حذف کنید
5. پروژه را دوباره deploy کنید
6. Migration ها را اجرا کنید
7. Seed data را اضافه کنید (اختیاری)
8. تست کنید

اگر همچنان مشکل دارید، لطفاً نتیجه `/api/test-db` را به اشتراک بگذارید. 