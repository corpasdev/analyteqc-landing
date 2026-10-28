import * as React from 'react';
import { gsap } from 'gsap';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { HeroRunCase } from '@/data/landing';

interface RunVerdictAnimatedProps {
  cases: HeroRunCase[];
  className?: string;
}

/** Tiempo que queda visible el plan de acción antes de pasar al siguiente caso (s). */
const HOLD = 3.5;

const chartConfig = {
  z: { label: 'Control', color: 'var(--chart-1)' },
} satisfies ChartConfig;

/** Límites de la carta: ±1s gris, ±2s ámbar (advertencia), ±3s rojo (rechazo). */
const limits = [
  { y: 3, color: 'var(--color-error-500)' },
  { y: 2, color: 'var(--color-warning-500)' },
  { y: 1, color: 'var(--color-neutral-300)' },
  { y: -1, color: 'var(--color-neutral-300)' },
  { y: -2, color: 'var(--color-warning-500)' },
  { y: -3, color: 'var(--color-error-500)' },
];

const tickLabel = (v: number) => (v === 0 ? 'x̄' : `${v > 0 ? '+' : '−'}${Math.abs(v)}s`);

interface DotProps {
  cx?: number;
  cy?: number;
  index?: number;
  payload?: { z: number; out: boolean };
}

function ControlDot({ cx, cy, index, payload }: DotProps) {
  if (cx == null || cy == null || !payload) return <g key={index} />;
  const { out } = payload;
  return (
    <circle
      key={index}
      cx={cx}
      cy={cy}
      r={out ? 5 : 3.2}
      className={cn('lj-dot motion-safe:opacity-0', out && 'lj-dot-out')}
      fill={out ? 'var(--color-error-500)' : 'var(--chart-1)'}
      stroke={out ? '#FFFFFF' : 'none'}
      strokeWidth={out ? 2 : 0}
    />
  );
}

/**
 * Tarjeta animada del Hero (isla). Recorre en bucle varios casos de corrida:
 * la carta se dibuja → se marcan los puntos que violan la regla → veredicto → plan de acción → siguiente caso.
 * Con prefers-reduced-motion no hay animación ni avance automático: se muestra el primer caso estático.
 */
export function RunVerdictAnimated({ cases, className }: RunVerdictAnimatedProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const ctx = React.useRef<gsap.Context | null>(null);
  /** Caso cuya secuencia ya se reprodujo (evita dispararla dos veces). */
  const played = React.useRef(-1);
  const [index, setIndex] = React.useState(0);
  const [reduced] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const current = cases[index];
  const { analyzer, analyte, verdict, rule, errorType, actions } = current;
  const data = React.useMemo(
    () => current.run.map((z, i) => ({ i: i + 1, z, out: current.violations.includes(i) })),
    [current],
  );

  // Estado inicial de cada caso: veredicto y plan ocultos hasta que la carta termine de dibujarse
  // (en SSR ya vienen ocultos con `motion-safe:opacity-0`; GSAP los muestra con estilos en línea).
  React.useLayoutEffect(() => {
    if (reduced || !root.current) return;
    // kill (sin revert): detiene la animación del caso anterior y fija el estado inicial explícitamente
    ctx.current?.kill();
    ctx.current = gsap.context(() => {
      gsap.set(['.lj-verdict', '.lj-plan-title', '.lj-step', '.lj-status-done'], { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.lj-status-pending', { autoAlpha: 1 });
      gsap.fromTo(['.lj-meta', '.lj-chart'], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
    }, root);
  }, [index, reduced]);

  React.useEffect(() => () => ctx.current?.revert(), []);

  const playVerdict = React.useCallback(() => {
    // Al remontar la carta, Recharts puede disparar onAnimationEnd antes de pintar los puntos: se ignora
    if (reduced || !ctx.current || !root.current?.querySelector('.lj-dot')) return;
    if (played.current === index) return;
    played.current = index;
    ctx.current.add(() => {
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo(
          '.lj-dot',
          { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' },
          { autoAlpha: 1, scale: 1, duration: 0.18, stagger: 0.035 },
        )
        .to('.lj-dot-out', { scale: 1.7, transformOrigin: '50% 50%', duration: 0.22, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '>-0.05')
        .to('.lj-status-pending', { autoAlpha: 0, duration: 0.2 }, '<')
        .to('.lj-status-done', { autoAlpha: 1, duration: 0.2 }, '<0.1')
        .fromTo('.lj-verdict', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '>-0.3')
        .to('.lj-plan-title', { autoAlpha: 1, duration: 0.3 }, '>0.15')
        .fromTo('.lj-step', { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.32 }, '>')
        .fromTo('.lj-step-mark', { scale: 0.4 }, { scale: 1, duration: 0.3, stagger: 0.32, ease: 'back.out(2.5)' }, '<')
        // Pausa para leer el plan y salida suave hacia el siguiente caso
        .to(['.lj-meta', '.lj-chart', '.lj-verdict', '.lj-plan-title', '.lj-step'], { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, `>${HOLD}`)
        // El cambio de caso se agenda fuera del tick de GSAP
        .call(() => requestAnimationFrame(() => setIndex((i) => (i + 1) % cases.length)));
    });
  }, [reduced, cases.length, index]);

  return (
    <Card
      ref={root}
      className={cn('gap-0 rounded-lg border-0 py-6 shadow-[0_16px_40px_rgba(31,56,146,0.14)]', className)}
    >
      <CardHeader className="flex flex-col items-start gap-3 px-6 sm:flex-row sm:justify-between">
        <div className="lj-meta">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">{analyzer}</p>
          <CardTitle className="mt-1.5 text-base font-semibold text-brand-900 lg:text-lg">{analyte}</CardTitle>
        </div>

        {/* Estado de la evaluación */}
        <div className="relative order-first h-7 w-40 shrink-0 text-xs font-medium sm:order-none" aria-hidden="true">
          <span
            className={cn(
              'lj-status-pending absolute left-0 inline-flex sm:left-auto sm:right-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-surface-tint px-3 py-1.5 text-primary-500',
              reduced && 'hidden',
            )}
          >
            <LoaderCircleIcon className="size-3.5 animate-spin" />
            Evaluando corrida…
          </span>
          <span className="lj-status-done absolute left-0 inline-flex sm:left-auto sm:right-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary-50 px-3 py-1.5 text-brand-900 motion-safe:opacity-0">
            <CheckIcon className="size-3.5 text-primary-500" strokeWidth={3} />
            Evaluada
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6">
        {/* Carta Levey-Jennings (shadcn Chart + Recharts); `key` la remonta para redibujar la línea en cada caso */}
        <div className="lj-chart mt-4 rounded-sm bg-surface-tint px-2 py-3">
          <ChartContainer
            key={index}
            config={chartConfig}
            className="aspect-auto h-36 w-full lg:h-40"
            role="img"
            aria-label={`Carta Levey-Jennings de ${analyte}: ${verdict}, ${rule}`}
          >
            <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
              <XAxis dataKey="i" hide />
              <YAxis
                domain={[-3.4, 3.4]}
                ticks={[-2, 0, 2]}
                tickFormatter={tickLabel}
                width={30}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 600 }}
              />
              {limits.map((l) => (
                <ReferenceLine key={l.y} y={l.y} stroke={l.color} strokeDasharray="4 4" strokeOpacity={0.9} />
              ))}
              <ReferenceLine y={0} stroke="var(--chart-1)" strokeWidth={1.2} />
              <Line
                dataKey="z"
                type="linear"
                stroke="var(--color-z)"
                strokeWidth={2.2}
                strokeLinejoin="round"
                dot={(props: DotProps) => <ControlDot {...props} />}
                activeDot={false}
                isAnimationActive={!reduced}
                animationBegin={500}
                animationDuration={1600}
                animationEasing="ease-in-out"
                onAnimationEnd={playVerdict}
              />
            </LineChart>
          </ChartContainer>
        </div>

        {/* La alarma */}
        <div className="lj-verdict mt-4 flex motion-safe:opacity-0 items-start gap-3 rounded-sm bg-error-500/10 px-4 py-3" role="status">
          <span className="relative mt-1 flex size-3 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-error-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-3 rounded-full bg-error-500" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-error-600">
              {verdict} · {rule}
            </p>
            <p className="text-sm text-neutral-700">{errorType}</p>
          </div>
        </div>

        <Separator className="my-5 bg-neutral-200" />

        {/* La respuesta */}
        <p className="lj-plan-title text-xs motion-safe:opacity-0 font-semibold uppercase tracking-[0.14em] text-brand-900">Plan de acción</p>
        <ol className="mt-3 space-y-2.5">
          {actions.map((action, i) => (
            <li key={`${index}-${action}`} className="lj-step flex motion-safe:opacity-0 items-center gap-3 text-sm text-neutral-700">
              <span className="lj-step-mark flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-accent-turquoise text-[11px] font-bold text-brand-900">
                {i + 1}
              </span>
              {action}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
