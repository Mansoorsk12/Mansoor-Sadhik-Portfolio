import {useEffect,useRef,useState} from 'react';
import {Search,X,ArrowUpRight,Command} from 'lucide-react';
import {profile} from '../data/portfolio';
export function Modal({children,title,onClose,wide=false}){
 const dialog=useRef();
 useEffect(()=>{const el=dialog.current;const previous=document.activeElement;el.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=old;previous?.focus();}},[]);
 return <dialog ref={dialog} className={wide?'modal wide':'modal'} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget){const rect=e.currentTarget.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)onClose();}}} aria-label={title}><button className="modal-close icon-button" onClick={onClose} aria-label="Close dialog"><X size={20}/></button>{children}</dialog>
}
export function CommandPalette({onClose}){
 const [query,setQuery]=useState('');const [selected,setSelected]=useState(0);const searchRef=useRef();useEffect(()=>{searchRef.current?.focus();},[]);
 const commands=[...['Projects','About','Skills','Achievements','Contact','Resume'].map(x=>({name:x==='Resume'?(profile.resume?'Download Resume':'View resume options'):'Go to '+x,url:x==='Resume'&&profile.resume?profile.resume:'#'+x.toLowerCase()})),{name:'Open GitHub',url:profile.github},{name:'Open LeetCode',url:profile.leetcode},{name:'Open LinkedIn',url:profile.linkedin}].filter(x=>x.name.toLowerCase().includes(query.toLowerCase()));
 function run(x){if(!x)return;if(x.name==='Download Resume'){const a=document.createElement('a');a.href=x.url;a.download='Shaik-Mansoor-Sadhik-Resume.pdf';a.click();onClose();return;}if(x.url.startsWith('#')){document.querySelector(x.url)?.scrollIntoView({behavior:document.documentElement.dataset.effects==='off'?'instant':'smooth'});onClose();}else{window.open(x.url,'_blank','noopener,noreferrer');onClose();}}
 function handleCommandKeyDown(event) {
  const count = Math.max(1, commands.length);
  if (event.key === 'ArrowDown') {
   event.preventDefault();
   setSelected(index => (index + 1) % count);
  } else if (event.key === 'ArrowUp') {
   event.preventDefault();
   setSelected(index => (index - 1 + count) % count);
  } else if (event.key === 'Enter') {
   event.preventDefault();
   run(commands[selected]);
  }
 }
 return <Modal title="Command palette" onClose={onClose}><div className="command-heading"><Command size={18}/> A shortcut to anywhere.</div><div className="command-input"><Search size={19}/><input ref={searchRef} autoFocus placeholder="Where would you like to go?" value={query} onChange={e=>{setQuery(e.target.value);setSelected(0);}} onKeyDown={handleCommandKeyDown} aria-label="Search commands" aria-controls="command-results" aria-activedescendant={commands.length?'command-'+selected:undefined} role="combobox" aria-expanded="true" aria-autocomplete="list"/></div><div id="command-results" role="listbox" className="command-list">{commands.map((x,i)=><button id={'command-'+i} role="option" aria-selected={selected===i} className={selected===i?'selected':''} key={x.name} onClick={()=>run(x)}><span>{x.name}</span><ArrowUpRight size={16}/></button>)}{!commands.length&&<p>No matching commands. Try “projects”.</p>}</div><div className="command-footer"><span>↑ ↓ to navigate · ↵ to select</span><kbd>esc to close</kbd></div></Modal>
}
export function CustomCursor({enabled}){
 const ring=useRef(),dot=useRef();const [label,setLabel]=useState('');
 useEffect(()=>{if(!enabled||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;let frame,x=-100,y=-100,rx=-100,ry=-100;function move(e){x=e.clientX;y=e.clientY;if(dot.current)dot.current.style.transform='translate3d('+x+'px,'+y+'px,0)';const target=e.target.closest('[data-cursor],a,button');setLabel(target?.dataset.cursor||'');if(ring.current)ring.current.style.opacity='1';}function animate(){rx+=(x-rx)*.2;ry+=(y-ry)*.2;if(ring.current)ring.current.style.transform='translate3d('+rx+'px,'+ry+'px,0)';frame=requestAnimationFrame(animate);}function leave(){if(ring.current)ring.current.style.opacity='0';}document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);animate();return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);};},[enabled]);
 if(!enabled)return null;return <div className="cursor-system" aria-hidden="true"><div className="cursor-dot" ref={dot}/><div className={'cursor-ring '+(label?'expanded':'')} ref={ring}><span>{label}</span></div></div>
}
