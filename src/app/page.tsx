"use client";

import Range from "./components/Range/Range";
import { useRangeContext } from "./contexts/RangeContext";

export default function Home() {
  const { minMaxValues, values } = useRangeContext();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-24">
      <span className="text-center w-1/3 mobile:w-full px-10">
        Bienvenid@. Aquí tienes una preview de las dos versiones del componente
        Range. Además clicando en los links de la navbar, puedes acceder a cada
        ejercicio por separado.
      </span>
      <Range
        type="normal"
        minValue={minMaxValues?.min}
        maxValue={minMaxValues?.max}
      />

      <Range type="fixed" rangeValues={values?.rangeValues} />
    </main>
  );
}
