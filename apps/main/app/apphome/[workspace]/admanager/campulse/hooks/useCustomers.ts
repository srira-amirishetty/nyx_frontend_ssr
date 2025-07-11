/**
 * @author Healium Digital
 * Analytics Hook
 */

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../services/api";
import { DateRange } from "../types/analytics";
import { apiAxios, apiAxiosWithToken } from "@nyx-frontend/main/services/apiHandler";
import { useEffect, useState } from "react";

export function useCustomers(
  filters?: {
    dateRange: DateRange;
    platform?: string;
    campaign?: string;
  },
  period?: string
) {
  const [accountNames, setaAccountNames] = useState<string[]>([]);
  const [accountIds, setaAccountIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAccountList() {
      try {
        const response = await apiAxiosWithToken.get("/power-bi/account_list", {
          params: {
            workspace_id: Number(localStorage.getItem("workspace_id")),
          },
        });
        const list: string[] = Array.isArray(response.data)
          ? response.data
          : [];
        setaAccountIds(list.map((acc: any) => acc.account_id));
        // setaAccountIds(["2156545051397647"]);
        setaAccountNames(list.map((acc: any) => acc.account_name));
      } catch (err) {
        console.log(err);
      }
    }
    fetchAccountList();
  }, []);


  const customerMetrics = useQuery({
    queryKey: ["customerMetrics"],
    queryFn: () => analyticsApi.getCustomerMetricData(accountIds),
    enabled: accountIds.length > 0,
  });

  const customerCohort = useQuery({
    queryKey: ["customerCohort"],
    queryFn: () => analyticsApi.getCustomerCohortData(accountIds),
    enabled: accountIds.length > 0,
  });

  const customerSegment = useQuery({
    queryKey: ["customerSegments"],
    queryFn: () => analyticsApi.getCustomerSegmentData(accountIds),
    enabled: accountIds.length > 0,
  });


  const customerChurn = useQuery({
    queryKey: ["customerChurn"],
    queryFn: () => analyticsApi.getCustomerChurnData(accountIds),
    enabled: accountIds.length > 0,
  });


  const customerPurchaseFunnel = useQuery({
    queryKey: ["customerPurchaseFunnel"],
    queryFn: () => analyticsApi.getCustomerPurchaseFunnel(accountIds),
    enabled: accountIds.length > 0,
  });

  const cacChart = useQuery({
    queryKey: ["cacChart"],
    queryFn: () => analyticsApi.getCACChartData(accountIds),
    enabled: accountIds.length > 0,
  });


  const cacChannel = useQuery({
    queryKey: ["cacChannel"],
    queryFn: () => analyticsApi.getCACByChannelData(accountIds),
    enabled: accountIds.length > 0,
  });

  const customerInsights = useQuery({
    queryKey: ["customerInsights"],
    queryFn: () => analyticsApi.getCustomerInsightsData(accountIds),
    enabled: accountIds.length > 0,
  });

  const customerFinancials = useQuery({
    queryKey: ["customerFinancials"],
    queryFn: () => analyticsApi.getCustomerFinancialsData(accountIds),
    enabled: accountIds.length > 0,
  });




  return {
    customerFinancials,
    customerInsights,
    customerPurchaseFunnel,
    cacChart,
    cacChannel,
    customerChurn,
    customerMetrics,
    customerCohort,
    customerSegment,
    isLoading: customerMetrics.isLoading, // || regionalPerformance.isLoading || funnelData.isLoading,
    isError: customerMetrics.isError, // || regionalPerformance.isError || funnelData.isError,
    error: customerMetrics.error, //|| regionalPerformance.error || funnelData.error,
  };
}
