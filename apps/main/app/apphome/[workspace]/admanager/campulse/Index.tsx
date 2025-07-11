"use client"
import React, { JSX } from "react";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  SearchableSelect,
} from "./components/ui/selectSearch";
import CustomerAnalyticsDashboard from "./components/CustomerDashboard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { analyticsApi } from "./services/api";
import clsx from "clsx";
import { DateRangePicker } from "./components/DateRangePicker";
import { useAnalytics } from "./hooks/useAnalytics";

interface AnalyticsPageProps {
  external?: boolean;
  noData?: JSX.Element
}

const Index = ({ external = false, noData }: AnalyticsPageProps) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(1999, 1, 1),
    to: new Date(),
  });

  // State for channel selection
  const [selectedChannel, setSelectedChannel] = useState("all");

  // State for selected metrics (e.g., Impressions, Clicks, etc.)
  const [selectedMetrics, setSelectedMetrics] = useState(["Impressions"]);

  // State for date range type (e.g., Last 7 days, Last 30 days, etc.)
  const [dateRangeType, setDateRangeType] = useState("All Time");

  // State for selected metrics (e.g., Impressions, Clicks, etc.)
  const [selectedCamp, setSelectedCamp] = useState("all");

  // State for custom date range (only used when "Custom Range" is selected)
  const [customDateRange, setCustomDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  });

  const { accountIds, accountNames, isLoading } = useAnalytics();
  const campaignOptions = useQuery({
    queryKey: ["campaignOptions"],
    queryFn: () => analyticsApi.getAnalyticsCampOptionsData(accountIds),
    enabled: accountIds.length > 0,
  });

  // const selectedCampName = useMemo(() => {
  //   return (
  //     campaignOptions.data?.data.find((c) => c.campaign_id === selectedCamp)
  //       ?.campaign_name || ""
  //   );
  // }, [campaignOptions, selectedCamp]);

  const campOptList = useMemo(() => {
    return campaignOptions.data?.data || [];
  }, [campaignOptions]);

  // Function to toggle metrics selectio
  // Handle channel selection
  const handleChannelChange = (value: string) => {
    setSelectedChannel(value);
  };

  const handleCampChange = (value: string) => {
    setSelectedCamp(value);
  };

  // Handle date range type change
  const handleDateRangeTypeChange = (value: string) => {
    setDateRangeType(value);
    if (value !== "custom") {
      // Adjust date range for predefined types (Last 7, Last 30, Last 90)
      const today = new Date();
      if (value === "last7") {
        setDateRange({
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
          ),
          to: today,
        });
      } else if (value === "last30") {
        setDateRange({
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 30
          ),
          to: today,
        });
      } else if (value === "last90") {
        setDateRange({
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 90
          ),
          to: today,
        });
      } else if (value === "All Time") {
        setDateRange({ from: new Date(1999, 1, 1), to: today });
      }
    }
  };

  // Handle custom date range change
  const handleCustomDateChange = (from: Date, to: Date) => {
    setCustomDateRange({ from, to });
    setDateRange({ from, to });
  };

  return (
    <div className={clsx("min-h-screen  p-4", external ? "" : "bg-[#0A0B14]")}>
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col">
          {/* Title and Export */}
          <div className="flex justify-between items-center mb-6 ml-2">
            {!external && (
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
                Analytics Dashboard
              </h1>
            )}
            {accountNames?.join(', ')}
          </div>

          {/* Navigation and Filters */}
          <div className="flex flex-col gap-6 ">
            {/* Tab Navigation */}
            <Tabs defaultValue="campaign" className="w-full">
              <TabsList className="flex w-full justify-start gap-8 mb-6 bg-transparent border-b border-[#6D28D9]/20 h-auto p-0">
                <TabsTrigger
                  value="campaign"
                  className="relative px-4 py-2 text-lg font-medium text-white hover:text-purple-300 data-[state=active]:text-nyx-yellow data-[state=active]:shadow-none bg-transparent border-0 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-nyx-yellow after:to-nyx-yellow after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Campaign Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="customer"
                  className="relative px-4 py-2 text-lg font-medium text-white hover:text-purple-300 data-[state=active]:text-nyx-yellow data-[state=active]:shadow-none bg-transparent border-0 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-nyx-yellow after:to-nyx-yellow after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Customer Analytics
                </TabsTrigger>
                {/* <button className="px-4 ml-auto py-2 text-sm font-medium text-purple-300 bg-[#2D1B69]/30 rounded-lg border border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                  Export Report
                </button> */}
              </TabsList>

              {/* Filters */}
              <div className="flex items-center gap-4 ml-2">
                {/* Channel Filter */}
                <Select
                  value={selectedChannel}
                  onValueChange={handleChannelChange}
                >
                  <SelectTrigger className="w-[200px] bg-[#23145A] text-white border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue>
                      {selectedChannel === "all"
                        ? "All Channels"
                        : selectedChannel}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#23145A] border-[#6D28D9]/20">
                    <SelectItem
                      value="all"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      All Channels
                    </SelectItem>
                    <SelectItem
                      value="google"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Google
                    </SelectItem>
                    <SelectItem
                      value="meta"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Meta
                    </SelectItem>
                    <SelectItem
                      value="linkedin"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      LinkedIn
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Range Filter */}
                <Select
                  value={dateRangeType}
                  onValueChange={handleDateRangeTypeChange}
                >
                  <SelectTrigger className="w-[160px] bg-[#23145A] text-white border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue>
                      {dateRangeType === "custom"
                        ? "Custom Range"
                        : dateRangeType}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#332270] border-[#6D28D9]/20">
                    <SelectItem
                      value="All Time"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      All Time
                    </SelectItem>
                    <SelectItem
                      value="last7"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Last 7 Days
                    </SelectItem>
                    <SelectItem
                      value="last30"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Last 30 Days
                    </SelectItem>
                    <SelectItem
                      value="last90"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Last 90 Days
                    </SelectItem>
                    <SelectItem
                      value="custom"
                      className="text-white focus:bg-[#5E32FF] focus:text-nyx-yellow"
                    >
                      Custom Range
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Campaign Filter */}
                <SearchableSelect
                  className="text-white"
                  value={selectedCamp}
                  onChange={handleCampChange}
                  enableFocusStyles={true}
                  options={[
                    { value: "all", label: "All Campaigns" },
                    ...campOptList.map((c) => ({
                      value: c.campaign_id,
                      label: c.campaign_name,
                    })),
                  ]}
                />
                {/* <Select value={selectedCamp} onValueChange={handleCampChange}>
                  <SelectTrigger className="w-[200px] bg-[#2D1B69]/30 text-purple-300 border-[#6D28D9]/20 hover:bg-[#2D1B69]/50 transition-all duration-200">
                    <SelectValue>
                      {selectedCamp === "all"
                        ? "All Campaigns"
                        : selectedCampName}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A0B2E] border-[#6D28D9]/20 max-h-96 overflow-auto">
                    <SelectItem
                      value="all"
                      className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300"
                    >
                      All Campaigns
                    </SelectItem>
                    {campOptList.map((c) => (
                      <SelectItem
                        key={c.campaign_id}
                        value={c.campaign_id}
                        className="text-purple-300 focus:bg-[#2D1B69]/30 focus:text-purple-300"
                      >
                        {c.campaign_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

              {/* Custom Date Picker when 'Custom' is selected */}
              {dateRangeType === "custom" && (
                <div className="flex gap-4 mt-4">
                  <DateRangePicker
                    date={customDateRange}
                    setDate={(d) => handleCustomDateChange(d.from, d.to)}
                  />
                </div>
              )}
              {/* {!isLoading && !accountIds.length && noData} */}

              {/* Tab Contents */}
              {!!accountIds.length && (
                <TabsContent value="campaign">
                  <AnalyticsDashboard
                    // noData={noData}
                    // external={external}
                    dateRange={dateRange}
                    platform={selectedChannel}
                    campaign={selectedCamp}
                  />
                </TabsContent>
              )}

              {!!accountIds.length && (
                <TabsContent value="customer">
                  <CustomerAnalyticsDashboard />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function AnalyticsPage(props: AnalyticsPageProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Index {...props} />
    </QueryClientProvider>
  );
};
