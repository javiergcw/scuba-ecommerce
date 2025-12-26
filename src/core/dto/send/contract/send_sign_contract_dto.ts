export interface SendSignContractDto {
  fields: {
    [key: string]: string | number | boolean; // Dynamic fields based on contract requirements
  };
}

export interface SignContractResponseDto {
  success: boolean;
  error?: string;
  data?: {
    code: string;
    status: string;
  };
}

