// Crops of the original 2400 × 1600 photograph. The traced outlines retain the folds and printed labels.
const objects={
 extend:{color:'Blue',number:'01',crop:'710 416 665 912',outline:'M764 509 Q914 493 1059 457 Q1090 447 1111 469 L1124 453 Q1217 475 1276 549 Q1286 577 1290 637 L1339 1218 Q1163 1254 913 1297 L771 1151 Z'},
 accept:{color:'Red',number:'02',crop:'1315 376 665 912',outline:'M1403 446 Q1546 438 1696 413 L1720 421 L1730 407 Q1745 416 1762 435 L1889 505 Q1890 518 1890 524 Q1925 815 1924 1147 Q1747 1187 1533 1210 Q1517 1213 1503 1200 L1368 1081 Z'}
};

export function offerPlate(id){
 const object=objects[id];
 if(!object)return null;
 const plate=document.createElement('span');
 plate.className='edition-plate';
 plate.dataset.color=object.color.toLowerCase();
 plate.setAttribute('aria-hidden','true');
 plate.innerHTML=`<span class="edition-index">FIG. ${object.number}</span>
 <span class="edition-pigment">${object.color}</span>
 <svg class="edition-object" viewBox="${object.crop}" aria-hidden="true">
  <defs><clipPath id="edition-${id}"><path d="${object.outline}"/></clipPath></defs>
  <image href="assets/boxes-closed.webp" width="2400" height="1600" clip-path="url(#edition-${id})"/>
 </svg>
 <svg class="edition-mark" viewBox="0 0 56 24" fill="none" aria-hidden="true"><rect x="1" y="1" width="54" height="22" rx="11" stroke="currentColor" stroke-width="1.5"/><path d="M28 1v22" stroke="currentColor" stroke-width="1.5"/></svg>`;
 return plate;
}
