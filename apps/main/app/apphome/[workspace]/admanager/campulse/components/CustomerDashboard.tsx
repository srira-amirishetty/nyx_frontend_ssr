import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import FunnelChart from "../components/FunnelChart";
import { useCustomers } from "../hooks/useCustomers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Mock data - Replace with actual API data
const mockData = {
  customerMetrics: {
    totalCustomers: 25890,
    newCustomers: 8250,
    repeatCustomers: 17640,
  },
  customerTypes: {
    free: 15890,
    paid: 10000,
  },
  demographics: {
    age: [
      { group: "18-24", value: 20 },
      { group: "25-34", value: 35 },
      { group: "35-44", value: 25 },
      { group: "45-54", value: 15 },
      { group: "55+", value: 5 },
    ],
    gender: [
      { group: "Male", value: 55 },
      { group: "Female", value: 42 },
      { group: "Other", value: 3 },
    ],
  },
  customerDistribution: {
    segments: [
      { name: "Demographics", value: "age_group" },
      { name: "Spending Habits", value: "customer_segment" },
      { name: "Customer Lifetime", value: "customer_lifetime_value" },
      // { name: "Top Products", value: "products" },
      { name: "Acquisition Channels", value: "acquisition_channel" },
      { name: "Conversion Channels", value: "conversion" },
    ],
    data: {
      demographics: [
        { name: "18-24", value: 30 },
        { name: "25-34", value: 45 },
        { name: "35-44", value: 15 },
        { name: "45+", value: 10 },
      ],
      spending: [
        { name: "High Spenders", value: 20 },
        { name: "Medium Spenders", value: 45 },
        { name: "Low Spenders", value: 35 },
      ],
      lifetime: [
        { name: "New (<1m)", value: 25 },
        { name: "Growing (1-6m)", value: 35 },
        { name: "Loyal (>6m)", value: 40 },
      ],
      products: [
        { name: "Electronics", value: 40 },
        { name: "Fashion", value: 30 },
        { name: "Home & Living", value: 20 },
        { name: "Others", value: 10 },
      ],
      channels: [
        { name: "Organic Search", value: 35 },
        { name: "Social Media", value: 25 },
        { name: "Referral", value: 20 },
        { name: "Direct", value: 20 },
      ],
      conversion: [
        { name: "Organic", value: 30 },
        { name: "Paid", value: 25 },
        { name: "Email", value: 20 },
        { name: "Social Media", value: 15 },
        { name: "Referral", value: 10 },
      ],
    },
  },
  retentionData: {
    averageRetention: {
      cohort: "Average",
      newCustomers: 0,
      spend: 0,
      revenue: 0,
      days: [90.2, 71.5, 68.2, 66.7, 66.1, 58.7],
    },
    cohorts: [
      {
        cohort: "October 2023",
        newCustomers: 47,
        spend: 2350,
        revenue: 4700,
        days: [95.7, 85.1, 76.6, 72.3, 68.1, 57.4],
      },
      {
        cohort: "September 2023",
        newCustomers: 58,
        spend: 2900,
        revenue: 5800,
        days: [93.1, 82.8, 75.9, 70.7, 65.5, 60.3],
      },
      {
        cohort: "August 2023",
        newCustomers: 63,
        spend: 3150,
        revenue: 12600,
        days: [91.3, 80.2, 73.0, 68.3, 63.5, 58.7],
      },
      {
        cohort: "July 2023",
        newCustomers: 68,
        spend: 3400,
        revenue: 13600,
        days: [89.7, 77.9, 70.6, 66.2, 61.8, 57.4],
      },
      {
        cohort: "June 2023",
        newCustomers: 72,
        spend: 3600,
        revenue: 14400,
        days: [88.9, 76.4, 69.4, 65.3, 61.1, 56.9],
      },
      {
        cohort: "May 2023",
        newCustomers: 55,
        spend: 2750,
        revenue: 11000,
        days: [87.3, 74.5, 67.3, 63.6, 59.1, 54.5],
      },
    ],
  },
  churnData: [
    { month: "Jan", churnRate: 2.8 },
    { month: "Feb", churnRate: 3.2 },
    { month: "Mar", churnRate: 2.9 },
    { month: "Apr", churnRate: 3.5 },
    { month: "May", churnRate: 3.1 },
    { month: "Jun", churnRate: 2.7 },
    { month: "Jul", churnRate: 2.5 },
    { month: "Aug", churnRate: 2.3 },
  ],
  customerFinancialMetrics: {
    clv: {
      current: 850,
      previous: 790,
      trend: 7.6,
    },
    cac: {
      current: 125,
      previous: 135,
      trend: -7.4,
    },
    crc: {
      current: 45,
      previous: 48,
      trend: -6.3,
    },
    clvCacRatio: {
      current: 6.8,
      previous: 5.9,
      trend: 15.3,
    },
  },
  cacTrends: Array(10)
    .fill(null)
    .map((_, i) => {
      const dates = [
        "Jan 5",
        "Jan 15",
        "Jan 25",
        "Feb 1",
        "Feb 10",
        "Jan 5",
        "Jan 15",
        "Jan 25",
        "Feb 1",
        "Feb 10",
      ];
      return {
        date: dates[i],
        currentPeriod: 175 - (i % 5) * 5 + Math.sin(i) * 8,
        previousPeriod: 190 - (i % 5) * 4 + Math.cos(i) * 10,
        lastMonth: 205 - (i % 5) * 6 + Math.sin(i * 2) * 12,
        lastYear: 220 - (i % 5) * 7 + Math.cos(i * 2) * 15,
      };
    }),
};

const retentionData: any = {
  averageRetention: {
    cohort: "Average Retention",
    users: null,
    days: [91.0, 69.8, 67.5, 66.7, 66.1, 58.7],
  },
  cohorts: [
    {
      cohort: "October 20, 2023",
      users: 47,
      newCustomers: 47,
      spend: 2350,
      revenue: 4700,
      days: [95.7, 51.1, 44.7, 85.1, 80.9, 57.4],
    },
    {
      cohort: "October 21, 2023",
      users: 5,
      newCustomers: 5,
      spend: 250,
      revenue: 1000,
      days: [100, 80.0, 100, 80.0, 80.0, 60.0],
    },
    {
      cohort: "October 22, 2023",
      users: 8,
      newCustomers: 8,
      spend: 400,
      revenue: 1600,
      days: [75.0, 62.5, 50.0, 50.0, 37.5, null],
    },
    {
      cohort: "October 23, 2023",
      users: 68,
      newCustomers: 68,
      spend: 3400,
      revenue: 13600,
      days: [97.1, 80.9, 79.4, 51.5, null, null],
    },
    {
      cohort: "October 24, 2023",
      users: 63,
      newCustomers: 63,
      spend: 3150,
      revenue: 12600,
      days: [87.3, 87.3, 63.5, null, null, null],
    },
    {
      cohort: "October 25, 2023",
      users: 58,
      newCustomers: 58,
      spend: 2900,
      revenue: 11600,
      days: [89.7, 56.9, null, null, null, null],
    },
    {
      cohort: "October 26, 2023",
      users: 13,
      newCustomers: 13,
      spend: 650,
      revenue: 2600,
      days: [92.3, null, null, null, null, null],
    },
  ],
};

const repeatPurchaseData = [
  {
    id: "First Purchase",
    value: 15000,
    label: "First Purchase",
  },
  {
    id: "Second Purchase",
    value: 6750,
    label: "Second Purchase",
  },
  {
    id: "Third+ Purchase",
    value: 4200,
    label: "Third+ Purchase",
  },
];

const COLORS = ["#6D28D9", "#4F46E5", "#7C3AED", "#8B5CF6", "#A78BFA"];

const gradientDefs = (
  <defs>
    <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#6D28D9" />
      <stop offset="100%" stopColor="#4F46E5" />
    </linearGradient>
    <linearGradient id="freeGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#EC4899" />
      <stop offset="100%" stopColor="#BE185D" />
    </linearGradient>
    <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#8B5CF6" />
      <stop offset="100%" stopColor="#6D28D9" />
    </linearGradient>
    <linearGradient id="newCustomerGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#c084fc" />
      <stop offset="100%" stopColor="#9333ea" />
    </linearGradient>
    <linearGradient id="repeatCustomerGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#818cf8" />
      <stop offset="100%" stopColor="#4f46e5" />
    </linearGradient>
  </defs>
);

const getRetentionColor = (value: number | null) => {
  if (value === null) return "bg-transparent";

  // Using CSS custom properties for the gradient colors
  const intensity = Math.max(0.1, value / 100);
  if (value >= 90) {
    return "bg-[#6D28D9] bg-opacity-90";
  } else if (value >= 80) {
    return "bg-[#7C3AED] bg-opacity-80";
  } else if (value >= 70) {
    return "bg-[#8B5CF6] bg-opacity-70";
  } else if (value >= 60) {
    return "bg-[#9333EA] bg-opacity-60";
  } else if (value >= 50) {
    return "bg-[#A855F7] bg-opacity-50";
  } else {
    return "bg-[#C084FC] bg-opacity-40";
  }
};

// Helper function to format numbers with K/M abbreviations
const formatNumber = (num: number): string => {

  const format = (num, suffix) => {
    const formatted = (num).toFixed(2);
    return `${formatted.endsWith('.00') ? parseInt(formatted) : formatted}${suffix}`;
  };

  if (num >= 1000000000) {
    return format(num / 1000000000, "B");
  }
  if (num >= 1000000) {
    return format(num / 1000000, "M");
  }
  if (num >= 1000) {
    return format(num / 1000, "K");
  }
  const formattedVal = num?.toFixed?.(2);
  return `${formattedVal?.endsWith('.00') ? parseInt(formattedVal) : formattedVal ?? num}`;
};

const formatCurrency = (val) => {

  const format = (num, suffix) => {
    const formatted = (num).toFixed(2);
    return `₹${formatted.endsWith('.00') ? parseInt(formatted) : formatted}${suffix}`;
  };

  if (val >= 1_000_000_000) return format(val / 1_000_000_000, "B");
  if (val >= 1_000_000) return format(val / 1_000_000, "M");
  if (val >= 1_000) return format(val / 1_000, "K");
  const formattedVal = val?.toFixed?.(2);
  return `₹${formattedVal?.endsWith('.00') ? parseInt(formattedVal) : formattedVal ?? val}`;
};

const MiniBar = ({ value, total }: { value: number; total: number }) => {
  const percentage = (value / total) * 100;
  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-white min-w-[40px] text-right">{formatNumber(value)}</span>
      <div className="w-24 h-1 bg-[#6D28D9]/20 rounded">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-white min-w-[45px]">
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
};

const purchaseData = {
  productPerformance: [
    {
      category: "Electronics",
      newCustomers: 2800,
      regularCustomers: 4200,
      vipCustomers: 6500,
    },
    {
      category: "Fashion",
      newCustomers: 3500,
      regularCustomers: 5100,
      vipCustomers: 4800,
    },
    {
      category: "Home & Living",
      newCustomers: 2200,
      regularCustomers: 3800,
      vipCustomers: 5200,
    },
    {
      category: "Beauty",
      newCustomers: 1800,
      regularCustomers: 2900,
      vipCustomers: 3600,
    },
  ],
  cartSizeData: [
    {
      segment: "New Customers",
      cartValue: 150,
      itemsPerOrder: 2.5,
    },
    {
      segment: "Regular Customers",
      cartValue: 280,
      itemsPerOrder: 3.8,
    },
    {
      segment: "VIP Customers",
      cartValue: 520,
      itemsPerOrder: 5.2,
    },
  ],
};

const CustomerAnalyticsDashboard = () => {
  const [selectedSegment, setSelectedSegment] = useState("age_group");
  const [visibleLines, setVisibleLines] = useState<{ [x: string]: boolean }>({
    "Current Period": true,
    "Previous Period": true,
    "Last Month": true,
    "Last Year": true,
  });

  const {
    customerInsights,
    customerMetrics,
    customerCohort,
    customerSegment,
    customerChurn,
    cacChart,
    cacChannel,
    customerPurchaseFunnel,
    customerFinancials,
    isLoading
  } = useCustomers();

  // const formatCustomerMetric = formatNumber(customerMetrics.data?.data.new_customers)
  // console.log(customerMetrics.data?.data.new_customers)

  const toggleLine = (lineName: string) => {
    setVisibleLines((prev) => ({
      ...prev,
      // @ts-ignore
      [lineName]: !prev[lineName],
    }));
  };

  const getSegmentData = () => {
    switch (selectedSegment) {
      case "demographics":
        return mockData.customerDistribution.data.demographics.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      case "spending":
        return mockData.customerDistribution.data.spending.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      case "lifetime":
        return mockData.customerDistribution.data.lifetime.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      case "products":
        return mockData.customerDistribution.data.products.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      case "channels":
        return mockData.customerDistribution.data.channels.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      case "conversion":
        return mockData.customerDistribution.data.conversion.map((item) => ({
          category: item.name,
          distribution: item.value,
          growth: Math.random() * 20 - 10,
        }));
      default:
        return [];
    }
  };

  return (
    <div className=" w-full h-full ">
      {isLoading ? (
        <>
          <div className="p-4 rounded-[8px] h-[154px] flex items-center ">
            <div className="w-full h-full rounded-xl">
              <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
                <div>
                  <Skeleton
                    //@ts-ignore
                    animation="wave"
                    baseColor="rgba(255, 255, 255, 0.09)"
                    className="w-full h-[500px] rounded-xl "
                  />
                </div>
              </SkeletonTheme>
            </div>
          </div>
        </>
      ) : (


        <div className="flex-1 space-y-4">
          <div className="bg-transparent border-[#6D28D9]/20">
            <CardContent className="p-4">
              <section className="space-y-6">
                {/* Executive Summary Section */}
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 mb-4 text-white">
                  Executive Summary
                </h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  {/* Total Customers Card */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Total Customers
                          </p>
                          <p className="text-xs text-white">
                            Active customer base
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white">
                                {formatNumber(customerMetrics.data?.data.total_customers)}
                              </span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 bg-opacity-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* New Customers Card */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            New Customers
                          </p>
                          <p className="text-xs text-white">
                            Total new customer acquisitions
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white">
                                {formatNumber(customerMetrics.data?.data.new_customers)}
                              </span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Repeat Customers Card */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Repeat Customers
                          </p>
                          <p className="text-xs text-white">
                            Returning customer count
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300 text-white">
                                {formatNumber(customerMetrics.data?.data.repeat_customers)}
                              </span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 bg-opacity-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Analytics Section */}
              <div className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Customer Split Card */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20 h-[440px]">
                    <CardHeader>
                      <CardTitle className="text-xl font-medium text-white">
                        Customer Split
                      </CardTitle>
                      <p className="text-sm text-white">
                        Distribution of new vs repeat customers
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[320px] w-full flex justify-center">
                        <ResponsiveContainer width="85%" height="100%">
                          <PieChart>
                            {gradientDefs}
                            <Pie
                              data={[
                                {
                                  name: "New Customers",
                                  value: customerMetrics.data?.data.new_customers,
                                  fill: "url(#newCustomerGradient)",
                                },
                                {
                                  name: "Repeat Customers",
                                  value:
                                    customerMetrics.data?.data.repeat_customers,
                                  fill: "url(#repeatCustomerGradient)",
                                },
                              ]}
                              cx="50%"
                              cy="45%"
                              innerRadius={77}
                              outerRadius={104}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {[
                                {
                                  name: "New Customers",
                                  value: customerMetrics.data?.data.new_customers,
                                  fill: "url(#newCustomerGradient)",
                                },
                                {
                                  name: "Repeat Customers",
                                  value:
                                    customerMetrics.data?.data.repeat_customers,
                                  fill: "url(#repeatCustomerGradient)",
                                },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A0B2E",
                                borderRadius: "8px",
                                border: "1px solid #4A148C",
                                padding: "12px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                              labelStyle={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "4px"
                              }}
                              itemStyle={{
                                color: "#ffffff",
                                fontSize: "14px",
                                marginTop: "4px"
                              }}
                              formatter={(value: number, label) => [
                                `${(
                                  (value /
                                    (customerMetrics.data?.data.total_customers ||
                                      1)) *
                                  100
                                ).toFixed(2)}%`,
                                label,
                              ]}
                            />
                            <Legend
                              verticalAlign="bottom"
                              height={36}
                              content={({ payload }) => (
                                <div className="flex justify-center gap-4 pt-4 pb-2">
                                  {[
                                    {
                                      label: "New Customers",
                                      value:
                                        formatNumber(customerMetrics.data?.data.new_customers),
                                      perc: customerMetrics.data?.data
                                        .new_customers_perc,
                                    },
                                    {
                                      label: "Repeat Customers",
                                      value:
                                        formatNumber(customerMetrics.data?.data.repeat_customers),
                                      perc: customerMetrics.data?.data
                                        .repeat_customers_perc,
                                    },
                                  ]?.map((entry, i) => (
                                    <div
                                      key={entry.value}
                                      className="flex items-center gap-2"
                                    >
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                          background:
                                            entry.label === "New Customers"
                                              ? "linear-gradient(to bottom, #c084fc, #9333ea)"
                                              : "linear-gradient(to bottom, #818cf8, #4f46e5)",
                                        }}
                                      />
                                      <span className="text-sm text-white">
                                        {entry.value}
                                      </span>
                                      <span className="text-sm text-white">
                                        ({entry.perc?.toFixed(2)} %)
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Distribution Table Card */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20 h-[440px] overflow-y-auto">
                    <CardHeader>
                      <CardTitle className="text-xl font-medium text-white">
                        Customer Distribution
                      </CardTitle>
                      <p className="text-sm text-white">
                        Breakdown by customer segments and growth
                      </p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <Table>
                        <TableHeader className="bg-[#332270]">
                          <TableRow className="border-b border-[#6D28D9]/20">
                            <TableHead className="text-white w-[220px] bg-none rounded-l-lg">
                              <Select
                                value={selectedSegment}
                                onValueChange={setSelectedSegment}
                              >
                                <SelectTrigger className="w-full bg-[#1A0B2E]/1 border-[#6D28D9]/20 text-white h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#332270] border-[#6D28D9]/20">
                                  {mockData.customerDistribution.segments.map(
                                    (segment) => (
                                      <SelectItem
                                        className="focus:bg-[#5E32FF] focus:text-nyx-yellow"
                                        key={segment.value}
                                        value={segment.value}
                                      >
                                        {segment.name}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </TableHead>
                            <TableHead className="text-white text-right w-[140px]">
                              Distribution
                            </TableHead>
                            <TableHead className="text-white text-right rounded-r-lg">
                              Growth
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-y-auto">
                          {customerSegment.data?.data[selectedSegment]?.map(
                            (item, index) => (
                              <TableRow
                                key={index}
                                className="border-b border-[#6D28D9]/20 hover:bg-[#6D28D9]/5"
                              >
                                <TableCell className="text-white">
                                  {item.label}
                                </TableCell>
                                <TableCell className="text-white">
                                  <MiniBar
                                    value={item.count ?? 0}
                                    total={item.total || 1}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <span
                                      className={
                                        item.growth! >= 0
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }
                                    >
                                      {Math.abs(0).toFixed(0)}%
                                    </span>
                                    {item.growth! >= 0 ? (
                                      <ArrowUp className="text-green-400 h-4 w-4" />
                                    ) : (
                                      <ArrowDown className="text-red-400 h-4 w-4" />
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Customer Retention Section */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Customer Retention
                </h2>

                {/* Cohort Analysis Card */}
                <Card className="bg-[#23145A] border-[#6D28D9]/20 mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-white">
                      Cohort Retention Analysis
                    </CardTitle>
                    <p className="text-sm text-white">
                      User retention analysis by cohort and month
                    </p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div style={{ width: "100%", overflowX: "auto" }}>
                      <div style={{ minWidth: "900px", maxHeight: "420px" }}>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b border-[#6D28D9]/20">
                              <TableHead className="text-white min-w-[120px] sticky left-0 bg-[#332270] z-10 rounded-tl-md">
                                Cohort
                              </TableHead>
                              <TableHead className="text-white text-right min-w-[80px] sticky left-[120px] bg-[#332270] z-10">
                                New Customers
                              </TableHead>
                              <TableHead className="text-white text-right min-w-[80px] sticky left-[200px] bg-[#332270] z-10">
                                Spend
                              </TableHead>
                              <TableHead className="text-white text-right min-w-[80px] sticky left-[280px] bg-[#332270] z-10">
                                Rev
                              </TableHead>
                              <TableHead className="text-white text-right min-w-[80px] sticky left-[360px] bg-[#332270] z-10">
                                CAC
                              </TableHead>
                              {[1, 2, 3, 4, 5, 6].map((month) => (
                                <TableHead
                                  key={month}
                                  className={`text-white text-right min-w-[80px] bg-[#332270] ${month === 6 ? "rounded-tr-md" : ""}`}
                                >
                                  M{month}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-b border-[#6D28D9]/20 hover:bg-[#6D28D9]/5 ">
                              <TableCell className="text-white font-medium sticky left-0 bg-[#332270] z-10 rounded-bl-md">
                                {"Average"}
                              </TableCell>
                              <TableCell className="text-white text-right sticky left-[120px] bg-[#332270] z-10">
                                {formatNumber(
                                  customerCohort.data?.data?.length &&
                                    customerCohort.data?.data.length > 0
                                    ? customerCohort.data?.data.reduce(
                                      (sum, cohort) =>
                                        sum + (cohort.new_customers || 0),
                                      0
                                    ) / customerCohort.data?.data.length
                                    : 0
                                )}
                              </TableCell>
                              <TableCell className="text-white text-right sticky left-[200px] bg-[#332270] z-10">
                                {formatCurrency(
                                  customerCohort.data?.data?.length &&
                                    customerCohort.data?.data.length > 0
                                    ? customerCohort.data?.data.reduce(
                                      (sum, cohort) => sum + (+cohort.spend || 0),
                                      0
                                    ) / customerCohort.data?.data.length
                                    : 0
                                )}
                              </TableCell>
                              <TableCell className="text-white text-right sticky left-[280px] bg-[#332270] z-10">
                                {formatCurrency(
                                  customerCohort.data?.data?.length &&
                                    customerCohort.data?.data.length > 0
                                    ? customerCohort.data?.data.reduce(
                                      (sum, cohort) =>
                                        sum + (+cohort.revenue || 0),
                                      0
                                    ) / customerCohort.data?.data.length
                                    : 0
                                )}
                              </TableCell>
                              <TableCell className="text-white text-right sticky left-[360px] bg-[#332270] z-10">
                                {formatNumber(customerCohort.data?.data?.length &&
                                  customerCohort.data?.data.length > 0
                                  ? customerCohort.data?.data.reduce(
                                    (sum, cohort) => sum + (+cohort.cac || 0),
                                    0
                                  ) / customerCohort.data?.data.length
                                  : 0
                                )}
                              </TableCell>
                              {Array.from({ length: 6 }).map((_, monthIndex) => (
                                <TableCell
                                  key={monthIndex}
                                  className={`text-white text-right sticky left-[360px] bg-[#332270] z-10 ${monthIndex === 5 ? "rounded-br-md" : ""}`}
                                >
                                  {formatNumber(customerCohort.data?.data?.length &&
                                    customerCohort.data?.data.length > 0
                                    ? customerCohort.data?.data.reduce(
                                      (sum, cohort) =>
                                        sum +
                                        (+cohort.retention[monthIndex] || 0),
                                      0
                                    ) / customerCohort.data?.data.length
                                    : 0
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                            {customerCohort?.data?.data && customerCohort?.data?.data.map((cohort, index) => (
                              <TableRow
                                key={index}
                                className="border-b border-[#6D28D9]/20 hover:bg-[#6D28D9]/5"
                              >
                                <TableCell className="text-white sticky left-0 bg-[#23145A] z-10">
                                  <div>{cohort.cohort_month}</div>
                                </TableCell>
                                <TableCell className="text-white text-right sticky left-[120px] bg-[#23145A] z-10">
                                  {formatNumber(+cohort.new_customers)}
                                </TableCell>
                                <TableCell className="text-white text-right sticky left-[200px] bg-[#23145A] z-10">
                                  {formatCurrency(cohort.spend)}
                                </TableCell>
                                <TableCell className="text-white text-right sticky left-[280px] bg-[#23145A] z-10">
                                  {formatCurrency(+cohort.revenue!)}
                                </TableCell>
                                <TableCell className="text-white text-right sticky left-[360px] bg-[#23145A] z-10">
                                  {(+cohort.cac).toFixed(2)}
                                </TableCell>
                                {cohort.retention
                                  .slice(0, 6)
                                  .map((value, dayIndex) => (
                                    <TableCell
                                      key={dayIndex}
                                      className={`text-right relative ${getRetentionColor(
                                        value
                                      )}`}
                                    >
                                      <span className="relative z-10 text-white font-medium">
                                        {value ? `${value.toFixed(2)}%` : "-"}
                                      </span>
                                    </TableCell>
                                  ))}
                              </TableRow>
                            ))}
                            {/* {mockData.retentionData.cohorts.map((cohort, index) => (
                          <TableRow
                            key={index}
                            className="border-b border-[#6D28D9]/20 hover:bg-[#6D28D9]/5"
                          >
                            <TableCell className="text-purple-300 sticky left-0 bg-[#1A0B2E] z-10">
                              <div>{cohort.cohort}</div>
                            </TableCell>
                            <TableCell className="text-purple-300 text-right sticky left-[120px] bg-[#1A0B2E] z-10">
                              {formatNumber(cohort.newCustomers)}
                            </TableCell>
                            <TableCell className="text-purple-300 text-right sticky left-[200px] bg-[#1A0B2E] z-10">
                              {formatCurrency(cohort.spend)}
                            </TableCell>
                            <TableCell className="text-purple-300 text-right sticky left-[280px] bg-[#1A0B2E] z-10">
                              {formatCurrency(cohort.revenue)}
                            </TableCell>
                            <TableCell className="text-purple-300 text-right sticky left-[360px] bg-[#1A0B2E] z-10">
                              ${(cohort.spend / cohort.newCustomers).toFixed(0)}
                            </TableCell>
                            {cohort.days.map((value, dayIndex) => (
                              <TableCell
                                key={dayIndex}
                                className={`text-right relative ${getRetentionColor(
                                  value
                                )}`}
                              >
                                <span className="relative z-10 text-purple-100 font-medium">
                                  {value ? `${value.toFixed(1)}%` : "-"}
                                </span>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))} */}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Funnel and Churn Rate Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Repeat Purchase Funnel */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-medium text-white">
                        Repeat Purchase Behavior
                      </CardTitle>
                      <p className="text-sm text-white">
                        Customer purchase frequency and retention analysis
                      </p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="">
                        {customerPurchaseFunnel.data?.data && (
                          <FunnelChart
                            data={Object.entries(
                              customerPurchaseFunnel.data?.data || {}
                            ).map(([key, val], _) => ({
                              id: key,
                              label: key.replace("_", " ").toUpperCase(),
                              value: val,
                              maxValue:
                                customerPurchaseFunnel.data?.data.first_purchase,
                            }))}
                            colors={["#7C3AED", "#6D28D9", "#5B21B6"]}
                            margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
                            valueFormat={(value) => {
                              const maxValue =
                                customerPurchaseFunnel.data?.data.first_purchase;
                              const percent = ((value / maxValue) * 100).toFixed(2);
                              return `${percent.endsWith('.00') ? parseInt(percent) : percent}%`;
                            }}
                            defs={[
                              {
                                id: "gradient1",
                                type: "linearGradient",
                                colors: [
                                  { offset: 0, color: "#7C3AED" },
                                  { offset: 100, color: "#6D28D9" },
                                ],
                              },
                              {
                                id: "gradient2",
                                type: "linearGradient",
                                colors: [
                                  { offset: 0, color: "#6D28D9" },
                                  { offset: 100, color: "#5B21B6" },
                                ],
                              },
                              {
                                id: "gradient3",
                                type: "linearGradient",
                                colors: [
                                  { offset: 0, color: "#5B21B6" },
                                  { offset: 100, color: "#4C1D95" },
                                ],
                              },
                            ]}
                            fill={[
                              { match: { id: "First Purchase" }, id: "gradient1" },
                              { match: { id: "Second Purchase" }, id: "gradient2" },
                              { match: { id: "Third+ Purchase" }, id: "gradient3" },
                            ]}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Churn Rate Chart */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-medium text-white">
                        Customer Churn Rate
                      </CardTitle>
                      <p className="text-sm text-white">
                        Monthly customer churn analysis
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-[390px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={customerChurn.data?.data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#6D28D9"
                              vertical={false}
                              opacity={0.1}
                            />
                            <XAxis
                              dataKey="cohort"
                              axisLine={{ stroke: "#6D28D9" }}
                              tickLine={{ stroke: "#6D28D9" }}
                              tick={{ fill: "#E9D5FF", fontSize: 12 }}
                              dy={10}
                            />
                            <YAxis
                              axisLine={{ stroke: "#6D28D9" }}
                              tickLine={{ stroke: "#6D28D9" }}
                              tick={{ fill: "#E9D5FF", fontSize: 12 }}
                              dx={-10}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A0B2E",
                                borderRadius: "8px",
                                border: "1px solid #4A148C",
                                padding: "12px",
                                boxSizer: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                              labelStyle={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "4px"
                              }}
                              itemStyle={{
                                color: "#ffffff",
                                fontSize: "14px",
                                padding: "2px 0"
                              }}
                              formatter={(value) => [`${value.toFixed(2)}%`, "Churn Rate"]}
                            />s
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#6D28D9"
                              strokeWidth={2}
                              dot={{
                                fill: "#1A0B2E",
                                stroke: "#6D28D9",
                                strokeWidth: 2,
                                r: 4,
                              }}
                              activeDot={{
                                r: 6,
                                fill: "#E9D5FF",
                                stroke: "#6D28D9",
                                strokeWidth: 2,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Customer Behavior Insights Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 mb-6 text-white">
                  Customer Behavior Insights
                </h2>

                {/* Purchase Behavior Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Top Selling Products by Segment */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-medium text-white">
                        Product Performance by Customer Segment
                      </CardTitle>
                      <p className="text-sm white">
                        Top selling categories across different customer groups
                      </p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={customerInsights.data?.data.products}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#6D28D9"
                              opacity={0.1}
                            />
                            <XAxis
                              dataKey="category"
                              stroke="#A78BFA"
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: "#6D28D9", opacity: 0.2 }}
                            />
                            <YAxis
                              stroke="#A78BFA"
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: "#6D28D9", opacity: 0.2 }}
                              tickFormatter={(value: number) => `${formatNumber(value)}`}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A0B2E",
                                borderRadius: "8px",
                                border: "1px solid #4A148C",
                                padding: "12px",
                                boxSizer: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                              labelStyle={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "4px"
                              }}
                              itemStyle={{
                                color: "#ffffff",
                                fontSize: "14px",
                                padding: "2px 0"
                              }}
                              formatter={(value) => [`${value.toFixed(2)}%`, "Churn Rate"]}
                            />
                            <Legend wrapperStyle={{ color: "#A78BFA" }} />
                            <Bar
                              dataKey="Low_Value"
                              name="Low Value"
                              fill="#6D28D9"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              dataKey="Medium_Value"
                              name="Medium Value"
                              fill="#9333EA"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              dataKey="High_Value"
                              name="High Value"
                              fill="#A855F7"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Average Cart Size by Segment */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-medium text-white">
                        Average Cart Size by Segment
                      </CardTitle>
                      <p className="text-sm text-white">
                        Cart value and items per order across customer segments
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={customerInsights.data?.data.cartSize || []}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#6D28D9"
                              opacity={0.1}
                            />
                            <XAxis
                              dataKey="customer_segment"
                              stroke="#A78BFA"
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: "#6D28D9", opacity: 0.2 }}
                            />
                            <YAxis
                              yAxisId="left"
                              stroke="#A78BFA"
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: "#6D28D9", opacity: 0.2 }}
                              tickFormatter={(value: number) => `${formatCurrency(value)}`}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              stroke="#A78BFA"
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: "#6D28D9", opacity: 0.2 }}
                              tickFormatter={(value: number) => `${formatNumber(value)} items`}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A0B2E",
                                borderRadius: "8px",
                                border: "1px solid #4A148C",
                                padding: "12px",
                                boxSizer: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                              }}
                              labelStyle={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                fontSize: "16px",
                                marginBottom: "4px"
                              }}
                              itemStyle={{
                                color: "#ffffff",
                                fontSize: "14px",
                                padding: "2px 0"
                              }}
                              formatter={(value) => [`${value.toFixed(2)}%`, "Churn Rate"]}
                            />
                            <Legend wrapperStyle={{ color: "#A78BFA" }} />
                            <Bar
                              yAxisId="left"
                              dataKey="avg_cart_value"
                              name="Cart Value"
                              fill="#6D28D9"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              yAxisId="right"
                              dataKey="avg_items_per_order"
                              name="Items per Order"
                              fill="#9333EA"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Customer Financial Metrics */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 mb-6 text-white">
                  Customer Financial Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Customer Lifetime Value (CLV) */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between h-[64px]">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-white">
                            Customer Lifetime Value
                          </p>
                          <p className="text-xs text-white">(CLV)</p>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-white">

                          {
                            formatCurrency(customerFinancials.data?.data
                              .avg_customer_lifetime_value)
                          }
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Acquisition Cost (CAC) */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between h-[64px]">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-white">
                            Customer Acquisition Cost
                          </p>
                          <p className="text-xs text-white">(CAC)</p>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-white">
                          {formatCurrency(customerFinancials.data?.data.avg_cac)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Retention Cost (CRC) */}
                  {/* <Card className="bg-[#1A0B2E]/80 border-[#6D28D9]/20">
                <CardContent className="p-2">
                  <div className="flex items-center justify-between h-[64px]">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-purple-300">
                        Customer Retention Cost
                      </p>
                      <p className="text-xs text-purple-400">(CRC)</p>
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
                      ${mockData.customerFinancialMetrics.crc.current}
                    </span>
                  </div>
                </CardContent>
              </Card> */}

                  {/* CLV:CAC Ratio */}
                  <Card className="bg-[#23145A] border-[#6D28D9]/20">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between h-[64px]">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-white">
                            CLV to CAC Ratio
                          </p>
                          <p className="text-xs text-white">(CLV:CAC)</p>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-white">
                          {formatCurrency(customerFinancials.data?.data.clv_to_cac_ratio)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CAC Trend Chart */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CAC Trend Chart */}
                <Card className="bg-[#23145A] border-[#6D28D9]/20 ">
                  <CardHeader>
                    <h3 className="text-xl font-medium text-white">
                      Customer Acquisition Cost Trends
                    </h3>
                    <p className="text-sm text-white">Monthly CAC analysis</p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="w-full h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={cacChart.data?.data || []}
                          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#6D28D9"
                            vertical={false}
                            opacity={0.1}
                          />
                          <XAxis
                            dataKey="spend_date.value"
                            axisLine={{ stroke: "#6D28D9" }}
                            tickLine={{ stroke: "#6D28D9" }}
                            tick={{ fill: "#E9D5FF", fontSize: 12 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={{ stroke: "#6D28D9" }}
                            tickLine={{ stroke: "#6D28D9" }}
                            tick={{ fill: "#E9D5FF", fontSize: 12 }}
                            dx={-10}
                            tickFormatter={(value) => `${formatCurrency(value)}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1A0B2E",
                              borderRadius: "8px",
                              border: "1px solid #4A148C",
                              padding: "12px",
                              boxSizer: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                            labelStyle={{
                              color: "#ffffff",
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "4px"
                            }}
                            itemStyle={{
                              color: "#ffffff",
                              fontSize: "14px",
                              padding: "2px 0"
                            }}
                            formatter={(value) => [`${value.toFixed(2)}%`, "Churn Rate"]}
                          />
                          <Line
                            name="Current Period"
                            type="monotone"
                            dataKey="total_ad_spend"
                            stroke="#c084fc"
                            strokeWidth={2}
                            dot={{ fill: "#c084fc", r: 4, strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              fill: "#E9D5FF",
                              stroke: "#c084fc",
                              strokeWidth: 2,
                            }}
                            hide={!visibleLines["Current Period"]}
                          />
                          <Line
                            name="Previous Period"
                            type="monotone"
                            dataKey="previousPeriod"
                            stroke="#818cf8"
                            strokeWidth={2}
                            dot={{ fill: "#818cf8", r: 4, strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              fill: "#E9D5FF",
                              stroke: "#818cf8",
                              strokeWidth: 2,
                            }}
                            hide={!visibleLines["Previous Period"]}
                          />
                          <Line
                            name="Last Month"
                            type="monotone"
                            dataKey="lastMonth"
                            stroke="#f0abfc"
                            strokeWidth={2}
                            dot={{ fill: "#f0abfc", r: 4, strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              fill: "#E9D5FF",
                              stroke: "#f0abfc",
                              strokeWidth: 2,
                            }}
                            hide={!visibleLines["Last Month"]}
                          />
                          <Line
                            name="Last Year"
                            type="monotone"
                            dataKey="lastYear"
                            stroke="#fb7185"
                            strokeWidth={2}
                            dot={{ fill: "#fb7185", r: 4, strokeWidth: 2 }}
                            activeDot={{
                              r: 6,
                              fill: "#E9D5FF",
                              stroke: "#fb7185",
                              strokeWidth: 2,
                            }}
                            hide={!visibleLines["Last Year"]}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Button-style Legends */}
                    {/* <div className="flex flex-wrap gap-3 mt-6 justify-center">
                  {[
                    { name: "Current Period", color: "#c084fc" },
                    { name: "Previous Period", color: "#818cf8" },
                    { name: "Last Month", color: "#f0abfc" },
                    { name: "Last Year", color: "#fb7185" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => toggleLine(item.name)}
                      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                        visibleLines[item.name]
                          ? "bg-[#2D1B69]/50 text-white"
                          : "text-purple-300/60 hover:text-purple-300"
                      }`}
                    >
                      {!visibleLines[item.name] && (
                        <div className="absolute inset-0 flex items-center pointer-events-none">
                          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent transform -rotate-6" />
                        </div>
                      )}
                      <span
                        className={`w-3 h-3 rounded-full transition-opacity duration-200 ${
                          !visibleLines[item.name] ? "opacity-40" : ""
                        }`}
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className={`transition-opacity duration-200 ${
                          !visibleLines[item.name] ? "opacity-40" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div> */}
                  </CardContent>
                </Card>

                {/* CAC Distribution by Channel */}
                <Card className="bg-[#23145A] border-[#6D28D9]/20">
                  <CardHeader>
                    <h3 className="text-xl font-medium text-white">
                      CAC by Channel
                    </h3>
                    <p className="text-sm text-white">
                      Distribution across acquisition channels
                    </p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            <linearGradient
                              id="OrganicGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#c084fc" />
                              <stop offset="100%" stopColor="#9333ea" />
                            </linearGradient>
                            <linearGradient
                              id="paidGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                            <linearGradient
                              id="socialGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#f0abfc" />
                              <stop offset="100%" stopColor="#d946ef" />
                            </linearGradient>
                            <linearGradient
                              id="EmailGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#fb7185" />
                              <stop offset="100%" stopColor="#e11d48" />
                            </linearGradient>
                          </defs>
                          <Pie
                            data={
                              cacChannel?.data?.data && cacChannel.data?.data.map((d) => ({
                                ...d,
                                fill: ["Facebook", "Google", "LinkedIn"].includes(
                                  d.acquisition_channel
                                )
                                  ? "url(#socialGradient)"
                                  : `url(#${d.acquisition_channel}Gradient)`,
                              })) || []
                            }
                            cx="50%"
                            cy="45%"
                            innerRadius={77}
                            outerRadius={104}
                            paddingAngle={5}
                            dataKey="total_ad_spend"
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1A0B2E",
                              borderRadius: "8px",
                              border: "1px solid #4A148C",
                              padding: "12px",
                              boxSizer: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                            labelStyle={{
                              color: "#ffffff",
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "4px"
                            }}
                            itemStyle={{
                              color: "#ffffff",
                              fontSize: "14px",
                              padding: "2px 0"
                            }}
                            formatter={(value) => [`${value.toFixed(2)}%`, "Total CAC"]}
                          />
                          <Legend
                            verticalAlign="bottom"
                            // height={36}
                            content={({ payload }) => (
                              <div className="flex justify-center gap-4 pt-4 pb-2 flex-wrap">
                                {payload?.map((entry: any) => (
                                  <div
                                    key={entry.acquisition_channel}
                                    className="flex items-center gap-2"
                                  >
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{
                                        background:
                                          entry.payload.acquisition_channel ===
                                            "Organic"
                                            ? "linear-gradient(to bottom, #c084fc, #9333ea)"
                                            : [
                                              "Facebook",
                                              "Google",
                                              "LinkedIn",
                                            ].includes(
                                              entry.payload.acquisition_channel
                                            )
                                              ? "linear-gradient(to bottom, #f0abfc, #d946ef)"
                                              : entry.payload.acquisition_channel ===
                                                "Email"
                                                ? "linear-gradient(to bottom, #fb7185, #e11d48)"
                                                : "linear-gradient(to bottom, #818cf8, #4f46e5)",
                                      }}
                                    />
                                    <span className="text-sm text-white">
                                      {entry.payload.acquisition_channel}
                                    </span>
                                    <span className="text-sm text-white">
                                      ({entry.payload.perc}%)
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </div>
        </div>

      )}
    </div>
  );
};

export default CustomerAnalyticsDashboard;
