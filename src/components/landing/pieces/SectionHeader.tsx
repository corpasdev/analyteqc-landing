import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** Parte final del título resaltada en turquesa (único acento cromático en títulos). */
  highlight?: string;
  description?: string;
  /** Color del eyebrow: primary-500 (por defecto) o brand-900. */
  eyebrowTone?: 'primary' | 'brand';
  className?: string;
}

/**
 * Encabezado centrado de sección (spec §3.3):
 * eyebrow 15/600 mayúsculas espaciadas · H2 45/600 brand-900 · subtítulo 19/30 neutral-500.
 */
export function SectionHeader({ eyebrow, title, highlight, description, eyebrowTone = 'primary', className }: SectionHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-[50rem] text-center', className)}>
      <p
        className={cn(
          'text-[13px] font-semibold uppercase tracking-[0.2em] sm:text-[15px]',
          eyebrowTone === 'brand' ? 'text-brand-900' : 'text-primary-500',
        )}
      >
        {eyebrow}
      </p>

      <h2 className="mt-6 text-[32px] font-semibold leading-[1.15] text-brand-900 sm:text-[38px] lg:text-[45px]">
        {title} {highlight && <span className="text-accent-turquoise-text">{highlight}</span>}
      </h2>

      {description && (
        <p className="mx-auto mt-8 max-w-[37.5rem] text-base leading-[1.6] text-neutral-500 lg:text-[19px] lg:leading-[30px]">
          {description}
        </p>
      )}
    </div>
  );
}
