import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad central de shadcn/ui para combinar clases de Tailwind CSS.
 * Fusiona y resuelve conflictos de clases duplicadas automáticamente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
