import { Card, CardContent } from "../components/ui/card";
import { Recommendations } from "../components/Recommendations";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DollarSignIcon, MousePointerClickIcon, TargetIcon } from "lucide-react";
import { PlatformSpendChart } from "../components/PlatformSpendChart";
import { TopCampaignsTable } from "../components/TopCampaignsTable";
import { useTheme } from 'next-themes';
import cn from 'classnames';
import { AIAgentStats } from "../components/AIAgentStats";

const performanceData = [
  { name: 'Jan', spend: 12000, ctr: 2.4, conversions: 450 },
  { name: 'Feb', spend: 14000, ctr: 2.8, conversions: 520 },
  { name: 'Mar', spend: 11000, ctr: 2.2, conversions: 480 },
  { name: 'Apr', spend: 15000, ctr: 3.0, conversions: 580 },
  { name: 'May', spend: 16500, ctr: 3.2, conversions: 620 },
  { name: 'Jun', spend: 14800, ctr: 2.9, conversions: 550 },
];

const performanceMetrics = [
  {
    label: 'Total Spend',
    value: '$14,800',
    change: 8.2,
    icon: DollarSignIcon,
    color: 'from-blue-500 to-blue-600'
  },
  {
    label: 'CTR',
    value: '2.9%',
    change: 12.3,
    icon: MousePointerClickIcon,
    color: 'from-purple-500 to-purple-600'
  },
  {
    label: 'Conversions',
    value: '550',
    change: -3.2,
    icon: TargetIcon,
    color: 'from-emerald-500 to-emerald-600'
  }
];

const gradientDefs = (
  <defs>
    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#EC4899" />
      <stop offset="100%" stopColor="#BE185D" />
    </linearGradient>
    <linearGradient id="ctrGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FCD34D" />
      <stop offset="100%" stopColor="#F59E0B" />
    </linearGradient>
    <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F472B6" />
      <stop offset="100%" stopColor="#DB2777" />
    </linearGradient>
  </defs>
);

const metricLabels = {
  spend: 'Spend',
  ctr: 'CTR',
  conversions: 'Conversions'
};

const metricColors = {
  spend: '#EC4899',
  ctr: '#FCD34D',
  conversions: '#F472B6'
};

export default function Dashboard() {
  const [selectedMetrics, setSelectedMetrics] = useState(['spend', 'ctr', 'conversions']);
  const { theme } = useTheme();

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metric) && prev.length > 1) {
        return prev.filter(m => m !== metric);
      } else if (!prev.includes(metric)) {
        return [...prev, metric];
      }
      return prev;
    });
  };

  return (
    <div className={cn(
      "p-4 min-h-screen",
      theme === 'dark'
        ? "bg-gradient-to-b from-[#0F0720] via-[#1A0B2E] to-[#0F0720]"
        : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
    )}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Headline Section */}
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className={cn(
              "text-2xl font-semibold",
              theme === 'dark'
                ? "bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400"
                : "text-gray-800"
            )}>
              Campaign Dashboard
            </h2>
            <p className={cn(
              "text-sm mt-1",
              theme === 'dark' ? "text-purple-300/80" : "text-gray-500"
            )}>Overview of your campaign performance and insights</p>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className={cn(
                  "border",
                  theme === 'dark'
                    ? "bg-[#1A0B2E]/80 border-[#6D28D9]/20"
                    : "bg-white border-gray-200"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className={cn(
                          "text-xs",
                          theme === 'dark' ? "text-purple-300/80" : "text-gray-500"
                        )}>{metric.label}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={cn(
                            "text-xl font-bold",
                            theme === 'dark'
                              ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300"
                              : "text-gray-800"
                          )}>
                            {metric.value}
                          </span>
                          <span className={cn(
                            "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium",
                            metric.change >= 0 
                              ? theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                              : theme === 'dark' ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-600'
                          )}>
                            {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                          </span>
                        </div>
                      </div>
                      <div className={cn(
                        "p-2 rounded-lg",
                        theme === 'dark' ? `bg-gradient-to-br ${metric.color} bg-opacity-10` : "bg-gray-100"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          theme === 'dark' ? "text-white" : "text-gray-600"
                        )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chart and Recommendations */}
          <div className="grid grid-cols-5 gap-6">
            {/* Chart */}
            <Card className={cn(
              "col-span-3 border",
              theme === 'dark'
                ? "bg-[#1A0B2E]/80 border-[#6D28D9]/20"
                : "bg-white border-gray-200"
            )}>
              <CardContent className="p-6">
                <div className="flex justify-end mb-4">
                  <div className="flex gap-2">
                    <button className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      theme === 'dark'
                        ? "bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white hover:from-[#5B21B6] hover:to-[#4338CA]"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    )}>Daily</button>
                    <button className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      theme === 'dark'
                        ? "bg-[#2D1B69]/30 text-purple-300 hover:bg-[#2D1B69]/50"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}>Weekly</button>
                    <button className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                      theme === 'dark'
                        ? "bg-[#2D1B69]/30 text-purple-300 hover:bg-[#2D1B69]/50"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}>Monthly</button>
                  </div>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      {gradientDefs}
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={theme === 'dark' ? "#6D28D9" : "#E5E7EB"} 
                        vertical={false} 
                        opacity={0.1} 
                      />
                      <XAxis 
                        dataKey="name" 
                        axisLine={{ stroke: theme === 'dark' ? '#6D28D9' : '#E5E7EB' }}
                        tickLine={{ stroke: theme === 'dark' ? '#6D28D9' : '#E5E7EB' }}
                        tick={{ fill: theme === 'dark' ? '#E9D5FF' : '#4B5563', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={{ stroke: theme === 'dark' ? '#6D28D9' : '#E5E7EB' }}
                        tickLine={{ stroke: theme === 'dark' ? '#6D28D9' : '#E5E7EB' }}
                        tick={{ fill: theme === 'dark' ? '#E9D5FF' : '#4B5563', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(45, 27, 105, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(8px)',
                          border: theme === 'dark' ? '1px solid rgba(109, 40, 217, 0.2)' : '1px solid rgba(229, 231, 235, 1)',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                        labelStyle={{ color: theme === 'dark' ? '#E9D5FF' : '#4B5563' }}
                        itemStyle={{ color: theme === 'dark' ? '#E9D5FF' : '#4B5563' }}
                      />
                      <Legend 
                        verticalAlign="bottom"
                        height={72}
                        content={({ payload }) => (
                          <div className="flex flex-wrap gap-3 justify-center mt-8">
                            {payload?.map((entry: any) => (
                              <div
                                key={String(entry.dataKey)}
                                onClick={() => toggleMetric(String(entry.dataKey))}
                                className={cn(
                                  "relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200",
                                  selectedMetrics.includes(String(entry.dataKey))
                                    ? theme === 'dark'
                                      ? "bg-[#2D1B69]/50 text-white"
                                      : "bg-gray-100 text-gray-800"
                                    : theme === 'dark'
                                      ? "text-purple-300/60 hover:text-purple-300"
                                      : "text-gray-400 hover:text-gray-600"
                                )}
                              >
                                {!selectedMetrics.includes(String(entry.dataKey)) && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent transform -rotate-6" />
                                  </div>
                                )}
                                <div 
                                  className={`w-3 h-3 rounded-full ${
                                    !selectedMetrics.includes(String(entry.dataKey)) ? 'opacity-40' : ''
                                  }`}
                                  style={{ 
                                    background: `linear-gradient(180deg, ${metricColors[entry.dataKey as keyof typeof metricColors]} 0%, ${metricColors[entry.dataKey as keyof typeof metricColors]}99 100%)`
                                  }}
                                />
                                <span className="text-sm font-medium">
                                  {metricLabels[entry.dataKey as keyof typeof metricLabels]}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      {selectedMetrics.includes('spend') && (
                        <Line 
                          type="monotone" 
                          dataKey="spend" 
                          stroke="url(#spendGradient)" 
                          strokeWidth={2}
                          dot={{ fill: '#EC4899', r: 4 }}
                          name="Spend"
                        />
                      )}
                      {selectedMetrics.includes('ctr') && (
                        <Line 
                          type="monotone" 
                          dataKey="ctr" 
                          stroke="url(#ctrGradient)" 
                          strokeWidth={2}
                          dot={{ fill: '#FCD34D', r: 4 }}
                          name="CTR"
                        />
                      )}
                      {selectedMetrics.includes('conversions') && (
                        <Line 
                          type="monotone" 
                          dataKey="conversions" 
                          stroke="url(#conversionsGradient)" 
                          strokeWidth={2}
                          dot={{ fill: '#F472B6', r: 4 }}
                          name="Conversions"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="col-span-2">
              <Recommendations buttonClassName={cn(
                "px-3 py-1.5 h-auto text-sm font-medium whitespace-nowrap",
                theme === 'dark'
                  ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
                  : "bg-purple-50 hover:bg-purple-100 text-purple-700"
              )} />
            </div>
          </div>

          {/* Platform Distribution and Top Campaigns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <PlatformSpendChart />
            </div>
            <div className="lg:col-span-2">
              <TopCampaignsTable />
            </div>
          </div>

          {/* AI Agent Performance Stats */}
          <div className="mt-6">
            <AIAgentStats />
          </div>
        </div>
      </div>
    </div>
  );
}
