import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(contactData: ContactFormData) {
  const adminEmails = [
    'seyedahmadqz@gmail.com',
    'seyedahmaddv@gmail.com'
  ];

  const adminEmailContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">پیام جدید از فرم تماس</h2>
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #374151;">جزئیات پیام:</h3>
        <p><strong>نام:</strong> ${contactData.name}</p>
        <p><strong>ایمیل:</strong> ${contactData.email}</p>
        <p><strong>موضوع:</strong> ${contactData.subject}</p>
        <p><strong>پیام:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-right: 4px solid #2563eb;">
          ${contactData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        این پیام در تاریخ ${new Date().toLocaleDateString('fa-IR')} ارسال شده است.
      </p>
    </div>
  `;

  const userEmailContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">پیام شما دریافت شد</h2>
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      
      <p>سلام ${contactData.name}،</p>
      
      <p>پیام شما با موفقیت دریافت شد و در اسرع وقت بررسی خواهد شد.</p>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">جزئیات پیام شما:</h3>
        <p><strong>موضوع:</strong> ${contactData.subject}</p>
        <p><strong>پیام:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-right: 4px solid #10b981;">
          ${contactData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <p>با تشکر،<br>تیم پشتیبانی</p>
      
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="color: #6b7280; font-size: 12px;">
        این ایمیل خودکار است، لطفاً به آن پاسخ ندهید.
      </p>
    </div>
  `;

  try {
    // Send to admin emails
    for (const adminEmail of adminEmails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `پیام جدید از فرم تماس - ${contactData.subject}`,
        html: adminEmailContent,
      });
    }

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'پیام شما دریافت شد',
      html: userEmailContent,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
  
  const emailContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">بازنشانی رمز عبور</h2>
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      
      <p>درخواست بازنشانی رمز عبور برای حساب کاربری شما دریافت شده است.</p>
      
      <p>اگر شما این درخواست را نکرده‌اید، این ایمیل را نادیده بگیرید.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
          بازنشانی رمز عبور
        </a>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        این لینک تا 1 ساعت معتبر است.
      </p>
      
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="color: #6b7280; font-size: 12px;">
        اگر دکمه کار نمی‌کند، این لینک را کپی کنید: ${resetUrl}
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'بازنشانی رمز عبور',
      html: emailContent,
    });
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

export async function sendNewsletterEmail(email: string, name: string | null, title: string, content: string) {
  const unsubscribeUrl = `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  
  const emailContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">خبرنامه وبلاگ سید احمد</h1>
      </div>
      
      <div style="padding: 30px; background-color: white; border: 1px solid #e5e7eb;">
        <h2 style="color: #2563eb; margin-top: 0;">${title}</h2>
        
        <div style="line-height: 1.6; color: #374151;">
          ${content.replace(/\n/g, '<br>')}
        </div>
        
        <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
          سلام ${name || 'کاربر گرامی'}،
        </p>
        
        <p style="color: #6b7280; font-size: 14px;">
          این ایمیل به دلیل عضویت شما در خبرنامه ارسال شده است.
        </p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <a href="${unsubscribeUrl}" 
           style="color: #6b7280; text-decoration: none; font-size: 12px;">
          لغو اشتراک
        </a>
        <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">
          © 2024 وبلاگ سید احمد. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: title,
      html: emailContent,
    });
    return true;
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return false;
  }
}

export async function sendNewsletterConfirmation(email: string, name: string | null) {
  const emailContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">عضویت در خبرنامه</h1>
      </div>
      
      <div style="padding: 30px; background-color: white; border: 1px solid #e5e7eb;">
        <h2 style="color: #10b981; margin-top: 0;">خوش آمدید!</h2>
        
        <p style="color: #374151; line-height: 1.6;">
          سلام ${name || 'کاربر گرامی'}،
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          عضویت شما در خبرنامه وبلاگ سید احمد با موفقیت انجام شد. از این پس آخرین اخبار و مطالب را از طریق ایمیل دریافت خواهید کرد.
        </p>
        
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #166534; margin: 0; font-weight: 500;">
            ✅ عضویت شما تأیید شد
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          در صورت عدم تمایل به دریافت خبرنامه، می‌توانید در هر زمان از طریق لینک موجود در انتهای ایمیل‌ها، اشتراک خود را لغو کنید.
        </p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          © 2024 وبلاگ سید احمد. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'عضویت در خبرنامه تأیید شد',
      html: emailContent,
    });
    return true;
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return false;
  }
} 