export interface CustomerMetricResponse {
  data: {
    new_customers: number;
    new_customers_perc: number;
    repeat_customers: number;
    repeat_customers_perc: number;
    total_customers: number;
  };
}

interface PurchaseDate {
  value: string;
}

interface CohortData {
  account_id: number;
  account_name: string;
  acquisition_channel: string;
  churn_flag: number;
  cohort: string;
  customer_id: string;
  customer_lifetime_value: string;
  customer_segment: string;
  first_purchase_date: PurchaseDate;
  months_since_first_purchase: number;
  purchase_date: PurchaseDate;
  retained_revenue: string;
  retention_flag: number;
  revenue: string;
}

export interface CustomerCohortResponse {
  data: {
    cohort_month: string;
    new_customers: number;
    spend: number;
    revenue: number;
    cac: number;
    retention: number[];
  }[];
}

export interface CustomerSegmentResponse {
  data: {
    [groupBy: string]: {
      label: string;
      count: number;
      total: number;
      distribution?: number;
      growth?: number;
    }[];
  };
}

export interface CustomerChurnResponse {
  data: { cohort: string; count: number }[];
}

export interface CustomerPurchaseFunnelResponse {
  data: { [x: string]: number };
}

export interface CACChartResponse {
  data: {
    spend_date: {
      value: string; // The date will be represented as a string in ISO format
    };
    total_ad_spend: number;
    total_new_customers: number;
    cac: number;
  }[];
}

export interface CACChannelDataResponse {
  data: {
    acquisition_channel: string; // The channel name (e.g., "Email")
    total_ad_spend: number; // Total ad spend for this channel
    total_new_customers: number; // Total new customers acquired through this channel
    cac: number; // Customer Acquisition Cost for this channel
  }[];
}

// Type for the 'cartSize' data
interface CartSize {
  customer_segment: string;
  avg_cart_value: string; // Since the value appears to be a string, keep it as a string type
}

// Type for the 'products' data
interface Product {
  category: string;
  Low_Value: number;
  Medium_Value: number;
  High_Value: number;
}

// Type for the overall data structure
export interface InsightResponse {
  data: {
    cartSize: CartSize[];
    products: Product[];
  };
}

export interface CustomerFinancialResponse {
  data: {
    avg_customer_lifetime_value: string;
    avg_cac: string;
    clv_to_cac_ratio: string;
  };
}

export interface RecomdationsResponse {
  data: {
    recommendations: any[];
    analyzed_region: string;
  };
}
