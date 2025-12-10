export interface SendSignContractDto {
  fields: {
    email: string;
    signer_name: string;
    identity_type: string;
    identity_number: string;
    company: string;
    signature: string; // base64 image
    [key: string]: string; // Allow other dynamic fields if needed
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

