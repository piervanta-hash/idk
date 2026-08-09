"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/Field";

/* Il filtro a due stati che segmentera' PA / Privati in home, sulle pagine
   di servizio e sulla griglia dei casi studio. Qui solo per mostrarne gli
   stati: la logica di filtro arriva in Fase 5. */
export function SegmentedDemo() {
  const [value, setValue] = useState("public");
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        name="Sector"
        value={value}
        onChange={setValue}
        options={[
          { value: "public", label: "Public sector" },
          { value: "private", label: "Private" },
        ]}
      />
      <span className="font-mono text-data text-label">
        stato attivo: <span className="text-accent">{value}</span>
      </span>
    </div>
  );
}
