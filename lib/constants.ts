// Routes — single source of truth
export const ROUTES = {
  home: '/',
  check: '/check',
  loan: '/loan',
  market: '/market',
  learn: '/learn',
  title: '/title',
  parser: '/parser',
  insurance: '/insurance',
  dispute: '/dispute',
  apply: (lender: string) => `/loan/apply/${lender}`,
  listing: (id: string) => `/market/${id}`,
  statePage: (state: string) => `/${state}`,
  districtPage: (state: string, district: string) => `/${state}/${district}`
} as const;

export const STATS = [
  { value: '3.06 Cr+', labelKey: 'cards', subKey: 'cardsSub' },
  { value: '₹132 L Cr', labelKey: 'assets', subKey: 'assetsSub' },
  { value: '+23%', labelKey: 'lift', subKey: 'liftSub' },
  { value: '1.86 L+', labelKey: 'villages', subKey: 'villagesSub' }
] as const;

export const SERVICE_TILES = [
  { key: 'check', icon: 'Search', route: '/check', color: '#C2410C' },
  { key: 'loan', icon: 'Banknote', route: '/loan', color: '#92400E' },
  { key: 'title', icon: 'Shield', route: '/title', color: '#7C2D12' },
  { key: 'market', icon: 'Building2', route: '/market', color: '#A16207' },
  { key: 'parser', icon: 'Cpu', route: '/parser', color: '#374151' },
  { key: 'insurance', icon: 'Umbrella', route: '/insurance', color: '#065F46' },
  { key: 'learn', icon: 'Youtube', route: '/learn', color: '#991B1B' },
  { key: 'dispute', icon: 'FileCheck', route: '/dispute', color: '#1E40AF' }
] as const;
