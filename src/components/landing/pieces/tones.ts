/**
 * Tonos de marca compartidos por las piezas de la landing (spec §4).
 * Sólo marca: primary-500 para iconos y etiquetas, accent-turquoise como relleno decorativo.
 * Los semánticos (success/warning/error) quedan reservados a veredictos clínicos (carta Levey-Jennings).
 */

export type Tone = 'primary' | 'accent';

/** Fondo suave + texto legible (AA en tamaños pequeños). */
export const toneSoft: Record<Tone, string> = {
  primary: 'bg-primary-50 text-primary-500',
  accent: 'bg-accent-turquoise/15 text-brand-900',
};

/** Borde/relleno decorativo. */
export const toneBorder: Record<Tone, string> = {
  primary: 'border-primary-500',
  accent: 'border-accent-turquoise',
};

/** Tile de icono (spec §3.3): primary-50, radio 25 px, shadow-sm, icono primary-500. */
export const iconTile =
  'flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-primary-50 text-primary-500 shadow-sm lg:size-[104px] lg:rounded-icon';

/** Icono de contorno dentro del tile: 50 px, trazo 2.5. */
export const iconGlyph = 'size-10 lg:size-[50px]';
