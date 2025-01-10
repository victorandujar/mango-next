interface Props {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "min" | "max";
}

const ReusbaleInput = ({
  onChange,
  value,
  type,
}: Props): React.ReactElement => {
  return (
    <div className="flex flex-col">
      <input
        type="number"
        value={Math.round(value)}
        onChange={onChange}
        className={`w-10 text-${type === "min" ? "left" : "right"} `}
        aria-label={type === "min" ? "min input" : "max input"}
      />
    </div>
  );
};

export default ReusbaleInput;
