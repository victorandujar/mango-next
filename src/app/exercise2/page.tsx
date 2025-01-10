import rangeServices from "../services";
import Range from "../components/Range/Range";

export default async function Exercise2Page() {
  const { rangeValues } = await rangeServices.getRangeValues();

  return (
    <main className="w-full flex flex-col items-center justify-center gap-20 pt-24">
      <Range type="fixed" rangeValues={rangeValues} />
    </main>
  );
}
