import * as React from 'react';
import { gsap } from 'gsap';
import { ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Se muestra al bajar más de ~80 % del alto de la ventana. */
const SHOW_AFTER = 0.8;

/**
 * Botón flotante "volver arriba" (isla).
 * Estados animados con GSAP: aparecer / ocultarse, hover (la flecha sube), presionado (escala) y clic (la flecha despega).
 * Con prefers-reduced-motion no hay animaciones y el desplazamiento es instantáneo.
 */
export function ScrollToTop({ className }: { className?: string }) {
  const button = React.useRef<HTMLButtonElement>(null);
  const arrow = React.useRef<SVGSVGElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [reduced] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Visibilidad según el scroll (un cálculo por frame como máximo)
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Aparecer / ocultarse
  React.useEffect(() => {
    const el = button.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (reduced) {
      gsap.set(el, { autoAlpha: visible ? 1 : 0 });
      return;
    }
    gsap.to(
      el,
      visible
        ? { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }
        : { autoAlpha: 0, y: 16, scale: 0.85, duration: 0.25, ease: 'power2.in' },
    );
  }, [visible, reduced]);

  const hover = (on: boolean) => {
    if (reduced) return;
    gsap.to(arrow.current, { y: on ? -2 : 0, duration: 0.2, ease: 'power2.out' });
  };

  const press = (down: boolean) => {
    if (reduced) return;
    gsap.to(button.current, { scale: down ? 0.92 : 1, duration: 0.15, ease: 'power2.out' });
  };

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    if (reduced) return;
    // La flecha "despega" y vuelve a su lugar
    gsap
      .timeline()
      .to(arrow.current, { y: -18, autoAlpha: 0, duration: 0.22, ease: 'power2.in' })
      .set(arrow.current, { y: 14 })
      .to(arrow.current, { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <Button
      ref={button}
      type="button"
      size="icon-lg"
      aria-label="Volver arriba"
      title="Volver arriba"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={goTop}
      onPointerEnter={() => hover(true)}
      onPointerLeave={() => {
        hover(false);
        press(false);
      }}
      onPointerDown={() => press(true)}
      onPointerUp={() => press(false)}
      className={cn(
        // `transition-colors` en vez de `transition-all`: el transform lo maneja GSAP
        'fixed right-4 bottom-4 z-40 invisible rounded-full opacity-0 shadow-[0_8px_24px_rgba(31,56,146,0.28)] transition-colors active:scale-100 sm:right-6 sm:bottom-6',
        className,
      )}
    >
      <ArrowUpIcon ref={arrow} className="size-5" strokeWidth={2.5} />
    </Button>
  );
}
