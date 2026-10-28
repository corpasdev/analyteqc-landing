import { CheckIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ComparisonRow {
  dimension: string;
  highlight: string;
  manual: string;
  analyteqc: string;
}

function ManualText({ text }: { text: string }) {
  return (
    <span className="flex items-start gap-3">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
        <XIcon className="size-3.5" strokeWidth={2.5} aria-label="Método manual" />
      </span>
      <span>{text}</span>
    </span>
  );
}

/** Check de marca (spec §3.4): círculo accent-turquoise con check blanco de 2.5 px. */
function AnalyteText({ text }: { text: string }) {
  return (
    <span className="flex items-start gap-3">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-turquoise text-neutral-0">
        <CheckIcon className="size-3.5" strokeWidth={2.5} aria-label="Con AnalyteQC" />
      </span>
      <span>{text}</span>
    </span>
  );
}

/**
 * Comparativo responsive:
 *  - < md: una Card por desafío (lectura vertical en móvil).
 *  - ≥ md: Table de shadcn con tres columnas.
 */
export function ComparisonMatrix({ rows }: { rows: ComparisonRow[] }) {
  return (
    <>
      {/* Móvil / tablet pequeña */}
      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <Card key={row.dimension} className="gap-4 rounded-lg border-neutral-200 py-6 shadow-none">
            <CardHeader className="gap-1 px-6">
              <CardTitle className="text-lg font-semibold text-brand-900">{row.dimension}</CardTitle>
              <span className="text-sm text-primary-500">{row.highlight}</span>
            </CardHeader>
            <CardContent className="grid gap-3 px-6 text-base leading-[1.6]">
              <div className="rounded-sm bg-neutral-50 p-4 text-neutral-500">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Manual / Hojas de cálculo
                </p>
                <ManualText text={row.manual} />
              </div>
              <div className="rounded-sm bg-surface-tint p-4 text-neutral-700">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                  Con AnalyteQC
                </p>
                <AnalyteText text={row.analyteqc} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Escritorio */}
      <div className="hidden overflow-hidden rounded-lg border border-neutral-200 md:block">
        <Table className="table-fixed">
          <TableHeader className="bg-surface-tint">
            <TableRow className="border-neutral-200 hover:bg-transparent">
              <TableHead className="h-auto w-1/3 px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-900">
                Desafío en el Laboratorio
              </TableHead>
              <TableHead className="h-auto w-1/3 border-l border-neutral-200 px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Control Manual / Hojas de Cálculo
              </TableHead>
              <TableHead className="h-auto w-1/3 border-l border-neutral-200 px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-500">
                <span className="flex items-center justify-between gap-2">
                  Con AnalyteQC en tu Rutina
                  <Badge className="px-3 py-1 text-[11px] font-semibold normal-case tracking-normal">Recomendado</Badge>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.dimension} className="border-neutral-200 hover:bg-surface-tint/40">
                <TableCell className="px-6 py-6 align-middle whitespace-normal">
                  <span className="block text-lg font-semibold text-brand-900">{row.dimension}</span>
                  <span className="mt-1 block text-sm text-primary-500">{row.highlight}</span>
                </TableCell>
                <TableCell className="border-l border-neutral-200 px-6 py-6 text-base leading-[1.6] whitespace-normal text-neutral-500">
                  <ManualText text={row.manual} />
                </TableCell>
                <TableCell className="border-l border-neutral-200 px-6 py-6 text-base leading-[1.6] whitespace-normal text-neutral-700">
                  <AnalyteText text={row.analyteqc} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
