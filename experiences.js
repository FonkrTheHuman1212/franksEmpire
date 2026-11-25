
const galleryScenes=[
  {id:'spring-sakura',title:'Spring Sakura Stream',subtitle:'A blossom-lit river garden with a curved bridge and crystal water.',file:'images/gallery/spring-sakura-stream.webp'},
  {id:'summer-falls',title:'Summer Waterfall Garden',subtitle:'Layered waterfalls and luminous terraces under warm early-summer light.',file:'images/gallery/summer-waterfall-garden.webp'},
  {id:'summer-meadow',title:'Summer Meadow Brook',subtitle:'A sunlit meadow where a clear brook drifts through wildflowers and mossy stone.',file:'images/gallery/summer-meadow-brook.webp'},
  {id:'autumn-maples',title:'Autumn Maple River',subtitle:'Golden-hour reflections glow beneath a red maple canopy.',file:'images/gallery/autumn-maple-river.webp'},
  {id:'winter-cabin',title:'Winter Cabin Stream',subtitle:'Lantern light, snow, and a quiet cabin beside a flowing blue-hour stream.',file:'images/gallery/winter-cabin-stream.webp'},
  {id:'alpine-sunrise',title:'Alpine Sunrise Lake',subtitle:'An alpine lookout opens to clear water, mist and snow-lit peaks at dawn.',file:'images/gallery/alpine-sunrise-lake.webp'},
  {id:'lagoon-garden',title:'Sunlit Lagoon Garden',subtitle:'A tropical cove glows with coral shallows, waterfalls and warm coastal light.',file:'images/gallery/sunlit-lagoon-garden.webp'},
  {id:'lantern-village',title:'Twilight Lantern Village',subtitle:'Lantern reflections shimmer through a flower-filled riverside village at blue hour.',file:'images/gallery/twilight-lantern-village.webp'},
  {id:'bioluminescent-marsh',title:'Bioluminescent Marsh Garden',subtitle:'Luminous wetlands, moonlit water and glowing lotus light up the night.',file:'images/gallery/bioluminescent-marsh.webp'},
  {id:'moonlit-lotus',title:'Moonlit Lotus Garden',subtitle:'A moonlit lotus pond alive with lantern reflections and soft bioluminescence.',file:'images/gallery/moonlit-lotus-garden.webp'}
];
const galleryFrames=galleryScenes.flatMap((scene,i)=>[
  {kind:'scene',sceneIndex:i,title:scene.title,subtitle:scene.subtitle,file:scene.file},
  {kind:'bridge',sceneIndex:i,title:scene.title,subtitle:scene.subtitle,file:`images/gallery/bridge-${String(i+1).padStart(2,'0')}.webp`}
]);

const sanctuaryScenes=[
  {id:'spring-sakura',name:'Sakura Garden',title:'Spring Sakura Stream',subtitle:'Soft blossom light and clear water to settle into focus.',file:'images/sanctuary/spring-sakura-stream.webp'},
  {id:'summer-falls',name:'Waterfall Garden',title:'Summer Waterfall Garden',subtitle:'A bright cascade and gentle pool with a restorative summer atmosphere.',file:'images/sanctuary/summer-waterfall-garden.webp'},
  {id:'summer-meadow',name:'Meadow Brook',title:'Summer Meadow Brook',subtitle:'Wildflowers, sunlight and a brook that moves at an easy pace.',file:'images/sanctuary/summer-meadow-brook.webp'},
  {id:'autumn-maples',name:'Autumn River',title:'Autumn Maple River',subtitle:'Golden leaves and warm light reflected across calm water.',file:'images/sanctuary/autumn-maple-river.webp'},
  {id:'winter-cabin',name:'Winter Cabin',title:'Winter Cabin Stream',subtitle:'A cozy winter refuge with lanterns, snow and a softly moving stream.',file:'images/sanctuary/winter-cabin-stream.webp'},
  {id:'moonlit-lotus',name:'Moonlit Lotus',title:'Moonlit Lotus Garden',subtitle:'Night air, glowing lotus blossoms and luminous water.',file:'images/sanctuary/moonlit-lotus-garden.webp'}
];
const exClamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const exReduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function exFull(stage){if(document.fullscreenElement===stage){document.exitFullscreen?.().catch(()=>{});return}if(stage.classList.contains('exExpanded')){stage.classList.remove('exExpanded');return}if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>stage.classList.toggle('exExpanded'));else stage.classList.toggle('exExpanded')}
function exCloseFull(stage){stage.classList.remove('exExpanded');if(document.fullscreenElement===stage)document.exitFullscreen?.().catch(()=>{})}

function gallery(){
 const n=galleryScenes.length;
 main.innerHTML=`<section class="wrap exIntro"><div><div class="eyebrow">FRANK’S / INFINITE ART</div><h1>Infinite worlds.</h1><p>Follow a continuous vertical journey through illustrated landscapes. Scroll freely or choose a gentle automatic pace.</p></div><div class="exIntroMeta"><span class="exMicro">CONTINUOUS GALLERY</span><strong>∞</strong><span>${n} worlds · ${n} connecting passages</span></div></section><section class="wrap"><div class="g131" id="g131"><div class="g131bar"><div><span class="exMicro" id="g131count"></span><h3 id="g131title"></h3></div><div class="exControls"><button id="g131prev">↑ Previous</button><button id="g131next">Next ↓</button><button id="g131auto" aria-pressed="false">Auto scroll</button><label>Pace <select id="g131speed"><option value="24">Slow</option><option value="48" selected>Gentle</option><option value="90">Fast</option></select></label><button id="g131full">Fullscreen</button></div></div><div class="g131view" id="g131view" tabindex="0" aria-label="Continuous vertical art gallery"><div id="g131track"></div></div></div></section>`;
 const host=$('#g131'),v=$('#g131view'),track=$('#g131track'),btn=$('#g131auto');
 const markup=galleryScenes.map((s,i)=>`<img width="1600" height="1320" src="images/gallery/continuous/world-${String(i).padStart(2,'0')}.webp" alt="${s.title}" decoding="async" draggable="false">`).join('');
 track.innerHTML=Array.from({length:3},()=>`<div class="g131cycle">${markup}</div>`).join('');
 let h=0,step=0,auto=false,raf=0,scrollRAF=0,last=0,carry=0,dead=false,active=-1;
 const mod=(x,m)=>((x%m)+m)%m;
 function sync(){if(!h||dead)return;let y=v.scrollTop;if(y<h*.3){v.scrollTop=y+h;y+=h}else if(y>h*2.4){v.scrollTop=y-h;y-=h}const i=Math.min(n-1,Math.floor((mod(y,h)+.5)/step)%n);if(i!==active){active=i;$('#g131title').textContent=galleryScenes[i].title;$('#g131count').textContent=`WORLD ${i+1} / ${n}`}}
 function measure(){const old=h,pos=old?mod(v.scrollTop,old)/old:0;h=track.firstElementChild.getBoundingClientRect().height;step=h/n;if(h){v.scrollTop=h+pos*h;sync()}}
 function tick(ts){if(!auto||dead)return;if(last&&!document.hidden){carry+=Number($('#g131speed').value)*Math.min(ts-last,50)/1000;const delta=Math.floor(carry);if(delta){carry-=delta;v.scrollTop+=delta;sync()}}last=ts;raf=requestAnimationFrame(tick)}
 function setAuto(on){auto=on;cancelAnimationFrame(raf);last=0;carry=0;btn.textContent=on?'Pause auto':'Auto scroll';btn.setAttribute('aria-pressed',String(on));if(on)raf=requestAnimationFrame(tick)}
 function jump(dir){setAuto(false);const i=Math.floor((v.scrollTop+.5)/step);v.scrollTo({top:(i+dir)*step,behavior:exReduced()?'auto':'smooth'})}
 v.addEventListener('scroll',()=>{if(!scrollRAF)scrollRAF=requestAnimationFrame(()=>{scrollRAF=0;sync()})},{passive:true});v.addEventListener('wheel',()=>{if(auto)setAuto(false)},{passive:true});v.addEventListener('touchstart',()=>{if(auto)setAuto(false)},{passive:true});
 $('#g131prev').onclick=()=>jump(-1);$('#g131next').onclick=()=>jump(1);btn.onclick=()=>setAuto(!auto);$('#g131full').onclick=()=>exFull(host);
 v.onkeydown=e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp'].includes(e.key)){e.preventDefault();jump(['ArrowDown','PageDown'].includes(e.key)?1:-1)}};
 const ro=new ResizeObserver(measure);ro.observe(v);measure();cleanup=()=>{dead=true;setAuto(false);cancelAnimationFrame(scrollRAF);ro.disconnect();exCloseFull(host)};
}

function sanctuary(){
  const first=sanctuaryScenes[0];
  main.innerHTML=`<section class="wrap exIntro"><div><div class="eyebrow">CALM EXPERIENCE</div><h1 class="studyTitle">Focus sanctuary</h1><p>Choose a retreat, set a study duration, and begin.</p></div><div class="exIntroMeta"><span class="exMicro">FOCUS SANCTUARY</span><strong>◔</strong><span>${sanctuaryScenes.length} illustrated themes</span></div></section><section class="wrap"><div class="focusLayout"><div class="focusStage" id="focusStage"><img class="focusScene current" id="focusCurrent" src="${first.file}" alt="${first.title}"><img class="focusScene next" id="focusNext" alt=""><div class="focusTimer" id="focusTimer"><div class="eyebrow">FOCUS TIMER</div><div class="focusDigital" id="focusDigital">25:00</div><div class="focusCircle" id="focusCircleWrap"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="bg"></circle><circle cx="60" cy="60" r="52" class="ring" id="focusRing"></circle></svg></div><div class="focusAnalog" id="focusAnalog"><div class="face"></div><div class="hand minute" id="focusMinute"></div><div class="hand second" id="focusSecond"></div><div class="pin"></div></div><div class="focusTimerRow"><button id="focusStart">Start</button><button id="focusPause">Pause</button><button id="focusReset">Reset</button></div></div><div class="focusCaption"><div class="eyebrow">YOUR RETREAT</div><h2 id="focusTitle">${first.title}</h2><p id="focusSubtitle">${first.subtitle}</p></div></div><aside class="focusPanel"><h2 class="studyControlsTitle">Study timer</h2><p>Set a duration in minutes. The timer runs locally.</p><label>Duration (minutes)<input id="focusMinutes" type="number" min="1" max="180" step="1" value="25"><span id="focusMinutesLabel">25 minutes</span></label><label>Display mode<select id="focusMode"><option value="digital">Digital</option><option value="circle">Circular</option><option value="analog">Analog</option></select></label><div class="filters"><button id="focusToggleTimer">Hide timer</button><button id="focusFullscreen">Fullscreen</button></div><div><div class="eyebrow">Themes</div><div class="focusThemes" id="focusThemes">${sanctuaryScenes.map((s,i)=>`<button data-scene="${i}" class="${i===0?'selected':''}">${s.name}</button>`).join('')}</div></div><div class="notice">Tip: use fullscreen, set the timer, and leave the page on digital or circular mode if you want the lightest rendering load.</div></aside></div></section>`;
  const stage=$('#focusStage'), current=$('#focusCurrent'), next=$('#focusNext'), title=$('#focusTitle'), subtitle=$('#focusSubtitle'), digital=$('#focusDigital'), ring=$('#focusRing'), analog=$('#focusAnalog'), minuteHand=$('#focusMinute'), secondHand=$('#focusSecond'), minutesInput=$('#focusMinutes'), minutesLabel=$('#focusMinutesLabel'), modeSel=$('#focusMode'), timerBox=$('#focusTimer');
  const circumference=2*Math.PI*52; ring.style.strokeDasharray=String(circumference);
  let sceneIndex=0, duration=25*60, remaining=duration, running=false, lastTs=0, raf=0, disposed=false, deadline=0, sceneRequest=0, sceneTimeout=0;
  sanctuaryScenes.forEach(s=>{const im=new Image(); im.src=s.file;});
  function fmt(sec){ sec=Math.max(0, Math.ceil(sec)); const m=Math.floor(sec/60), s=sec%60; return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  function paint(){ const progress=1-(remaining/duration||0); digital.textContent=fmt(remaining); ring.style.strokeDashoffset=String(circumference*progress); const minuteDeg=(remaining/duration)*360; const secondDeg=((remaining%60)/60)*360; minuteHand.style.transform=`translateX(-50%) rotate(${minuteDeg}deg)`; secondHand.style.transform=`translateX(-50%) rotate(${secondDeg}deg)`; }
  function setMode(){ stage.dataset.mode=modeSel.value; }
  function setScene(idx){const request=++sceneRequest,scene=sanctuaryScenes[idx];const im=new Image();im.onload=()=>{if(disposed||request!==sceneRequest)return;clearTimeout(sceneTimeout);current.src=scene.file;current.alt=scene.title;current.style.opacity='1';next.style.opacity='0';title.textContent=scene.title;subtitle.textContent=scene.subtitle;$('#focusThemes').querySelectorAll('button').forEach((b,i)=>b.classList.toggle('selected',i===idx))};im.src=scene.file;}
  function setDuration(mins, reset=true){ duration=mins*60; if(reset) remaining=duration; minutesLabel.textContent=`${mins} minutes`; paint(); }
  function loop(){if(disposed)return;if(running){remaining=Math.max(0,(deadline-Date.now())/1000);if(!remaining)running=false;paint()}}
  $('#focusStart').onclick=()=>{if(running)return;if(!remaining)remaining=duration;deadline=Date.now()+remaining*1000;running=true;paint()};
  $('#focusPause').onclick=()=>{if(running)loop();running=false;paint()};
  $('#focusReset').onclick=()=>{ running=false; remaining=duration; paint(); };
  $('#focusToggleTimer').onclick=()=>{ timerBox.classList.toggle('hidden'); $('#focusToggleTimer').textContent=timerBox.classList.contains('hidden')?'Show timer':'Hide timer'; };
  $('#focusFullscreen').onclick=()=>exFull(stage);
  minutesInput.onchange=e=>{running=false;const m=exClamp(Math.round(Number(e.target.value)||25),1,180);e.target.value=m;setDuration(m,true)};
  modeSel.onchange=setMode;
  $('#focusThemes').onclick=e=>{ const b=e.target.closest('[data-scene]'); if(!b) return; setScene(Number(b.dataset.scene)); };
  setMode(); setDuration(25, true); paint(); raf=setInterval(loop,200);
  cleanup=()=>{ disposed=true; clearInterval(raf); clearTimeout(sceneTimeout); exCloseFull(stage); };
}

function people(){const team=[['frank','Frank Guo','Founder & creative lead','The original idea','From a roadside food stand to an imagined world of design, Frank is the creative thread connecting every collection.'],['chef','Maya Torres','Executive chef','Food & hospitality','Maya brings an inventive approach to comfort food, balancing familiar flavors with playful details.'],['designer','Elliot Chen','Design director','Living & objects','Elliot explores the relationship between materials, craftsmanship and the everyday spaces people use.'],['architect','Clara Vale','Chief architect','Estates & spaces','Clara imagines homes built around light, landscape and a sense of calm.'],['engineer','Marcus Reed','Motors director','Concept engineering','Marcus develops the fictional vehicle collection, combining expressive forms with ambitious technology.'],['games','Sofia Reyes','Experience director','Art & play','Sofia brings the arcade and experimental experiences together, making the Empire a place to explore.']];main.innerHTML=hero('Meet the minds.','Different ideas. One extraordinary collection.','images/home/hero-campus.webp',true)+`<section class="wrap founderFeature">${picture('images/story/team-frank.webp','Illustrated fictional founder portrait')}<div><div class="eyebrow">The founder / Frank Guo</div><h2>Curiosity is the beginning of everything.</h2><p>The Empire began with an idea that even the smallest everyday details could become something extraordinary. That spirit continues across the collections, from a perfectly toasted bun to an entire imagined landscape.</p><a class="primary" href="#story">Explore the story →</a></div></section><section class="wrap">${head('The creative collective','Fictional team profiles and illustrative portraits.')}<div class="peopleGrid">${team.map(([f,n,role,focus,bio])=>`<article class="person">${picture('images/story/team-'+f+'.webp',n+' illustrated portrait')}<div><div class="eyebrow">${focus}</div><h3>${n}</h3><strong>${role}</strong><p>${bio}</p></div></article>`).join('')}</div></section>`}
