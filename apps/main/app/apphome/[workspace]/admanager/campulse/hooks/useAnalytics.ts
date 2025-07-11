/**
 * @author Healium Digital
 * Analytics Hook
 */

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../services/api";
import { DateRange } from "../types/analytics";
import { apiAxios, apiAxiosWithToken } from "@nyx-frontend/main/services/apiHandler";
import { useEffect, useRef, useState } from "react";

export function useAnalytics(
  filters?: {
    dateRange: DateRange;
    platform?: string;
    campaign?: string;
  },
  period?: string
) {
  const [accountNames, setaAccountNames] = useState<string[]>([]);
  const [accountIds, setaAccountIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const timer: any = useRef<any>(true)

  useEffect(() => {
    async function fetchAccountList() {
      timer.current = false
      try {
        setIsLoading(true)
        const response = await apiAxiosWithToken.get("/power-bi/account_list", {
          params: {
            workspace_id: Number(localStorage.getItem("workspace_id")),
          },
        });
        const list: string[] = Array.isArray(response.data)
          ? response.data
          : [];
        setaAccountIds(list.map((acc: any) => acc.account_id));
        setaAccountNames(list.filter((acc: any) => acc.account_name).map((acc: any) => acc.account_name));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (timer.current) fetchAccountList();
  }, []);

  // Fetch main analytics data
  const chartData = useQuery({
    queryKey: ["chartData", period, filters],
    queryFn: () =>
      analyticsApi.getAnalyticsChartData(filters!, period, accountIds),
    enabled: accountIds.length > 0,
  });

  const metricData = useQuery({
    queryKey: ["metricData", filters],
    queryFn: () => analyticsApi.getAnalyticsMetricData(filters!, accountIds),
    enabled: accountIds.length > 0,
  });

  const segmentData = useQuery({
    queryKey: ["segmentData", filters],
    queryFn: () => analyticsApi.getAnalyticsSegmentData(filters!, accountIds),
    enabled: accountIds.length > 0,
  });

  const regionData = useQuery({
    queryKey: ["regionData", filters],
    queryFn: () => analyticsApi.getAnalyticsRegionData(filters!, accountIds),
    enabled: accountIds.length > 0,
  });

  const impressionDeviceData = useQuery({
    queryKey: ["impressionDeviceData", filters],
    queryFn: () => analyticsApi.getImpressionDeviceData(filters!, accountIds),
    enabled: accountIds.length > 0,
  });

  const platformPositionData = useQuery({
    queryKey: ["platformPositionData", filters],
    queryFn: () => analyticsApi.getPlatformPositionData(filters!, accountIds),
    enabled: accountIds.length > 0,
  });

  return {
    accountIds,
    accountNames,
    chartData,
    metricData,
    segmentData,
    regionData,
    impressionDeviceData,
    platformPositionData,
    isLoading : platformPositionData.isLoading, // || regionalPerformance.isLoading || funnelData.isLoading,
    isSuccess: chartData.isSuccess,
    isError: chartData.isError, // || regionalPerformance.isError || funnelData.isError,
    error: chartData.error, //|| regionalPerformance.error || funnelData.error,
  };
}
