import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { demoCta } from '@/config/navigation';

/** Banner de compromiso: apilado en móvil, en fila desde sm. Superficie surface-tint, radio 24 px. */
export function DemoBanner() {
  return (
    <Card className="flex-col items-center justify-between gap-6 rounded-lg border-0 bg-surface-tint p-6 shadow-none sm:flex-row sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-turquoise text-neutral-0" aria-hidden="true">
          <CheckIcon className="size-4" strokeWidth={2.5} />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-brand-900">¿Tienes dudas sobre tus analizadores actuales?</h3>
          <p className="mt-1 text-base leading-[1.6] text-neutral-700">
            Podemos cargar tus parámetros de prueba durante la misma sesión para que veas tus propios datos.
          </p>
        </div>
      </div>
      <Button asChild size="cta" className="group shrink-0">
        <a href={demoCta.href}>
          Reservar Mi Espacio
          <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    </Card>
  );
}
