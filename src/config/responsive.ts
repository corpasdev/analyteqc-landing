/**
 * AnalyteQC — Estándar Centralizado de Responsive Design y Medidas de Pantalla
 *
 * Define las dimensiones estándar de la industria (W3C, Tailwind CSS y monitores de laboratorio)
 * para garantizar coherencia en todas las vistas y componentes.
 */

export const breakpoints = {
  xs: { rem: '30rem', px: 480, label: 'Móvil Grande / Phablet' },
  sm: { rem: '40rem', px: 640, label: 'Tablet Compacta / Móvil Apaisado' },
  md: { rem: '48rem', px: 768, label: 'Tablet Estándar (iPad / Tab)' },
  lg: { rem: '64rem', px: 1024, label: 'Laptop 13" / Tablet Pro' },
  xl: { rem: '80rem', px: 1280, label: 'Laptop 15" / Monitor HD' },
  '2xl': { rem: '96rem', px: 1536, label: 'Monitor Full HD / Pantalla Retina' },
  '3xl': { rem: '120rem', px: 1920, label: 'Monitor Ultra-Wide / 4K' },
} as const;

export const containers = {
  layout: { rem: '90rem', px: 1440, label: 'Contenedor Máximo Global de la Landing' },
  content: { rem: '72rem', px: 1152, label: 'Contenedor Óptimo de Contenido y Lectura' },
  narrow: { rem: '56rem', px: 896, label: 'Contenedor Estrecho / Formularios' },
  chart: { rem: '64rem', px: 1024, label: 'Contenedor para Gráficos Levey-Jennings' },
  table: { rem: '48rem', px: 768, label: 'Contenedor para Tablas de Datos' },
} as const;

export const gutters = {
  mobile: '1.25rem',   // 20px
  tablet: '2rem',      // 32px
  desktop: '3rem',     // 48px
} as const;

export const viewportsQA = [
  { name: 'Mobile Small', width: 320, height: 568, device: 'iPhone SE / Teléfonos compactos' },
  { name: 'Mobile Standard', width: 390, height: 844, device: 'iPhone 13/14/15 / Galaxy S23' },
  { name: 'Mobile Wide', width: 428, height: 926, device: 'iPhone Pro Max / Plus' },
  { name: 'Tablet Portrait', width: 768, height: 1024, device: 'iPad 9.7" / 10.2"' },
  { name: 'Tablet Landscape / Laptop Mini', width: 1024, height: 768, device: 'iPad Landscape / Chromebook' },
  { name: 'Laptop Standard', width: 1280, height: 800, device: 'MacBook Air / Laptop de Laboratorio' },
  { name: 'Desktop Full HD', width: 1440, height: 900, device: 'Estación de trabajo clínica estándar' },
  { name: 'Widescreen Monitor', width: 1920, height: 1080, device: 'Monitor panorámico de gestión' },
] as const;

export type BreakpointKey = keyof typeof breakpoints;
export type ContainerKey = keyof typeof containers;
