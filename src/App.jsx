import { useEffect, useRef, useState } from 'react';
import Before from './before.jsx';
import After from './after.jsx';

const tabs = [
  { id: 'before', label: 'before (eager loading)' },
  { id: 'after', label: 'after (lazy loading)' },
  { id: 'sim', label: 'live simulation' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('before');

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 font-mono">
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'before' && <Before />}
      {activeTab === 'after' && <After />}
      {activeTab === 'sim' && <Simulation />}
    </main>
  );
}

function Simulation() {
  const [running, setRunning] = useState(false);
  const [beforeWidth, setBeforeWidth] = useState(0);
  const [afterWidth, setAfterWidth] = useState(0);
  const [beforeLabel, setBeforeLabel] = useState('waiting...');
  const [afterLabel, setAfterLabel] = useState('waiting...');
  const [result, setResult] = useState('');
  const timers = useRef([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  function queue(callback, delay) {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  }

  function runSimulation() {
    if (running) return;

    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];

    setRunning(true);
    setResult('');
    setBeforeWidth(0);
    setAfterWidth(0);
    setBeforeLabel('downloading 480kb...');
    setAfterLabel('downloading 120kb...');

    queue(() => setAfterWidth(100), 100);
    queue(() => setAfterLabel('first paint at 0.4s - page is interactive'), 1350);

    queue(() => setBeforeWidth(100), 600);
    queue(() => {
      setBeforeLabel('first paint at 1.8s - user waited 1.4s extra');
      setResult('Lazy loading delivered first paint 4.5x faster on this simulation.');
      setRunning(false);
    }, 1850);
  }

  return (
    <section>
      <SectionTitle>simulated page load comparison</SectionTitle>

      <SimulationBar
        color="bg-[#e24b4a]"
        label="before - eager: downloading all JS upfront"
        value={beforeWidth}
        status={beforeLabel}
      />
      <SimulationBar
        color="bg-[#639922]"
        label="after - lazy: only critical JS downloaded"
        value={afterWidth}
        status={afterLabel}
      />

      <div className="mt-2 min-h-5 font-sans text-[13px] text-[#666058]">{result}</div>

      <button className="tab-button mt-4" onClick={runSimulation} type="button">
        {running ? 'loading...' : 'run simulation'}
      </button>

      <p className="mt-5 border-l-2 border-[#d7d2c8] pl-4 font-sans text-[13.5px] leading-7 text-[#666058]">
        This simulates what a browser does on first load. The before bar must finish loading all
        480kb before anything renders. The after bar only needs the 120kb critical chunk - the rest
        loads in the background as you scroll.
      </p>
    </section>
  );
}

function SimulationBar({ color, label, value, status }) {
  return (
    <div className="mb-6">
      <div className="mb-2 font-sans text-xs text-[#666058]">{label}</div>
      <div className="mb-1 h-2.5 overflow-hidden rounded bg-[#efebe4]">
        <div
          className={`h-full rounded transition-[width] duration-1000 ease-out ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="font-sans text-[11px] text-[#80786e]">{status}</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-3 font-sans text-[11px] uppercase tracking-[0.08em] text-[#80786e]">
      {children}
    </div>
  );
}
