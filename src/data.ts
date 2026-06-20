// @ts-ignore
import bannerOne from './assets/images/ff_store_banner_one_1781870195990.jpg';
// @ts-ignore
import bannerTwo from './assets/images/ff_store_banner_two_1781870212038.jpg';
// @ts-ignore
import bannerThree from './assets/images/ff_banner_rekber_1781873103138.jpg';
// @ts-ignore
import bannerFour from './assets/images/ff_banner_promo_1781873120635.jpg';

// @ts-ignore
import screenshotOne from './assets/images/ff_lobby_screenshot_one_1781870227494.jpg';
// @ts-ignore
import screenshotTwo from './assets/images/ff_gun_screenshot_two_1781870243815.jpg';
// @ts-ignore
import screenshotThree from './assets/images/ff_character_showcase_three_1781873136583.jpg';
// @ts-ignore
import screenshotFour from './assets/images/ff_gun_inventory_four_1781873151695.jpg';

import { StockAccount, JasaPostAccount, Testimonial, AdminContact } from './types';

export const BANNER_IMAGES = [
  {
    id: 'banner-1',
    src: bannerOne,
    title: 'PROMO STOK AKUN FREE FIRE',
    subtitle: 'Akun Premium rank Grandmaster & Skin Evo Gun ready stock dengan harga termurah!',
    badge: 'Stok Terbatas'
  },
  {
    id: 'banner-2',
    src: bannerTwo,
    title: 'JASA POSTING (JP) PALING CEPAT',
    subtitle: 'Promosikan akunmu di sini agar cepat laku dijangkau ribuan calon pembeli aktif!',
    badge: 'Layanan Kilat'
  },
  {
    id: 'banner-3',
    src: bannerThree,
    title: 'REKBER RESMI ANTI-HACKBACK',
    subtitle: 'Gunakan layanan rekening bersama Arga Store agar transaksi aman 100% dari penipuan!',
    badge: 'Garansi Keamanan'
  },
  {
    id: 'banner-4',
    src: bannerFour,
    title: 'EVENT DISKON BULAN INI',
    subtitle: 'Dapatkan potongan harga hingga Rp 50.000 untuk pembelian akun bertanda khusus hot deal!',
    badge: 'Promo Terbatas'
  }
];

export const INITIAL_STOCK_ACCOUNTS: StockAccount[] = [
  {
    id: '1',
    code: 'FF-EVO-991',
    title: 'Evo Cobra Max + Skin Rapper Underworld',
    price: 450000,
    originalPrice: 650000,
    level: 72,
    tier: 'Grandmaster',
    loginType: 'Facebook',
    skinSenjataCount: 154,
    bundleCount: 88,
    emoteCount: 42,
    epicSkins: ['MP40 Cobra Max (Lv. 6)', 'M1887 Rapper Underworld', 'SCAR Megalodon (Lv. 4)', 'Bundle Alok Elite', 'Tas Elite Pass S12'],
    description: 'Spek sultan, Evo Gun MP40 Cobra Max sudah Level 6 efek tembakan ngeri. Ditambah shotgun legendaris M1887 Rapper Underworld & bundle rare langka. Akun dijamin aman, anti-hackback, dan bergaransi toko.',
    imageUrl: screenshotOne,
    galleryUrls: [screenshotOne, screenshotTwo, screenshotThree, screenshotFour],
    isSold: false,
    isHot: true
  },
  {
    id: '2',
    code: 'FF-DRG-404',
    title: 'AK Dragon Lv. 7 Max + Arctic Blue Bundle',
    price: 299000,
    originalPrice: 420000,
    level: 65,
    tier: 'Heroic',
    loginType: 'Google',
    skinSenjataCount: 95,
    bundleCount: 54,
    emoteCount: 32,
    epicSkins: ['AK Blue Flame Dragon (Lv. 7/Max)', 'Shotgun M1014 Green Flame (Lv. 3)', 'Bundle Arctic Blue', 'Scythe Neon Glow'],
    description: 'Evo AK Naga Biru Max Level 7 emote eksklusif naga menyemburkan api! Bundle full set Arctic Blue yang legendaris dan gahar. Login Google aman tanpa binding lain.',
    imageUrl: screenshotTwo,
    galleryUrls: [screenshotTwo, screenshotOne, screenshotFour, screenshotThree],
    isSold: false,
    isHot: true
  },
  {
    id: '3',
    code: 'FF-EP-552',
    title: 'Akun Old S5 Elite Pass Rare Old',
    price: 350000,
    level: 75,
    tier: 'Diamond IV',
    loginType: 'VK/FB',
    skinSenjataCount: 110,
    bundleCount: 65,
    emoteCount: 25,
    epicSkins: ['Lencana Old Elite Pass S5', 'Skin AK Flaming Red', 'Bundle Street Boy', 'Scream Mask'],
    description: 'Akun veteran super old dari Season 5 Elite Pass. Sangat langka di lobby masa kini. Skin senjata old bertipe damage booster Flaming Red. Data lengkap single login.',
    imageUrl: screenshotThree,
    galleryUrls: [screenshotThree, screenshotOne, screenshotFour, screenshotTwo],
    isSold: false
  },
  {
    id: '4',
    code: 'FF-BG-201',
    title: 'Akun Hemat Pemula Skin M1887 One Punch Man',
    price: 135000,
    originalPrice: 180000,
    level: 54,
    tier: 'Platinum III',
    loginType: 'Google',
    skinSenjataCount: 38,
    bundleCount: 19,
    emoteCount: 12,
    epicSkins: ['M1887 One Punch Man', 'Bundle Skull Ranger'],
    description: 'Cocok untuk pembeli hemat yang mencari shotgun legendaris M1887 kolaborasi One Punch Man. Siap tempur rank, tier terawat.',
    imageUrl: screenshotFour,
    galleryUrls: [screenshotFour, screenshotTwo, screenshotThree, screenshotOne],
    isSold: true // Sold out representation
  }
];

export const INITIAL_JASA_POST_ACCOUNTS: JasaPostAccount[] = [
  {
    id: 'jp-1',
    senderName: 'Bayu Prasetyo',
    nickname: 'JP•KING-A7',
    priceRequested: 185000,
    level: 63,
    tier: 'Heroic 3 Star',
    loginType: 'Facebook Single',
    skinSenjataCount: 64,
    bundleCount: 32,
    emoteCount: 18,
    description: 'Titipan akun cepat laku nego tipis! Ada M1887 One Punch Man, baju t-shirt langka putih, Tas Sayap Hitam. Kontak di bawah langsung ke WA saya.',
    imageUrl: screenshotTwo,
    galleryUrls: [screenshotTwo],
    contactSender: '6281234567890',
    views: 142,
    createdAt: '2026-06-18',
    isVerified: true
  },
  {
    id: 'jp-2',
    senderName: 'Rehan Gaming',
    nickname: 'REHAN•SADBOY',
    priceRequested: 110000,
    level: 59,
    tier: 'Diamond II',
    loginType: 'Gmail login',
    skinSenjataCount: 41,
    bundleCount: 24,
    emoteCount: 15,
    description: 'Akun koleksi pribadi butuh uang saku sekolah. Bundle Criminal Red (Lobby Imitation), AK Pumpkin, Celana Angelic Biru KW. Murah banget dapet spek lincah.',
    imageUrl: screenshotOne,
    galleryUrls: [screenshotOne],
    contactSender: '628987654321',
    views: 89,
    createdAt: '2026-06-19',
    isVerified: false
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Budi Santoso',
    rating: 5,
    comment: 'Proses transaksi cepet bgt gk nyampe 5 menit semenjak transfer! Admin Arga bener-bener amanah, akun sesuai spek & dapet garansi anti-HB. Recommended seller!',
    date: '2026-06-15',
    productType: 'Beli Akun FF',
    avatarSeed: 'budi'
  },
  {
    id: 't-2',
    name: 'Rangga Febrian',
    rating: 5,
    comment: 'Titip Jasa Posting (JP) di sini mantap poll! Admin bikinin flyer rapi ditaruh di list stok, akun laku keesokan harinya dibantu rekber admin juga. Josss!',
    date: '2026-06-17',
    productType: 'Jasa Post (JP)',
    avatarSeed: 'rangga'
  },
  {
    id: 't-3',
    name: 'Clara Amelia',
    rating: 4.8,
    comment: 'Awalnya ragu beli akun online, tapi setelah cek di Arga Store dan pakai sistem penyerahan data bertahap, dibimbing sampai bisa login lancar jaya. Makasih min!',
    date: '2026-06-18',
    productType: 'Beli Akun FF',
    avatarSeed: 'clara'
  }
];

export const ADMIN_CONTACTS: AdminContact[] = [
  {
    label: 'WhatsApp Utama Admin (Fast Respon)',
    value: '+62 822-5500-1122',
    url: 'https://wa.me/6282255001122?text=Halo%20Admin%20Arga,%20saya%20tertarik%20dengan%20layanan%20layanan%20stok%20/%20jasa%20post',
    iconName: 'MessageSquare',
    isPrimary: true,
    badge: 'Online 24 Jam',
    colorClass: 'bg-emerald-500 hover:bg-emerald-600'
  },
  {
    label: 'Instagram Resmi Toko',
    value: '@arga_ff_store',
    url: 'https://instagram.com/arga_ff_store',
    iconName: 'Instagram',
    colorClass: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90'
  },
  {
    label: 'Grup Facebook Jual Beli & Rekber',
    value: 'Komunitas Arga FF Rekber',
    url: 'https://facebook.com/groups/arga-store-group',
    iconName: 'Users',
    badge: '12K+ Anggota',
    colorClass: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    label: 'YouTube Channel Review Spek Akbar',
    value: 'Arga Gaming Store',
    url: 'https://youtube.com',
    iconName: 'Youtube',
    colorClass: 'bg-red-600 hover:bg-red-700'
  }
];
