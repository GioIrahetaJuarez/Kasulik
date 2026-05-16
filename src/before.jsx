export default function Before() {
  return (
    <section>
      <div className="mb-3 font-sans text-[11px] uppercase tracking-[0.08em] text-[#80786e]">
        what kasulik.org is doing now
      </div>

      <div className="mb-5 grid gap-2.5 sm:grid-cols-3">
        <Metric label="initial JS bundle" value="~480kb" tone="bad" />
        <Metric label="parse + execute" value="~1.8s" tone="bad" />
        <Metric label="LCP score" value="poor" tone="bad" />
      </div>

      <pre className="code-block">
        <code>{`// BEFORE - all components load immediately,
// even ones the user may never see

import React from 'react';
import HeavyDashboard from './HeavyDashboard'; // 120kb
import AnimatedHero from './AnimatedHero'; // 95kb
import CaseStudyCarousel from './CaseStudyCarousel'; // 80kb
import ContactForm from './ContactForm'; // 60kb

export default function App() {
  return (
    <div>
      <AnimatedHero />
      <HeavyDashboard />
      <CaseStudyCarousel />
      <ContactForm />
    </div>
  );
}`}</code>
      </pre>

      <p className="mt-5 border-l-2 border-[#d7d2c8] pl-4 font-sans text-[13.5px] leading-7 text-[#666058]">
        Every component&apos;s JavaScript is bundled and downloaded on first load - even ContactForm
        at the bottom of the page that 80% of visitors never scroll to. This is what Lighthouse is
        flagging.
      </p>
    </section>
  );
}

function Metric({ label, value, tone }) {
  const toneClass = tone === 'bad' ? 'text-[#a32d2d]' : 'text-[#3b6d11]';

  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className={`font-sans text-xl font-medium ${toneClass}`}>{value}</div>
    </div>
  );
}
