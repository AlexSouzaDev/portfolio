import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export function supportsHover() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
