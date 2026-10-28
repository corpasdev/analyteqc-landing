import { CircleCheckIcon, FileTextIcon, PresentationIcon, RefreshCwIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RichText } from './RichText';
import { iconGlyph, iconTile, toneSoft, type Tone } from './tones';

const icons = {
  rules: CircleCheckIcon,
  chart: PresentationIcon,
  audit: FileTextIcon,
  crossover: RefreshCwIcon,
};

interface FeatureCardProps {
  icon: keyof typeof icons;
  tag: string;
  tone: Tone;
  meta: string;
  title: string;
  description: string;
}

/** Tarjeta blanca sobre surface-tint: radio 24 px, sin borde, shadow-sm de marca. */
export function FeatureCard({ icon, tag, tone, meta, title, description }: FeatureCardProps) {
  const Icon = icons[icon];
  return (
    <Card className="h-full gap-0 rounded-lg border-0 py-8 shadow-sm sm:py-10">
      <CardHeader className="gap-0 px-6 sm:px-10">
        <span className={iconTile}>
          <Icon className={iconGlyph} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <CardDescription className="mt-8 flex flex-wrap items-center gap-2">
          <Badge className={cn('px-3 py-1 font-semibold', toneSoft[tone])}>{tag}</Badge>
          <span className="text-sm text-neutral-500">{meta}</span>
        </CardDescription>
        <CardTitle className="mt-4 text-xl font-semibold leading-snug text-brand-900 lg:text-[22px]">{title}</CardTitle>
      </CardHeader>

      <CardContent className="mt-2.5 px-6 text-base leading-[1.6] text-neutral-700 sm:px-10 lg:text-[17px] lg:leading-[28px]">
        <RichText text={description} />
      </CardContent>
    </Card>
  );
}
