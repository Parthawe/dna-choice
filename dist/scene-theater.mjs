import {exhibitObject} from './exhibit-objects.mjs';
import {narrativeFor} from './scene-stories.mjs';
/** Optional scene exploration. Independent of decisions and private notes. */
export function createSceneTheater(host,{onAnnounce=()=>{}}={}){
 const explored=new Map();let active=null;
 const make=(tag,cls,text)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(text)element.textContent=text;return element;};
 function render(id){
  const scene=narrativeFor(id);active=id;host.replaceChildren();host.hidden=!scene;if(!scene)return;
  host.dataset.kind=scene.kind;delete host.dataset.explored;
  const figure=make('figure','theater-figure');const frame=make('div','theater-frame');
  const content=make('div','theater-content');const premise=make('h2','theater-premise',scene.prompt);const controls=make('div','theater-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label',`Explore ${scene.setting.toLowerCase()}`);
  const beat=make('p','theater-beat');beat.id='theater-beat';beat.setAttribute('role','status');beat.setAttribute('aria-live','polite');
  const buttons=[];const packingTag=make('span','packing-state','Treatment supplies packed');packingTag.hidden=true;
  function update(index,announce=true){explored.set(id,index);buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));const text=scene.actions?.[index]?.text||scene.steps?.[index]?.text||scene.text;beat.textContent=text;beat.hidden=false;host.dataset.explored=String(index);if(announce){if(['conversation','evidence'].includes(scene.kind)&&!matchMedia('(prefers-reduced-motion:reduce)').matches){beat.animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],{duration:280,easing:'cubic-bezier(.16,1,.3,1)'});}onAnnounce(text);}}
  if(scene.kind==='horizon'){
   const label=make('label','horizon-label','Look further along the path');label.htmlFor='scene-horizon';const input=make('input');input.id='scene-horizon';input.type='range';input.min='0';input.max='2';input.step='1';input.value=String(explored.get(id)??0);input.setAttribute('aria-describedby','theater-beat');
   const stages=make('div','horizon-stages');scene.steps.forEach(step=>stages.append(make('span','',step.label)));controls.append(label,input,stages);input.addEventListener('input',()=>{const index=Number(input.value);input.setAttribute('aria-valuetext',scene.steps[index].label);update(index);});input.setAttribute('aria-valuetext',scene.steps[Number(input.value)].label);update(Number(input.value),false);
  }else if(scene.kind==='packing'){
   beat.hidden=true;const button=make('button','scene-action',scene.action);button.type='button';button.setAttribute('aria-controls',beat.id);controls.append(button);button.addEventListener('click',()=>{const packed=explored.get(id)!==1;button.textContent=packed?scene.resetAction:scene.action;host.dataset.explored=packed?'packed':'unpacked';packingTag.hidden=!packed;explored.set(id,packed?1:0);beat.textContent=packed?scene.text:'The supplies are back beside the bag. Keeping the extra years would still require continuing treatment.';beat.hidden=false;onAnnounce(beat.textContent);});if(explored.get(id)===1){button.textContent=scene.resetAction;beat.textContent=scene.text;beat.hidden=false;host.dataset.explored='packed';packingTag.hidden=false;}else if(explored.has(id)){beat.hidden=false;beat.textContent='The supplies are back beside the bag. Keeping the extra years would still require continuing treatment.';host.dataset.explored='unpacked';}
  }else{
   const options=scene.actions||scene.steps;options.forEach((option,index)=>{const button=make('button','scene-action',option.label);button.type='button';button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls',beat.id);controls.append(button);buttons.push(button);button.addEventListener('click',()=>update(index));});if(explored.has(id))update(explored.get(id),false);else beat.hidden=true;
  }
  content.append(premise,controls,beat);
  const caption=make('figcaption','theater-caption');
  caption.append(make('span','theater-setting',scene.setting),make('span','','Fictional exhibit object'));
  if(scene.kind==='packing')content.append(packingTag);
  frame.append(exhibitObject(scene.kind));
  figure.append(frame,caption);
  host.append(figure,content);
 }
 return {render,reset(){explored.clear();host.replaceChildren();host.hidden=true;active=null;},getState(){return active?{scene:active,explored:explored.has(active)}:null;}};
}
