'use server';

import nodemailer from 'nodemailer';

const getFieldValue = (formData: FormData, fieldName: string): string => {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export async function sendContactMessage(formData: FormData) {
  const name = getFieldValue(formData, 'name');
  const email = getFieldValue(formData, 'email');
  const message = getFieldValue(formData, 'message');

  if (!name || !email || !message) {
    throw new Error('All contact form fields are required.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new Error('Invalid email address.');
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? '465');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass || !from) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and SMTP_FROM.');
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="padding: 16px 20px; background: #0f172a; color: #f8fafc;">
          <h2 style="margin: 0; font-size: 18px;">New Resume Contact Message</h2>
        </div>
        <div style="padding: 20px;">
          <p style="margin: 0 0 12px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></p>
          <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p style="margin: 0 0 8px;"><strong>Message</strong></p>
            <p style="margin: 0; line-height: 1.55;">${safeMessage}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `Resume contact form: ${name}`,
    text,
    html,
  });
}