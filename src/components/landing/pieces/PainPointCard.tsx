import { ArrowLeftRightIcon, FileTextIcon, TriangleAlertIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { iconGlyph, iconTile, type Tone } from './tones';

const icons = {
  alert: TriangleAlertIcon,
  shifts: ArrowLeftRightIcon,
  audit: FileTextIcon,
};

interface PainPointCardProps {
  icon: keyof typeof icons;
  tone: Tone;
  title: string;
  description: string;
}

/** Celda abierta estilo ServiceItem (spec §3.3): sin borde ni fondo, contenido centrado. */
export function PainPointCard({ icon, title, description }: PainPointCardProps) {
  const Icon = icons[icon];
  return (
    <Card className="h-full gap-0 rounded-none border-0 bg-transparent px-4 py-2 text-center shadow-none">
      <CardHeader className="justify-items-center gap-0 px-0">
        <span className={iconTile}>
          <Icon className={iconGlyph} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <CardTitle className="mt-[35px] text-xl font-semibold leading-snug text-brand-900 lg:text-[22px]">{title}</CardTitle>
      </CardHeader>

      <CardContent className="mt-2.5 flex-1 px-0 text-base leading-[1.6] text-neutral-500 lg:text-[17px] lg:leading-[28px]">
        {description}
      </CardContent>
    </Card>
  );
}
