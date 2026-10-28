/**
 * AnalyteQC — Identidad de Marca y Sistema de Diseño
 * Fuente de verdad: analyteqc-web/src/config/theme.ts & analyteqc-web/src/style.css
 */

export const brandIdentity = {
  name: 'AnalyteQC',
  tagline: 'Control de Calidad Interno Clínico con Rigor Determinista',
  foundingDuo: {
    bacteriologist: {
      role: 'Cofundador & Especialista en Calidad de Laboratorio',
      domain: 'Bacteriólogo Clínico',
      focus: 'Criterio analítico, flujo de mesón, normatividad ISO 15189 y seguridad diagnóstica',
    },
    engineer: {
      role: 'Cofundador & Arquitecto de Software',
      domain: 'Ingeniero en Sistemas',
      focus: 'Matemática determinista, rendimiento de alta velocidad y arquitectura inmutable',
    },
  },
  assets: {
    logo: '/brand/analyteqc-logo.svg',
    icon: '/brand/analyteqc-icon.svg',
    iconWhite: '/brand/AnalyteQC_icono_blanco.svg',
  },
  colors: {
    // Color institucional base
    brand: {
      900: '#1F3892', // Azul marino profundo institucional
    },
    // Azul primario clínico (acciones principales, identidad)
    primary: {
      50: '#E8F0FF',
      100: '#CCDDFF',
      500: '#0056FF', // Azul vibrante clínico principal
      600: '#0047D6',
      700: '#003BB3',
    },
    // Colores de acento (foco visual en isotipo y cartas de control)
    accent: {
      blue: '#5DB4FF',      // Acento azul cielo
      turquoise: '#00D0E3', // Acento turquesa analítico (destacado en el logo)
    },
    // Escala neutral equilibrada
    neutral: {
      0: '#FFFFFF',
      50: '#F2F5FA',   // Fondo claro de superficies
      200: '#DDE3EC',  // Bordes y separadores sutiles
      300: '#C3CBD6',  // Bordes interactivos
      400: '#98A2B0',  // Textos deshabilitados o secundarios
      500: '#667180',  // Subtítulos y textos de soporte
      700: '#3D4756',  // Textos intermedios y etiquetas
      900: '#141C2B',  // Fondo oscuro base / texto oscuro principal
      950: '#0B111E',  // Fondo ultra oscuro para temas oscuros / landing
    },
    // Estados clínicos (Veredictos de corridas y reglas de Westgard)
    status: {
      success: {
        500: '#16A35F', // Corrida aceptada (En control)
        600: '#0F7B46',
      },
      warning: {
        500: '#F59E0B', // Advertencia Westgard (Regla 1-2s)
        600: '#B45309',
      },
      error: {
        500: '#EF4444', // Rechazo analítico (1-3s, 2-2s, R-4s, etc. Fuera de control)
        600: '#C8231A',
      },
    },
  },
  typography: {
    fontSans: "'Poppins', ui-sans-serif, system-ui, sans-serif",
  },
} as const;

export type BrandIdentity = typeof brandIdentity;
