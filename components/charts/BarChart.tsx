import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IconType } from 'react-icons';

interface BarConfig {
  dataKey: string;
  color: string;
  name: string;
  icon?: IconType;
  gradient?: string[];
}

interface BarChartProps {
  data: Array<Record<string, string | number>>;
  bars: BarConfig[];
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
