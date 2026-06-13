const nodemailer = require('nodemailer');

const sendEmailNotification = async (subject, htmlContent) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFICATION_EMAIL) {
    console.log(`\n✉️  [MOCK EMAIL] Email Notification Details:`);
    console.log(`--------------------------------------------------`);
    console.log(`To:      ${NOTIFICATION_EMAIL || 'admin@school.com'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}`);
    console.log(`--------------------------------------------------\n`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587'),
      secure: SMTP_PORT === '465',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Cambridge School Portal" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      subject: subject,
      html: htmlContent,
    });

    console.log('✅ Email notification sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email notification:', err.message);
  }
};

module.exports = {
  sendEmailNotification
};
