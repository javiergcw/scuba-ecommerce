export interface ContractByProductDto {
  company_name: string;
  html_content: string;
  product_name: string | null;
  sku: string;
  template_id: string;
  template_name: string;
  variable_keys: string[];
}

export interface ReceiveContractByProductDto {
  success: boolean;
  data: ContractByProductDto;
}
