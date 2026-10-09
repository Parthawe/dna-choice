import {CHOICES} from '../model.mjs';
/**
 * Native radio group shared by the opening and the component reference.
 * @param {HTMLElement} host
 * @param {{name:string,legend:string,onChange:(choice:string)=>void}} options
 * @returns {{set:(choice:string|null)=>void,disable:(disabled:boolean)=>void}}
 */
export function createChoiceGroup(host,{name,legend,onChange}){
 const fieldset=document.createElement('fieldset');fieldset.className='dna-choice-group';
 const title=document.createElement('legend');title.className='sr-only';title.textContent=legend;fieldset.append(title);
 const inputs=[];
 for(const choice of CHOICES){const label=document.createElement('label');label.className='dna-choice';label.dataset.tone=choice.id==='extend'?'life':choice.id==='accept'?'end':'neutral';const input=document.createElement('input');input.type='radio';input.name=name;input.value=choice.id;input.addEventListener('change',()=>onChange(choice.id));const text=document.createElement('span');text.className='dna-choice__title';text.textContent=choice.label;const detail=document.createElement('span');detail.className='dna-choice__detail';detail.textContent=choice.detail;const mark=document.createElement('span');mark.className='dna-choice__mark';mark.setAttribute('aria-hidden','true');mark.innerHTML='<svg class="dna-icon"><use href="#icon-check"/></svg>';label.append(input,text,detail,mark);fieldset.append(label);inputs.push(input);}
 host.replaceChildren(fieldset);
 return {set(choice){if(choice!==null&&!CHOICES.some(c=>c.id===choice))throw new Error('Unknown choice');for(const input of inputs)input.checked=input.value===choice;},disable(disabled){for(const input of inputs)input.disabled=disabled;}};
}
