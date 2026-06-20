export interface StockAccount {
  id: string;
  code: string;
  title: string;
  price: number;
  originalPrice?: number;
  level: number;
  tier: string;
  loginType: 'Google' | 'Facebook' | 'VK' | 'VK/FB';
  skinSenjataCount: number;
  bundleCount: number;
  emoteCount: number;
  epicSkins: string[];
  description: string;
  imageUrl: string;
  galleryUrls: string[];
  isSold: boolean;
  isHot?: boolean;
}

export interface JasaPostAccount {
  id: string;
  senderName: string;
  nickname: string;
  priceRequested: number;
  level: number;
  tier: string;
  loginType: string;
  skinSenjataCount: number;
  bundleCount: number;
  emoteCount: number;
  description: string;
  imageUrl: string;
  galleryUrls: string[];
  contactSender: string; // whatsapp or instagram
  views: number;
  createdAt: string;
  isVerified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  productType: 'Beli Akun FF' | 'Jasa Post (JP)' | 'Sewa Rekber Admin' | 'Layanan Cepat';
  avatarSeed: string; // for random avatars
}

export interface AdminContact {
  label: string;
  value: string;
  url: string;
  iconName: string;
  isPrimary?: boolean;
  badge?: string;
  colorClass: string;
}

export type ActiveTab = 'beranda' | 'stok' | 'jasapost' | 'testimoni' | 'bio';
export type AppTheme = 'light' | 'kuning-biru';
