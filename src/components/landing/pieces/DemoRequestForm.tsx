import * as React from 'react';
import { ArrowRightIcon, CircleCheckIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Orden de lectura del bacteriólogo: quién es → dónde trabaja → cómo lo contactamos
 * (WhatsApp primero: es el canal con el que se coordina la demo).
 */
const fields = [
  { id: 'demo-name', name: 'name', type: 'text', label: 'Nombre y apellido', placeholder: 'Dra. María González', autoComplete: 'name' },
  { id: 'demo-lab', name: 'lab', type: 'text', label: 'Laboratorio / institución', placeholder: 'Laboratorio Clínico San José', autoComplete: 'organization' },
  { id: 'demo-phone', name: 'phone', type: 'tel', label: 'Teléfono / WhatsApp', placeholder: '+57 300 123 4567', autoComplete: 'tel' },
  { id: 'demo-email', name: 'email', type: 'email', label: 'Correo electrónico profesional', placeholder: 'mgonzalez@laboratorio.com', autoComplete: 'email' },
] as const;

/**
 * Formulario de solicitud de demo (isla client:visible).
 * TODO: conectar el envío al endpoint real; hoy solo confirma en pantalla.
 */
export function DemoRequestForm() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <Alert className="mt-10 rounded-sm border-0 bg-surface-tint text-primary-500">
        <CircleCheckIcon />
        <AlertTitle>¡Gracias por tu interés!</AlertTitle>
        <AlertDescription className="text-neutral-700">
          Nos comunicaremos en menos de 24 horas para coordinar la demo de tu laboratorio.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form
      className="mx-auto mt-10 grid w-full max-w-[32rem] grid-cols-1 gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((field) => (
        <div key={field.id} className="grid gap-2">
          <Label htmlFor={field.id} className="text-sm font-semibold text-brand-900">
            {field.label}&nbsp;*
          </Label>
          <Input
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required
            className="h-12 rounded-full border-neutral-300 bg-neutral-0 px-5 text-base text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/35 md:text-base lg:h-14"
          />
        </div>
      ))}

      <Button
        type="submit"
        size="cta"
        className="group mt-3 justify-self-center"
      >
        Quiero mi Demostración Guiada
        <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
