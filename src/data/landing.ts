/** Fotos reales del equipo. */
import fotoAmauris from '@/assets/team/placeholder-bacteriologo.png';
import fotoBrandon from '@/assets/team/placeholder-ingeniero.png';
import fotoCarlos from '@/assets/team/placeholder-servicio.png';
/**
 * AnalyteQC — Contenido de la landing.
 *
 * Los textos admiten **negritas** (las interpreta el componente RichText).
 */

import type { Tone } from '@/components/landing/pieces/tones';

export const painPoints = [
  {
    icon: 'alert',
    tone: 'primary',
    title: 'El peligro de las fórmulas en Excel',
    description:
      'Hojas de cálculo creadas internamente que se desconfiguran con facilidad, fórmulas borradas por accidente y valores de control que se transcriben a mano bajo la presión de la primera tanda de pacientes de la mañana.',
  },
  {
    icon: 'shifts',
    tone: 'primary',
    title: 'Disparidad de criterios entre turnos',
    description:
      'Lo que para el bacteriólogo de la mañana es una simple advertencia (1₂s), para el del turno de la tarde se pasa por alto o se rechaza sin un protocolo uniforme. Falta un criterio institucional unificado.',
  },
  {
    icon: 'audit',
    tone: 'primary',
    title: 'Estrés previo a auditorías ISO 15189',
    description:
      'Correr a buscar carpetas físicas o archivos dispersos para justificar por qué se aceptó un lote, dónde está la acción correctiva de un desvío o quién autorizó la liberación de una corrida analítica.',
  },
] as const satisfies ReadonlyArray<{ icon: string; tone: Tone; title: string; description: string }>;

export const solutionFeatures = [
  {
    icon: 'rules',
    tag: 'Multi-reglas',
    tone: 'primary',
    meta: '1₂s · 1₃s · 2₂s · R₄s · 4₁s · 10x',
    title: 'Evaluación Instantánea de Reglas de Westgard',
    description:
      'Al ingresar el valor del control, el sistema evalúa inmediatamente el histórico de la serie analítica. Clasifica en el acto si te enfrentas a un **error aleatorio** (ej. burbujas en reactivo, pipeteo) o a un **error sistemático** (ej. degradación de calibrador, lámpara agotada), guiando al profesional hacia la solución correcta.',
  },
  {
    icon: 'chart',
    tag: 'Multi-nivel',
    tone: 'accent',
    meta: 'L1 Normal · L2 Patológico · L3 Alto',
    title: 'Cartas Levey-Jennings Dinámicas por Lote y Nivel',
    description:
      'Visualiza tus controles en tiempo real con escalamiento inteligente. Configura límites fijos de fábrica o límites móviles calculados a partir de los datos acumulados de tu propio laboratorio (**CV% real vs. CV% diana**), reflejando el verdadero desempeño de tu autoanalizador.',
  },
  {
    icon: 'audit',
    tag: 'Auditoría Lista',
    tone: 'primary',
    meta: 'ISO 15189 · Registro inmutable',
    title: 'Cierre de No Conformidades y Trazabilidad Total',
    description:
      'Si una corrida es rechazada, AnalyteQC bloquea la liberación del analito hasta que el bacteriólogo registre la causa raíz y la **acción correctiva tomada** (ej. recalibración, apertura de nuevo vial de reactivo). Todo queda firmado digitalmente con fecha, hora y responsable.',
  },
  {
    icon: 'crossover',
    tag: 'Crossover de Lotes',
    tone: 'primary',
    meta: 'Continuidad analítica',
    title: 'Transición de Lotes de Control sin Sobresaltos',
    description:
      'Administra lotes activos, provisionales y cerrados con total seguridad. Realiza el solapamiento de lotes (**crossover**) de manera transparente para calcular las nuevas medias de trabajo sin perder el histórico acumulado del lote saliente.',
  },
] as const satisfies ReadonlyArray<{ icon: string; tag: string; tone: Tone; meta: string; title: string; description: string }>;

export const comparisons = [
  {
    dimension: 'Tiempo por corrida de control',
    highlight: 'Ahorro de hasta 85% de tiempo operativo',
    manual: '10 a 15 minutos buscando plantillas y transcribiendo a mano.',
    analyteqc: 'Menos de 60 segundos por autoanalizador con cálculo automático.',
  },
  {
    dimension: 'Aplicación de reglas Westgard',
    highlight: 'Criterio institucional uniforme',
    manual: 'Sujeta a memoria, experiencia y la interpretación de cada analista.',
    analyteqc: 'Automática, determinista y estandarizada en cada nivel de control.',
  },
  {
    dimension: 'Detección de tendencias y sesgos',
    highlight: 'Detección temprana de fallas',
    manual: 'Difícil de notar a simple vista en tablas numéricas y hojas dispersas.',
    analyteqc: 'Identificación visual inmediata de desplazamientos (shifts y trends).',
  },
  {
    dimension: 'Registro de acciones correctivas',
    highlight: 'Cierre formal de desvíos',
    manual: 'Cuadernos de bitácora físicos propensos a extravío o registros incompletos.',
    analyteqc: 'Digital, obligatorio ante rechazos y respaldado para auditorías.',
  },
  {
    dimension: 'Auditorías ISO 15189 / Entes de Salud',
    highlight: 'Inspecciones sin angustia',
    manual: 'Semanas de preparación, búsqueda de carpetas y recopilación de evidencias.',
    analyteqc: 'Informes consolidados y trazabilidad histórica completa en un clic.',
  },
];

export interface Founder {
  initials: string;
  tone: Tone;
  name: string;
  role: string;
  /** Una sola línea: qué aportó al proyecto. */
  legend: string;
  /** Foto de perfil (opcional). Sin foto se muestran las iniciales. */
  photo?: ImageMetadata;
  /** Punto de recorte de la foto: 'top' para retratos (por defecto), 'center' para fotos horizontales. */
  photoPosition?: 'top' | 'center';
  /** Foto de relleno: se muestra sólo en desarrollo, nunca en producción. */
  photoIsPlaceholder?: boolean;
}

/**
 * Promotores del proyecto: quién identificó el problema y quién construyó la solución.
 * Para añadir la foto: guarda la imagen en `src/assets/team/`, impórtala arriba
 * (p. ej. `import amaurisPhoto from '@/assets/team/amauris-gomez.jpg';`) y asígnala a `photo`.
 */
export const founders: Founder[] = [
  {
    initials: 'AG',
    tone: 'primary',
    name: 'Amauris Gómez',
    role: 'Bacteriólogo',
    legend: 'Identificó el problema en el laboratorio.',
    photo: fotoAmauris,
  },
  {
    initials: 'BC',
    tone: 'accent',
    name: 'Brandon Corpas',
    role: 'Ingeniero en Sistemas',
    legend: 'Creó la solución.',
    photo: fotoBrandon,
  },
  {
    initials: 'CC',
    tone: 'primary',
    name: 'Carlos Corpas',
    role: 'Servicio al cliente',
    // TODO: validar leyenda
    legend: 'Acompaña a cada laboratorio.',
    photo: fotoCarlos,
  },
];

export const demoSteps = [
  {
    number: '01',
    title: 'Configuración de tus analitos y controles',
    description:
      'Verás qué tan sencillo es registrar tus equipos y los controles que utilizas hoy en tu sección analítica, adaptados a tus valores de fábrica o de inserción.',
  },
  {
    number: '02',
    title: 'Simulación de una corrida analítica real',
    description:
      'Ingresaremos valores de prueba en vivo y observarás cómo el sistema detecta violaciones sutiles de Westgard que en Excel suelen pasar desapercibidas.',
  },
  {
    number: '03',
    title: 'Resolución de no conformidades en vivo',
    description:
      'Experimentarás el flujo guiado para documentar acciones correctivas con causa raíz y cómo queda blindada la evidencia para tus auditores ISO 15189.',
  },
  {
    number: '04',
    title: 'Sesión de preguntas directas con los fundadores',
    description:
      'Atenderemos tus dudas específicas de tú a tú: de bacteriólogo a bacteriólogo sobre criterio clínico, y de ingeniero a tu equipo sobre datos y seguridad.',
  },
];

/**
 * Hero: casos de corridas rechazadas, cada uno con su plan de acción. La tarjeta los recorre en bucle.
 * `run` va en desviaciones estándar (z) respecto a la media; `violations` son los índices de los puntos que violan la regla.
 * TODO: validar las acciones con el plan real que entrega el software para cada regla.
 */
export interface HeroRunCase {
  analyzer: string;
  analyte: string;
  run: number[];
  violations: number[];
  verdict: string;
  rule: string;
  errorType: string;
  actions: string[];
}

export const heroRuns: HeroRunCase[] = [
  {
    analyzer: 'Autoanalizador Química 01',
    analyte: 'Glucosa · Control L1',
    run: [0.2, -0.3, 0.4, 0.9, 1.1, -0.2, 0.1, 0.3, 2.3, 2.5],
    violations: [8, 9],
    verdict: 'Rechazar corrida',
    rule: 'Regla 2₂s',
    errorType: 'Error sistemático',
    actions: [
      'Verifica la calibración',
      'Revisa lote y vencimiento del reactivo',
      'Repite el control',
      'Registra la acción correctiva',
    ],
  },
  {
    analyzer: 'Autoanalizador Química 01',
    analyte: 'Colesterol · Control L2',
    run: [0.3, -0.5, 0.8, -0.2, 0.6, -0.9, 0.4, 0.1, -0.3, 3.2],
    violations: [9],
    verdict: 'Rechazar corrida',
    rule: 'Regla 1₃s',
    errorType: 'Error aleatorio',
    actions: [
      'Revisa la reconstitución del control',
      'Busca burbujas o coágulos en la muestra',
      'Repite el control con una alícuota nueva',
      'Registra la acción correctiva',
    ],
  },
  {
    analyzer: 'Autoanalizador Química 01',
    analyte: 'Creatinina · Control L1',
    run: [-0.4, 0.6, 0.2, -0.8, 0.5, 0.1, -0.3, 0.7, 2.2, -2.3],
    violations: [8, 9],
    verdict: 'Rechazar corrida',
    rule: 'Regla R₄s',
    errorType: 'Error aleatorio',
    actions: [
      'Revisa la mezcla y preparación del control',
      'Inspecciona pipetas y sonda de muestreo',
      'Repite ambos niveles de control',
      'Registra la acción correctiva',
    ],
  },
  {
    analyzer: 'Autoanalizador Química 01',
    analyte: 'Triglicéridos · Control L2',
    run: [0.2, -0.4, 0.3, -0.1, 0.5, 0.2, 1.3, 1.5, 1.2, 1.6],
    violations: [6, 7, 8, 9],
    verdict: 'Rechazar corrida',
    rule: 'Regla 4₁s',
    errorType: 'Error sistemático',
    actions: [
      'Revisa la tendencia y la última calibración',
      'Verifica cambios de lote de reactivo o calibrador',
      'Programa mantenimiento preventivo',
      'Registra la acción correctiva',
    ],
  },
];
