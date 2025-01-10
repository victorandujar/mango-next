import rangeServices from "../services";
import Range from "../components/Range/Range";

export default async function Exercise1Page() {
  const minMaxValues = await rangeServices.getMinMaxValues();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-24">
      <Range
        type="normal"
        minValue={minMaxValues.min}
        maxValue={minMaxValues.max}
      />
    </main>
  );
}
