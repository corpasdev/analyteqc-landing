/**
 * AnalyteQC — Navegación de la landing (Navbar, menú móvil y Footer).
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Footer: mismas secciones que el header. */
export const sectionLinks: NavLink[] = [
  { label: 'Quiénes somos', href: '#fundadores' },
  { label: 'Funciones', href: '#solucion' },
  // TODO: crear las páginas y cambiar los href
  { label: 'PQRS', href: '#' },
  { label: 'Política de tratamiento de datos personales', href: '#' },
  { label: 'Política de privacidad', href: '#' },
];

/** Header: sólo lo esencial. */
export const headerLinks: NavLink[] = [
  { label: 'Funciones', href: '#solucion' },
  { label: 'Quiénes somos', href: '#fundadores' },
];

export const demoCta: NavLink = { label: 'Agendar demo', href: '#agendar-demo' };

export const contactLinks: NavLink[] = [
  { label: 'Contáctanos', href: '#fundadores' },
];
