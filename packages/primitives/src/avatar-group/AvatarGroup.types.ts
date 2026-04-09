import type React from 'react';
export interface AvatarItem { id: string; src?: string; alt?: string; fallback?: string; }
export interface UseAvatarGroupProps { avatars: AvatarItem[]; max?: number; }
export interface UseAvatarGroupReturn { avatarGroupProps: React.HTMLAttributes<HTMLDivElement>; visibleAvatars: AvatarItem[]; overflowCount: number; }
export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseAvatarGroupProps {}
export interface StyledAvatarGroupProps extends AvatarGroupProps { size?: 'sm' | 'md' | 'lg'; className?: string; }
