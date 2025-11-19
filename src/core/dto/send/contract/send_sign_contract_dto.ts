export interface SendSignContractDto {
  signed_by_name: string;
  signed_by_email: string;
  signature_image: string; // base64 image
  fields?: {
    [key: string]: string;
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

