/**
 * @author Healium Digital
 * API Service
 */

import axios from "axios";
import {
  CampaignOptionListResponse,
  ChartDataResponse,
  DateRange,
  MetricDataResponse,
  RegionDataResponse,
  SegmentDataResponse,
} from "../types/analytics";
import {
  CACChannelDataResponse,
  CACChartResponse,
  CustomerChurnResponse,
  CustomerCohortResponse,
  CustomerFinancialResponse,
  CustomerMetricResponse,
  CustomerPurchaseFunnelResponse,
  CustomerSegmentResponse,
  InsightResponse,
  RecomdationsResponse,
} from "../types/customer";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AGENT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized response
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await api.post("/auth/refresh", { refreshToken });
        const { token } = response.data;

        localStorage.setItem("auth_token", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (error) {
        // Redirect to login on refresh token failure
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const analyticsApi = {
  // Get analytics data

  getAnalyticsChartData: async (
    filters: { platform?: string; dateRange: DateRange; campaign?: string },
    period?: string,
    accountIds?: string[]
  ): Promise<ChartDataResponse> => {
    const { dateRange, platform, campaign } = filters;
    const response = await api.get("/analytics/chart", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        period,
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },


  getAnalyticsMetricData: async (
    filters: {
      platform?: string;
      dateRange: DateRange;
      campaign?: string;
    },
    accountIds?: string[]
  ): Promise<MetricDataResponse> => {
    const { dateRange, platform, campaign } = filters;
    const response = await api.get("/analytics/metrics", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },

  getAnalyticsSegmentData: async (
    filters: {
      platform?: string;
      campaign?: string;
      dateRange: DateRange;
    },
    accountIds?: string[]
  ): Promise<SegmentDataResponse> => {
    const { dateRange, platform, campaign } = filters;

    const response = await api.get("/analytics/segments", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },

  getAnalyticsRegionData: async (
    filters: {
      platform?: string;
      dateRange: DateRange;
      campaign?: string;
    },
    accountIds?: string[]
  ): Promise<RegionDataResponse> => {
    const { dateRange, platform, campaign } = filters;

    const response = await api.get("/analytics/region", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },

  getImpressionDeviceData: async (
    filters: {
      platform?: string;
      dateRange: DateRange;
      campaign?: string;
    },
    accountIds?: string[]
  ): Promise<RegionDataResponse> => {
    const { dateRange, platform, campaign } = filters;

    const response = await api.get("/analytics/impression-device", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },

  getPlatformPositionData: async (
    filters: {
      platform?: string;
      dateRange: DateRange;
      campaign?: string;
    },
    accountIds?: string[]
  ): Promise<RegionDataResponse> => {
    const { dateRange, platform, campaign } = filters;

    const response = await api.get("/analytics/platform-position", {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        platform,
        campaign,
        accountIds,
      },
    });
    return response.data;
  },

  getAnalyticsCampOptionsData: async (
    accountIds?: string[]
  ): Promise<CampaignOptionListResponse> => {
    const response = await api.get("/analytics/campaign-options", {
      params: {
        accountIds,
      },
    });
    return response.data;
  },

  getCustomerMetricData: async (
    accountIds?: string[]
  ): Promise<CustomerMetricResponse> => {
    const response = await api.get("/customers/metrics", {
      params: { accountIds },
    });
    return response.data;
  },
  getCustomerCohortData: async (
    accountIds?: string[]
  ): Promise<CustomerCohortResponse> => {
    const response = await api.get("/customers/cohorts", {
      params: { accountIds },
    });
    return response.data;
  },

  getCustomerSegmentData: async (
    accountIds?: string[]
  ): Promise<CustomerSegmentResponse> => {
    const response = await api.get("/customers/segments", {
      params: { accountIds },
    });
    return response.data;
  },

  getCustomerChurnData: async (
    accountIds?: string[]
  ): Promise<CustomerChurnResponse> => {
    const response = await api.get("/customers/churn", {
      params: { accountIds },
    });
    return response.data;
  },

  getCustomerPurchaseFunnel: async (
    accountIds?: string[]
  ): Promise<CustomerPurchaseFunnelResponse> => {
    const response = await api.get("/customers/purchase", {
      params: { accountIds },
    });
    return response.data;
  },

  getCACChartData: async (accountIds?: string[]): Promise<CACChartResponse> => {
    const response = await api.get("/customers/cac-chart", {
      params: { accountIds },
    });
    return response.data;
  },

  getCACByChannelData: async (
    accountIds?: string[]
  ): Promise<CACChannelDataResponse> => {
    const response = await api.get("/customers/cac-channel", {
      params: { accountIds },
    });
    return response.data;
  },

  getCustomerInsightsData: async (accountIds?: string[]): Promise<InsightResponse> => {
    const response = await api.get("/customers/insights", {
      params: { accountIds },
    });
    return response.data;
  },

  getCustomerFinancialsData: async (accountIds?: string[]): Promise<CustomerFinancialResponse> => {
    const response = await api.get("/customers/financials", {
      params: { accountIds },
    });
    return response.data;
  },

  getChannelWiseData: async (groupIds?: string[]): Promise<RecomdationsResponse> => {
    const response = await api.get("/customers/channel-wise-data", {
      params: { groupIds },
    });
    return response?.data?.result;
  },


};

export default api;
