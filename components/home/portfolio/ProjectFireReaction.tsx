'use client';

import { Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { KeyboardEvent, useEffect, useMemo, useState, useTransition } from 'react';

import { likeProject } from '@/actions/likeProject';
import { trackEvent } from '@/lib/gtag';

type ProjectFireReactionProps = {
  projectId: string;
  initialLikes: number;
};

const LIKED_PROJECTS_STORAGE_KEY = 'resume_liked_projects';

function readLikedProjects(): Record<string, true> {
  if (typeof window === 'undefined') {
    return {};
  }

  const value = localStorage.getItem(LIKED_PROJECTS_STORAGE_KEY);
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value) as Record<string, true>;
  } catch {
    return {};
  }
}

function markProjectAsLiked(projectId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const likedProjects = readLikedProjects();
  likedProjects[projectId] = true;
  localStorage.setItem(LIKED_PROJECTS_STORAGE_KEY, JSON.stringify(likedProjects));
}

export default function ProjectFireReaction({ projectId, initialLikes }: ProjectFireReactionProps) {
  const t = useTranslations('Portfolio');
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  useEffect(() => {
    const likedProjects = readLikedProjects();
    setIsLiked(Boolean(likedProjects[projectId]));
  }, [projectId]);

  const fireLabel = useMemo(() => {
    if (isLiked) {
      return t('alreadyLiked');
    }

    return t('reactWithFire');
  }, [isLiked, t]);

  const onFireKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLike();
    }
  };

  const onLike = () => {
    if (isLiked || isPending) {
      return;
    }

    setIsLiked(true);
    setLikes((current) => current + 1);
    markProjectAsLiked(projectId);
    trackEvent('project_liked', { projectId });

    startTransition(async () => {
      try {
        const result = await likeProject(projectId);
        setLikes(result.likes);

        if (result.alreadyLiked) {
          setIsLiked(true);
          markProjectAsLiked(projectId);
        }
      } catch {
        setIsLiked(false);
        setLikes((current) => Math.max(0, current - 1));

        const likedProjects = readLikedProjects();
        delete likedProjects[projectId];
        localStorage.setItem(LIKED_PROJECTS_STORAGE_KEY, JSON.stringify(likedProjects));
      }
    });
  };

  return (
    <div className="flex flex-row lg:flex-col items-center gap-1 text-center">
      <span
        role="button"
        tabIndex={isLiked || isPending ? -1 : 0}
        onClick={onLike}
        onKeyDown={onFireKeyDown}
        aria-label={fireLabel}
        aria-disabled={isLiked || isPending}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <Flame className={`h-5 w-5 lg:h-6 lg:w-6 ${isLiked ? 'text-orange-500' : 'text-zinc-500 dark:text-zinc-400'} ${isLiked || isPending ? 'opacity-70' : ''}`} />
      </span>
      <span className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 leading-none">
        {likes}
      </span>
    </div>
  );
}
