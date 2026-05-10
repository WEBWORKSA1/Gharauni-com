import type { MetadataRoute } from 'next';
import { STATES } from '@/lib/mock-data';
import { slugify } from '@/lib/utils';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gharauni.com';

// Same district list as /[state]/page.tsx — keep in sync, will move to DB in Phase 5
const DISTRICTS: Record<string, string[]> = {
  up: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur'],
  mp: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  mh: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Thane', 'Sangli', 'Amravati'],
  ka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Davangere', 'Bellary', 'Tumkur', 'Shimoga', 'Raichur'],
  hr: ['Faridabad', 'Gurugram', 'Panipat', 'Hisar', 'Rohtak', 'Karnal', 'Sonipat', 'Yamunanagar', 'Panchkula', 'Ambala'],
  pb: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Pathankot', 'Moga', 'Firozpur'],
  uk: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Almora', 'Nainital'],
  cg: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari'],
  rj: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar', 'Sikar', 'Pali'],
  br: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Arrah', 'Begusarai', 'Katihar', 'Munger']
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ['', '/check', '/loan', '/market', '/learn', '/title', '/parser', '/insurance', '/dispute'].map(r => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1.0 : 0.8
  }));

  const stateRoutes = STATES.map(s => ({
    url: `${BASE}/${slugify(s.name)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  const districtRoutes: MetadataRoute.Sitemap = [];
  for (const state of STATES) {
    const districts = DISTRICTS[state.code] || [];
    for (const d of districts) {
      districtRoutes.push({
        url: `${BASE}/${slugify(state.name)}/${slugify(d)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6
      });
    }
  }

  return [...staticRoutes, ...stateRoutes, ...districtRoutes];
}
