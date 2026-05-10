// Utility functions — reusable across components

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatINR(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateEMI(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return Math.round(principal / n);
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

export function calculateTotalInterest(emi: number, years: number, principal: number): number {
  return emi * years * 12 - principal;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function validateGharauniId(id: string): boolean {
  // Format: 6-digit village + 5-digit plot + 2-digit division
  const pattern = /^\d{6}-\d{5}-\d{2}$/;
  return pattern.test(id);
}

export function validatePhone(phone: string): boolean {
  // Indian mobile number
  const pattern = /^[6-9]\d{9}$/;
  return pattern.test(phone.replace(/\D/g, ''));
}

export function maskPhone(phone: string): string {
  if (phone.length < 10) return phone;
  return phone.slice(0, 2) + '••••••' + phone.slice(-2);
}
