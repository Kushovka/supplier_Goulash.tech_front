type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  optionLabels?: Record<string, string>;
  suffix?: string;
};

const SelectField = ({
  label,
  value,
  options,
  onChange,
  optionLabels,
  suffix,
}: SelectFieldProps) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
    {label}
    <select
      className="h-11 rounded-md border border-zinc-200 bg-white px-3 text-zinc-950 outline-none focus:border-emerald-700"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {optionLabels?.[option] ?? `${option}${suffix ? ` ${suffix}` : ''}`}
        </option>
      ))}
    </select>
  </label>
);

export default SelectField;
