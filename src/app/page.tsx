import Range from "./components/Range/Range";
import rangeServices from "./services";

export default async function Home() {
  const minMax = rangeServices.getMinMaxValues();
  const range = rangeServices.getRangeValues();

  const [minMaxValues, values] = await Promise.all([minMax, range]);
  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-48">
      <Range
        type="normal"
        minValue={minMaxValues.min}
        maxValue={minMaxValues.max}
      />

      <Range type="fixed" rangeValues={values.rangeValues} />
    </main>
  );
}
