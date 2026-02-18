'use server';

import nodemailer from 'nodemailer';

const getFieldValue = (formData: FormData, fieldName: string): string => {
  const value = formData.get(fieldName);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
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
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}