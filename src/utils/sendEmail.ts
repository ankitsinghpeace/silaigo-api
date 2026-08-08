import { Transporter, createTransport } from 'nodemailer';

interface MailParams {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

const transporter: Transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail(params: MailParams): Promise<void> {
  const { to, subject, text, html } = params;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
