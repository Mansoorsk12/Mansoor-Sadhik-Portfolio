import { Search, ArrowUpRight, ShoppingBag, Activity, Armchair, Radio, Bell, Check, Briefcase, Plus, Code2 } from 'lucide-react';

export default function ProjectVisual({ type }) {
  if (type === 'explorer')
    return (
      <div className="project-art explorer-art">
        <div className="mock-browser">
          <div className="browser-bar"><span /><span /><span /><small>github-repo-explorer.app</small></div>
          <div className="explorer-ui">
            <div className="mock-nav"><Code2 size={19} /><b>Repo<span>Explorer</span></b><span className="tiny-pill">Explore open source ↗</span></div>
            <div className="mock-intro"><small>YOUR NEXT DISCOVERY STARTS HERE</small><h4>Great code.<br /><span>Waiting to be found.</span></h4><div className="mock-search"><Search size={12} /> Search repositories...<span>↵</span></div></div>
            <div className="repo-tiles">{['facebook / react', 'vercel / next.js', 'microsoft / vscode'].map((x, i) => <div key={x}><div className="repo-symbol">{['⌘', '↗', '⌥'][i]}</div><b>{x}</b><p>{['A library for web interfaces.', 'The React framework for the web.', 'Code editing. Redefined.'][i]}</p><small><i /> {i === 2 ? 'TypeScript' : 'JavaScript'}</small></div>)}</div>
          </div>
        </div>
        <span className="art-label">01 / THE EXPLORER</span>
      </div>
    );

  if (type === 'commerce')
    return (
      <div className="project-art commerce-art">
        <div className="shop-window"><div className="shop-nav"><b>mansoor<span>mart.</span></b><small>Discover &nbsp; Collections</small><ShoppingBag size={14} /></div><div className="shop-title"><small>THE EVERYDAY COLLECTION</small><h4>A little less ordinary.</h4><p>Find your next everyday favourite.</p></div><div className="product-row">{['violet', 'blue', 'cream'].map((x, i) => <div className="mini-product" key={x}><div className={'product-object ' + x}>{i === 0 ? <div className="headphones" /> : i === 1 ? <div className="bottle" /> : <div className="lamp" />}</div><b>{['Sound, reimagined', 'Your everyday essential', 'A softer kind of light'][i]}</b><small>Thoughtfully selected <ArrowUpRight size={10} /></small></div>)}</div></div>
        <span className="art-label">02 / THE COMMERCE EXPERIENCE</span>
      </div>
    );

  if (type === 'chair')
    return (
      <div className="project-art chair-art"><div className="chair-diagram"><div className="sensor-label"><Radio size={18} /> Sensor input</div><div className="diagram-line" /><div className="chair-icon"><Armchair size={88} strokeWidth={1} /><i className="sensor-dot" /></div><div className="diagram-line" /><div className="sensor-label"><Bell size={18} /> Caregiver alert</div></div><div className="monitor"><Activity size={18} /><span>Movement → Activity → Safety</span></div><span className="art-label">05 / CONNECTED CARE</span></div>
    );

  if (type === 'jobs')
    return (
      <div className="project-art jobs-art"><div className="job-window"><div className="mock-nav"><Briefcase size={18} /><b>Find your next chapter.</b></div><h4>Good work.<br /><span>Great possibilities.</span></h4><div className="mock-search"><Search size={13} /> Role, company or keyword <span>Find jobs ↗</span></div>{['Frontend Developer', 'Software Engineer'].map(x => <div className="job-row" key={x}><span className="job-icon"><Briefcase size={16} /></span><div><b>{x}</b><small>Explore opportunities</small></div><ArrowUpRight size={16} /></div>)}</div><span className="art-label">03 / OPPORTUNITY, SIMPLIFIED</span></div>
    );

  return (
    <div className="project-art tasks-art"><div className="task-window"><div className="mock-nav"><Check size={18} /><b>TaskFlow<span> / workspace</span></b><Plus size={15} /></div><h4>Make room for focus.</h4><div className="task-stats">{['Total tasks', 'Completed', 'Pending'].map((x, i) => <div key={x}><small>{x}</small><strong>{[20, 15, 5][i]}</strong></div>)}</div><div className="task-progress"><span /></div><p>One task at a time. Keep moving forward.</p></div><span className="art-label">04 / A LITTLE MORE FOCUS</span></div>
  );
}
