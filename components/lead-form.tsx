'use client';

import { useState, ReactNode } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Shared lead-capture form component used by every lead form on the site.
// Posts to /api/leads which routes to the destination email server-side.

export type LeadField = {
  name: string;
  label: string;
  labelHi?: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // for select
  helpText?: string;
  gridCols?: 1 | 2; // half-width or full-width
};

export type LeadFormProps = {
  source: string;
  fields: LeadField[];
  submitLabel: string;
  successHeadline: string;
  successHeadlineHi?: string;
  successBody: string;
  preSubmit?: ReactNode;
};

export function LeadForm({
  source,
  fields,
  submitLabel,
  successHeadline,
  successHeadlineHi,
  successBody,
  preSubmit,
}: LeadFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, payload: values, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setError(`${msg}. Please try again or use our contact form.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto mb-3" />
        {successHeadlineHi && <div className="font-serif text-lg text-ink/70 mb-1">{successHeadlineHi}</div>}
        <h3 className="font-serif text-2xl text-ink mb-2">{successHeadline}</h3>
        <p className="text-ink/70 max-w-md mx-auto">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => {
          const span = f.gridCols === 1 ? 'sm:col-span-1' : 'sm:col-span-2';
          const inputCls =
            'w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none';
          return (
            <div key={f.name} className={span}>
              <label htmlFor={f.name} className="block text-sm font-medium text-ink mb-1.5">
                {f.label}
                {f.labelHi && <span className="text-ink/55 font-normal"> · {f.labelHi}</span>}
                {f.required && <span className="text-terracotta"> *</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  id={f.name}
                  rows={4}
                  value={values[f.name] || ''}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={inputCls}
                />
              ) : f.type === 'select' ? (
                <select
                  id={f.name}
                  value={values[f.name] || ''}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  required={f.required}
                  className={inputCls}
                >
                  <option value="">{f.placeholder || 'Select…'}</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.name}
                  type={f.type || 'text'}
                  value={values[f.name] || ''}
                  onChange={(e) => onChange(f.name, e.target.value)}
                  required={f.required}
                  placeholder={f.placeholder}
                  className={inputCls}
                />
              )}
              {f.helpText && <p className="mt-1 text-xs text-ink/50">{f.helpText}</p>}
            </div>
          );
        })}
      </div>

      {preSubmit}

      {error && (
        <div className="flex items-start gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-900">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error} <Link href="/contact" className="underline">Contact us instead</Link>.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {submitting ? 'Submitting…' : submitLabel}
      </button>
    </form>
  );
}
