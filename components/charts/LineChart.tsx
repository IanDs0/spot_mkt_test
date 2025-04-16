import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IconType } from 'react-icons';

interface LineConfig {
  dataKey: string;
  color: string;
  name: string;
  icon?: IconType;
  gradient?: string[];
}

interface LineChartProps {
  data: Array<Record<string, string | number>>;
  lines: LineConfig[];
  xAxisKey?: string;
}

export function LineChart({ data, lines, xAxisKey = 'name' }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            name={line.name}
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
