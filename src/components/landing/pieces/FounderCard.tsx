import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toneSoft, type Tone } from './tones';

interface FounderCardProps {
  initials: string;
  tone: Tone;
  name: string;
  role: string;
  /** Una sola línea: qué aportó al proyecto. */
  legend: string;
  /** URL de la foto ya optimizada (la genera Founders.astro). */
  photoSrc?: string;
}

/**
 * Tarjeta de promotor: la foto ocupa toda la tarjeta (4:5) y el nombre,
 * el rol y la leyenda van encima, sobre un degradado oscuro (overlay) que garantiza contraste.
 */
export function FounderCard({ initials, tone, name, role, legend, photoSrc }: FounderCardProps) {
  return (
    <Card className="group relative aspect-[4/5] w-full gap-0 overflow-hidden rounded-lg border-0 py-0 shadow-sm">
      {photoSrc ? (
        <img
          src={photoSrc}
          alt={`Foto de ${name}`}
          width={640}
          height={800}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          className={cn('absolute inset-0 flex items-start justify-center pt-[22%] text-6xl font-bold', toneSoft[tone])}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      {/* Overlay: degradado brand-900 de abajo hacia arriba */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-brand-900/95 via-brand-900/60 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <h3 className="text-xl font-semibold text-neutral-0 lg:text-[22px]">{name}</h3>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-turquoise">{role}</p>
        <p className="mt-2.5 text-base text-neutral-0/85">{legend}</p>
      </div>
    </Card>
  );
}
