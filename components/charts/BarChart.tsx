import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BarChartProps {
  data: { [key: string]: string | number }[];
  bars: {
    dataKey: string;
    color: string;
    name: string;
  }[];
  xAxisKey?: string;
}

export function BarChart({ data, bars, xAxisKey = 'name' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.color}
            name={bar.name}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
