import React from 'react';
import { MetricCard } from './MetricCard';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { useTheme } from './ThemeProvider';
import { 
  FaFacebook, 
  FaGoogle, 
  FaLinkedin 
} from 'react-icons/fa';
import { 
  MdTrendingUp, 
  MdPaid 
} from 'react-icons/md';

export const chartColors = {
  facebook: { 
    light: '#1877F2',
    dark: '#1877F2',
    icon: FaFacebook,
    gradientLight: ['#1877F2', '#199EFF'],
    gradientDark: ['#1877F2', '#5C7CBD']
  },
  google: { 
    light: '#f9be0c',
    dark: '#f9be0c',
    icon: FaGoogle,
    gradientLight: ['#f9be0c', '#34A853'],
    gradientDark: ['#f9be0c', '#4CAF50']
  },
  linkedin: { 
    light: '#cc2761',
    dark: '#cc2761',
    icon: FaLinkedin,
    gradientLight: ['#cc2761', '#00A0DC'],
    gradientDark: ['#cc2761', '#38A3E1']
  },
  organic: { 
    light: '#34A853',
    dark: '#4CAF50',
    icon: MdTrendingUp,
    gradientLight: ['#34A853', '#41C363'],
    gradientDark: ['#4CAF50', '#66BB6A']
  },
  paid: { 
    light: '#EA4335',
    dark: '#EF5350',
    icon: MdPaid,
    gradientLight: ['#EA4335', '#FF5252'],
    gradientDark: ['#EF5350', '#FF6B6B']
  }
};

const lineChartData = [
  { name: 'Jan', facebook: 4000, google: 2400, linkedin: 2400 },
  { name: 'Fev', facebook: 3000, google: 1398, linkedin: 2210 },
  { name: 'Mar', facebook: 2000, google: 9800, linkedin: 2290 },
  { name: 'Abr', facebook: 2780, google: 3908, linkedin: 2000 },
  { name: 'Mai', facebook: 1890, google: 4800, linkedin: 2181 },
];

const barChartData = [
  { name: 'Seg', organic: 4000, paid: 2400 },
  { name: 'Ter', organic: 3000, paid: 1398 },
  { name: 'Qua', organic: 2000, paid: 9800 },
  { name: 'Qui', organic: 2780, paid: 3908 },
  { name: 'Sex', organic: 1890, paid: 4800 },
];

const pieChartData = [
  { name: 'Facebook Ads', value: 40, color: chartColors.facebook },
  { name: 'Google Ads', value: 35, color: chartColors.google },
  { name: 'LinkedIn Ads', value: 25, color: chartColors.linkedin },
];

const sections = [
  {
    id: 'metrics',
    title: 'Métricas Principais',
    content: [
      {
        title: 'Investimento Total',
        value: "R$ 75.086,00",
        previousValue: "R$ 70.000,00",
        change: 7.2,
        allocations: [
          { label: 'Facebook Ads', value: 40, previousValue: 35 },
          { label: 'Google Ads', value: 35, previousValue: 38 },
          { label: 'LinkedIn Ads', value: 25, previousValue: 27 }
        ]
      },
      {
        title: 'ROI Médio',
        value: "320%",
        previousValue: "280%",
        change: 14.3,
        allocations: [
          { label: 'Facebook Ads', value: 380, previousValue: 350 },
          { label: 'Google Ads', value: 290, previousValue: 270 },
          { label: 'LinkedIn Ads', value: 290, previousValue: 220 }
        ]
      },
      {
        title: 'Conversões',
        value: "1.234",
        previousValue: "1.245",
        change: -0.9,
        allocations: [
          { label: 'Facebook Ads', value: 45, previousValue: 48 },
          { label: 'Google Ads', value: 35, previousValue: 32 },
          { label: 'LinkedIn Ads', value: 20, previousValue: 20 }
        ]
      }
    ]
  }
];

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getLineChartConfig = (dataKey: string) => ({
    dataKey,
    color: chartColors[dataKey as keyof typeof chartColors][isDark ? 'dark' : 'light'],
    name: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
    icon: chartColors[dataKey as keyof typeof chartColors].icon,
    gradient: chartColors[dataKey as keyof typeof chartColors][isDark ? 'gradientDark' : 'gradientLight']
  });

  return (
    <div className={`space-y-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
      

      {sections.map(section => (
        <section key={section.id} className={`rounded-lg p-6 shadow-sm
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className={`text-xl font-semibold mb-4
            ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          >
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.content.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
              />
            ))}
          </div>
        </section>
      ))}

      <section className={`rounded-lg p-6 shadow-sm
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className={`text-xl font-semibold mb-4
          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Desempenho por Canal
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-lg font-medium mb-4
              ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
            >
              Evolução Mensal
            </h3>
            <LineChart
              data={lineChartData}
              lines={[
                getLineChartConfig('facebook'),
                getLineChartConfig('google'),
                getLineChartConfig('linkedin'),
              ]}
            />
          </div>
          <div>
            <h3 className={`text-lg font-medium mb-4
              ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
            >
              Tráfego Orgânico vs Pago
            </h3>
            <BarChart
              data={barChartData}
              bars={[
                {
                  dataKey: 'organic',
                  color: chartColors.organic[isDark ? 'dark' : 'light'],
                  name: 'Orgânico',
                  icon: chartColors.organic.icon,
                  gradient: chartColors.organic[isDark ? 'gradientDark' : 'gradientLight']
                },
                {
                  dataKey: 'paid',
                  color: chartColors.paid[isDark ? 'dark' : 'light'],
                  name: 'Pago',
                  icon: chartColors.paid.icon,
                  gradient: chartColors.paid[isDark ? 'gradientDark' : 'gradientLight']
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className={`rounded-lg p-6 shadow-sm
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2 className={`text-xl font-semibold mb-4
          ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Distribuição do Investimento
        </h2>
        <div className="max-w-md mx-auto">
          <PieChart 
            data={pieChartData.map(item => ({ 
              ...item, 
              color: item.color[isDark ? 'dark' : 'light'] 
            }))} 
          />
        </div>
      </section>
    </div>
  );
}
