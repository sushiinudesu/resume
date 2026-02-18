"use client";

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ProjectIconProps = {
  icon?: string;
  className?: string;
};

const FALLBACK_ICON = LucideIcons.FolderGit2;
type LucideComponent = LucideIcon;

function isLucideComponent(value: unknown): value is LucideComponent {
  if (!value) return false;
  if (typeof value === 'object') return '$$typeof' in value;
  return typeof value === 'function' && value.length <= 1;
}

function normalizeIconName(iconName: string): string {
  return iconName.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const iconMap = Object.entries(LucideIcons).reduce<Record<string, LucideComponent>>(
  (acc, [name, iconComponent]) => {
    if (!/^[A-Z]/.test(name) || !isLucideComponent(iconComponent)) return acc;
    acc[name] = iconComponent;
    acc[normalizeIconName(name)] = iconComponent;
    return acc;
  },
  {},
);

function resolveLucideIcon(iconName?: string) {
  if (!iconName) return FALLBACK_ICON;

  const trimmed = iconName.trim();
  return iconMap[trimmed] ?? iconMap[normalizeIconName(trimmed)] ?? FALLBACK_ICON;
}

export default function ProjectIcon({ icon, className }: ProjectIconProps) {
  const Icon = resolveLucideIcon(icon);
  return <Icon className={className} aria-hidden="true" />;
}