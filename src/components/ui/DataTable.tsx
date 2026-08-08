import type { ReactNode } from "react";

/* ==========================================================================
   TABELLA DATI
   Intestazioni in mono maiuscolo, cifre a larghezza fissa, righe separate
   da hairline. Su mobile la tabella scorre dentro il proprio contenitore:
   la pagina non scorre mai in orizzontale.
   ========================================================================== */

export type Column = {
  key: string;
  head: string;
  /** Allinea a destra e forza le cifre tabulari. */
  numeric?: boolean;
};

export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: Column[];
  rows: Record<string, ReactNode>[];
  caption?: string;
}) {
  return (
    <div className="w-full overflow-x-auto border border-line">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        {caption && (
          <caption className="eyebrow border-b border-line px-4 py-3 text-left">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`eyebrow px-4 py-3 font-normal ${c.numeric ? "text-right" : ""}`}
              >
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-line last:border-0 odd:bg-surface-1 hover:bg-surface-2"
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`px-4 py-3 align-top text-data text-strong ${
                    c.numeric ? "text-right font-mono tabular" : "font-mono"
                  }`}
                >
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
