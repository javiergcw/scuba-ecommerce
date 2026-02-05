export interface SendSignPublicContractDto {
  company_name: string;
  sku: string;
  fields: {
    [key: string]: string; // Dynamic fields including signature
  };
}

export interface SignPublicContractResponseDto {
  success: boolean;
  error?: string;
  data?: {
    code: string;
    status: string;
  };
}
