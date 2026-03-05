'use server';

import crypto from 'crypto';
import { headers, cookies } from 'next/headers';
import { FieldValue } from 'firebase-admin/firestore';

import { adminFirestore } from '@/lib/firebaseAdmin';

const VISITOR_COOKIE_NAME = 'resume_visitor_id';
const PROJECTS_COLLECTION = 'projects';

type LikeProjectResult = {
  ok: boolean;
  alreadyLiked: boolean;
  likes: number;
};

function hashVisitorId(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

async function getVisitorFingerprint(): Promise<string> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const existingVisitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value;
  if (existingVisitorId) {
    return hashVisitorId(`cookie:${existingVisitorId}`);
  }

  const forwardedFor = headerStore.get('x-forwarded-for') ?? '';
  const realIp = headerStore.get('x-real-ip') ?? '';
  const userAgent = headerStore.get('user-agent') ?? '';
  const acceptedLanguage = headerStore.get('accept-language') ?? '';
  const ip = forwardedFor.split(',')[0]?.trim() || realIp.trim() || 'unknown-ip';

  const generatedVisitorId = crypto.randomUUID();

  cookieStore.set(VISITOR_COOKIE_NAME, generatedVisitorId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
  });

  return hashVisitorId(`${ip}|${userAgent}|${acceptedLanguage}|${generatedVisitorId}`);
}

export async function likeProject(projectId: string): Promise<LikeProjectResult> {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId) {
    throw new Error('Project id is required.');
  }

  const fingerprint = await getVisitorFingerprint();
  const likeDocId = `${normalizedProjectId}__${fingerprint}`;

  const projectRef = adminFirestore.collection(PROJECTS_COLLECTION).doc(normalizedProjectId);
  const likeRef = adminFirestore.collection('projectLikes').doc(likeDocId);

  const result = await adminFirestore.runTransaction(async (tx) => {
    const [projectSnap, likeSnap] = await Promise.all([tx.get(projectRef), tx.get(likeRef)]);

    if (!projectSnap.exists) {
      throw new Error('Project not found.');
    }

    const currentLikes = Number(projectSnap.get('likes') ?? 0);

    if (likeSnap.exists) {
      return {
        ok: true,
        alreadyLiked: true,
        likes: currentLikes,
      };
    }

    tx.set(likeRef, {
      projectId: normalizedProjectId,
      fingerprint,
      createdAt: FieldValue.serverTimestamp(),
    });

    tx.update(projectRef, {
      likes: FieldValue.increment(1),
    });

    return {
      ok: true,
      alreadyLiked: false,
      likes: currentLikes + 1,
    };
  });

  return result;
}
