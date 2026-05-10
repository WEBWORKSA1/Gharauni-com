// ───────────────────────────────────────────────────
// UP geography loader — typed helpers over /lib/data/up/…
// ───────────────────────────────────────────────────

import divisionsJson from './data/up/divisions.json';
import districtsJson from './data/up/districts.json';
import tehsilsJson from './data/up/tehsils.json';

export interface UpDivision {
  code: string;
  name: string;
  nameHi: string;
}

export interface UpDistrict {
  code: string;
  slug: string;
  name: string;
  nameHi: string;
  division: string;
  divisionHi: string;
  divisionCode: string;
  headquarters: string;
  tehsilCount: number;
  blockCount: number;
  hasDetailedData: boolean;
}

export interface UpTehsil {
  name: string;
  nameHi: string;
  districtSlug: string;
  district: string;
  districtCode: string;
}

export const UP_DIVISIONS: UpDivision[] = divisionsJson as UpDivision[];
export const UP_DISTRICTS: UpDistrict[] = districtsJson as UpDistrict[];
export const UP_TEHSILS: UpTehsil[] = tehsilsJson as UpTehsil[];

export function getUpDistrict(slug: string): UpDistrict | undefined {
  return UP_DISTRICTS.find(d => d.slug === slug);
}

export function getUpDistrictsByDivision(divisionCode: string): UpDistrict[] {
  return UP_DISTRICTS.filter(d => d.divisionCode === divisionCode);
}

export function getUpTehsilsByDistrict(districtSlug: string): UpTehsil[] {
  return UP_TEHSILS.filter(t => t.districtSlug === districtSlug);
}

export function getUpStats() {
  return {
    divisions: UP_DIVISIONS.length,
    districts: UP_DISTRICTS.length,
    totalTehsils: UP_DISTRICTS.reduce((sum, d) => sum + d.tehsilCount, 0),
    totalBlocks: UP_DISTRICTS.reduce((sum, d) => sum + d.blockCount, 0),
    districtsWithDetail: UP_DISTRICTS.filter(d => d.hasDetailedData).length,
    tehsilsLoaded: UP_TEHSILS.length
  };
}
