export interface ContractField {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  options?: string[];
}

export interface ContractDto {
  code: string;
  sku: string;
  status: string;
  html_snapshot: string;
  expires_at: string;
  signed_by_name?: string;
  signed_by_email?: string;
  signed_at?: string;
  template_name: string;
  required_fields?: ContractField[];
  fields?: ContractField[];
}

export interface ReceiveContractDto {
  success: boolean;
  data: ContractDto;
}

export interface ContractStatusDto {
  code: string;
  expires_at: string;
  status: string;
}

export interface ReceiveContractStatusDto {
  success: boolean;
  data: ContractStatusDto;
}

