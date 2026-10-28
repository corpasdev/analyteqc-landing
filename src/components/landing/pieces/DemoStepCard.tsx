import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DemoStepCardProps {
  number: string;
  title: string;
  description: string;
}

/** Celda abierta estilo ServiceItem: el número ocupa el tile de icono. */
export function DemoStepCard({ number, title, description }: DemoStepCardProps) {
  return (
    <Card className="h-full gap-0 rounded-none border-0 bg-transparent px-4 py-2 text-center shadow-none">
      <CardHeader className="justify-items-center gap-0 px-0">
        <span
          className="flex size-20 items-center justify-center rounded-[20px] bg-primary-50 text-2xl font-bold text-primary-500 shadow-sm lg:size-[104px] lg:rounded-icon lg:text-[32px]"
          aria-hidden="true"
        >
          {number}
        </span>
        <CardTitle className="mt-[35px] text-xl font-semibold leading-snug text-brand-900 lg:text-[22px]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2.5 px-0 text-base leading-[1.6] text-neutral-500">{description}</CardContent>
    </Card>
  );
}
