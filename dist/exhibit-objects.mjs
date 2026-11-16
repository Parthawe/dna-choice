// Fictional printed objects. Their meaning is also stated by the scene controls and passages.
const objects={
 conversation:`<div class="object-envelope">
  <div class="object-letter"><span>AT OUR TABLE</span><i></i><i></i><i></i><i></i></div>
  <svg viewBox="0 0 460 242" preserveAspectRatio="none"><path fill="#d6c9b3" d="M0 0v242h460V0L230 167Z"/><path fill="none" stroke="#aa9b84" d="m0 0 230 167L460 0M0 242l146-136m314 136L314 106"/></svg>
 </div>`,
 horizon:`<div class="object-route"><h3>A morning walk</h3><svg viewBox="0 0 490 180" fill="none"><path class="route-line" d="M35 130C130 130 105 42 217 54S340 115 452 39" stroke="currentColor" stroke-width="3" stroke-dasharray="6 7"/><circle class="route-stop" cx="35" cy="130" r="12"/><circle class="route-stop" cx="232" cy="56" r="12"/><circle class="route-stop" cx="452" cy="39" r="12"/></svg><div><span>Today</span><span>More years</span><span>Health unknown</span></div></div>`,
 appointment:`<div class="object-tickets"><div class="object-ticket"><span>YOUR APPOINTMENT</span><b>Confirmed</b></div><div class="object-ticket"><span>THE OTHER APPOINTMENT</span><b>Unavailable</b></div></div>`,
 packing:`<div class="object-packing"><div class="object-bag"><span>FOR THE TRIP</span><div>Clothes</div><div>Something to read</div><div class="object-pocket">Treatment supplies</div></div><span class="object-supply">Treatment<br>supplies</span></div>`,
 evidence:`<div class="object-dossier"><span>DNA / EVIDENCE INDEX</span><div><span>01</span><b>The promise</b><span>+50 years</span></div><div><span>02</span><b>Long-term human evidence</b><span>Unconfirmed</span></div><div><span>03</span><b>Questions before deciding</b><span>Open</span></div></div>`
};

export function exhibitObject(kind){
 const graphic=document.createElement('div');
 graphic.className='object-graphic';
 graphic.setAttribute('aria-hidden','true');
 graphic.innerHTML=objects[kind]||'';
 return graphic;
}
