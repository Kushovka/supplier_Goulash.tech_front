type MetricProps = {
  label: string;
  value: string;
};

const Metric = ({ label, value }: MetricProps) => (
  <div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-zinc-500">{label}</div>
  </div>
);

export default Metric;
