"use client";

import Range from "../components/Range/Range";
import { useRangeContext } from "../contexts/RangeContext";

export default function Exercise2Page() {
  const {
    values: { rangeValues },
  } = useRangeContext();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-24">
      <Range type="fixed" rangeValues={rangeValues} />
    </main>
  );
}
