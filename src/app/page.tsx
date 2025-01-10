import Range from "./components/Range/Range";
import rangeServices from "./services";

export default async function Home() {
  const minMax = rangeServices.getMinMaxValues();
  const range = rangeServices.getRangeValues();

  const [minMaxValues, values] = await Promise.all([minMax, range]);
  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-24">
      <span className="text-center w-1/3">
        Bienvenid@. Aquí tienes una preview de las dos versiones del componente
        Range. Además clicando en los links de la navbar, puedes acceder a cada
        ejercicio por separado.
      </span>
      <Range
        type="normal"
        minValue={minMaxValues.min}
        maxValue={minMaxValues.max}
      />

      <Range type="fixed" rangeValues={values.rangeValues} />
    </main>
  );
}
