export default function After() {
  return (
    <section>
      <div className="mb-3 font-sans text-[11px] uppercase tracking-[0.08em] text-[#80786e]">
        the fix - code splitting with react.lazy + suspense
      </div>

      <div className="mb-5 grid gap-2.5 sm:grid-cols-3">
        <Metric label="initial JS bundle" value="~120kb" />
        <Metric label="parse + execute" value="~0.4s" />
        <Metric label="LCP score" value="good" />
      </div>

      <pre className="code-block">
        <code>{`// AFTER - only load what's needed for first paint.
// Everything else fetches on demand.

import React, { lazy } from 'react';
import LazyWhenVisible from './LazyWhenVisible';

const HeavyDashboard = lazy(() => import('./HeavyDashboard'));
const CaseStudyCarousel = lazy(() => import('./CaseStudyCarousel'));
const ContactForm = lazy(() => import('./ContactForm'));

export default function App() {
  return (
    <div>
      <AnimatedHero />

      <LazyWhenVisible fallback={<Spinner />}>
        <HeavyDashboard />
      </LazyWhenVisible>

      <LazyWhenVisible fallback={<Spinner />}>
        <CaseStudyCarousel />
      </LazyWhenVisible>

      <LazyWhenVisible fallback={<Spinner />}>
        <ContactForm />
      </LazyWhenVisible>
    </div>
  );
}`}</code>
      </pre>

      <p className="mt-5 border-l-2 border-[#d7d2c8] pl-4 font-sans text-[13.5px] leading-7 text-[#666058]">
        With <code>React.lazy()</code>, each component becomes its own JS chunk. The browser only
        downloads a chunk when that component is actually about to render. Initial bundle drops from
        ~480kb to ~120kb - a 75% reduction in bytes on first load.
      </p>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="font-sans text-xl font-medium text-[#3b6d11]">{value}</div>
    </div>
  );
}
