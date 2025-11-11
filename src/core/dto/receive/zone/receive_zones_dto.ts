export interface BannerDto {
  id?: string;
  zone_id: string;
  title: string;
  subtitles: string;
  image_url: string;
  link_url: string;
  active: boolean;
}

export interface ZoneDto {
  id: string;
  name: string;
  description: string;
  banners: BannerDto[];
}

export interface ReceiveZonesDto {
  success: boolean;
  data: ZoneDto[];
}

