(() => {
"use strict";
const $=id=>document.getElementById(id), SAVE="mbssim-v2-save", META="mbssim-v2-meta";
const quiz=[
{q:"Which cell organelle is the main site of ATP production in aerobic respiration?",a:["Golgi apparatus","Mitochondrion","Lysosome","Ribosome"],correct:1,why:"Mitochondria generate most ATP through oxidative phosphorylation."},
{q:"Which plane divides the body into left and right portions?",a:["Transverse","Coronal","Sagittal","Oblique"],correct:2,why:"The sagittal plane separates left and right portions; the midsagittal plane divides them equally."},
{q:"Which blood component primarily transports oxygen?",a:["Platelets","Plasma proteins","Red blood cells","Neutrophils"],correct:2,why:"Haemoglobin inside red blood cells binds and transports most oxygen in blood."},
{q:"What is the functional unit of the kidney?",a:["Alveolus","Nephron","Sarcomere","Hepatocyte"],correct:1,why:"The nephron filters blood and modifies filtrate to form urine."},
{q:"Which cranial nerve is responsible for smell?",a:["Optic nerve (II)","Olfactory nerve (I)","Vagus nerve (X)","Facial nerve (VII)"],correct:1,why:"Cranial nerve I carries olfactory sensory information."},
{q:"Which heart chamber pumps oxygenated blood into the systemic circulation?",a:["Right atrium","Right ventricle","Left atrium","Left ventricle"],correct:3,why:"The left ventricle ejects oxygenated blood into the aorta."},
{q:"Which vitamin deficiency classically causes scurvy?",a:["Vitamin A","Vitamin B12","Vitamin C","Vitamin D"],correct:2,why:"Vitamin C is needed for normal collagen synthesis; deficiency can cause scurvy."},
{q:"Which type of epithelium typically lines the alveoli for gas exchange?",a:["Simple squamous","Stratified squamous","Transitional","Simple cuboidal"],correct:0,why:"Thin simple squamous cells support rapid diffusion across the alveolar surface."}
];
const awards=[
{id:"first",icon:"🌱",name:"First Steps",desc:"Make your first decision.",test:m=>m.decisions>=1},
{id:"five",icon:"🧠",name:"Getting the Hang of It",desc:"Make five decisions.",test:m=>m.decisions>=5},
{id:"explorer",icon:"🧭",name:"Campus Explorer",desc:"Visit four different locations.",test:m=>m.visited.length>=4},
{id:"traveller",icon:"🗺️",name:"Every Corner",desc:"Visit all six locations.",test:m=>m.visited.length>=6},
{id:"scholar",icon:"📚",name:"Bookworm",desc:"Reach 50 knowledge.",test:(m,s)=>s.stats.knowledge>=50},
{id:"genius",icon:"✨",name:"High-Yield Hero",desc:"Reach 80 knowledge.",test:(m,s)=>s.stats.knowledge>=80},
{id:"present",icon:"✓",name:"Here, Actually",desc:"Keep attendance at 90 or above.",test:(m,s)=>s.stats.attendance>=90},
{id:"keepsake",icon:"🎒",name:"Collector",desc:"Carry two different items.",test:(m,s)=>s.inventory.length>=2},
{id:"steady",icon:"🛡️",name:"Steady Hands",desc:"Keep sanity and energy above 60.",test:(m,s)=>s.stats.sanity>=60&&s.stats.energy>=60},
{id:"quiz",icon:"🎯",name:"Knowledge Check",desc:"Answer a knowledge challenge correctly.",test:m=>m.quizCorrect>=1}
];
let meta=readMeta(),quizIndex=0,quizDone=false,installPrompt=null;
function readSave(){try{return JSON.parse(localStorage.getItem(SAVE))}catch(e){return null}}
function readMeta(){try{const m=JSON.parse(localStorage.getItem(META));if(m&&Array.isArray(m.visited))return m}catch(e){}return {decisions:0,visited:["campus"],quizCorrect:0,unlocked:[],seenEvents:[]}}
function persist(){try{localStorage.setItem(META,JSON.stringify(meta))}catch(e){}}
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function checkAwards(){const s=readSave();if(!s)return;let changed=false;for(const a of awards){if(!meta.unlocked.includes(a.id)&&a.test(meta,s)){meta.unlocked.push(a.id);changed=true;showToast("ACHIEVEMENT UNLOCKED: "+a.name)}}if(changed)persist();renderAchievements();renderObjectives()}
function renderObjectives(){const s=readSave()||{stats:{knowledge:0},inventory:[]};const items=[{name:"Make 5 decisions",count:Math.min(meta.decisions,5)+"/5",done:meta.decisions>=5},{name:"Explore 4 locations",count:Math.min(meta.visited.length,4)+"/4",done:meta.visited.length>=4},{name:"Reach 40 knowledge",count:Math.min(s.stats.knowledge,40)+"/40",done:s.stats.knowledge>=40}];$("objectives").innerHTML=items.map(x=>'<div class="objective '+(x.done?"done":"")+'"><strong>'+(x.done?"✓ ":"◇ ")+x.name+'</strong><small>'+x.count+(x.done?" · COMPLETE":" · IN PROGRESS")+"</small></div>").join("");$("objective-progress").textContent=items.filter(x=>x.done).length+" / "+items.length;$("achievement-count").textContent=meta.unlocked.length}
function renderAchievements(){$("achievement-list").innerHTML=awards.map(a=>{const on=meta.unlocked.includes(a.id);return '<div class="achievement '+(on?"unlocked":"")+'"><span class="medal">'+a.icon+'</span><div><strong>'+a.name+(on?" ✓":"")+'</strong><small>'+a.desc+(on?" · UNLOCKED":" · LOCKED")+"</small></div></div>"}).join("");$("achievement-count").textContent=meta.unlocked.length}
function trackDecision(){meta.decisions++;const s=readSave();if(s&&s.eventId&&!meta.seenEvents.includes(s.eventId))meta.seenEvents.push(s.eventId);persist();checkAwards()}
function trackTravel(){const s=readSave();if(s&&s.location&&!meta.visited.includes(s.location))meta.visited.push(s.location);persist();checkAwards()}
function openQuiz(){quizDone=false;quizIndex=(Math.floor(Math.random()*quiz.length));$("quiz-feedback").textContent="";$("quiz-next").hidden=true;renderQuestion();$("challenge-modal").showModal()}
function renderQuestion(){const q=quiz[quizIndex];$("quiz-content").innerHTML='<div class="meta"><span>QUESTION '+(quizIndex+1)+' / '+quiz.length+'</span><span>+8 KNOWLEDGE · +15 XP</span></div><p class="quiz-question">'+q.q+'</p><div class="quiz-options">'+q.a.map((a,i)=>'<button class="quiz-option" data-answer="'+i+'">'+String.fromCharCode(65+i)+'. '+a+"</button>").join("")+"</div>";$("quiz-content").querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>answer(Number(b.dataset.answer))))}
function answer(n){if(quizDone)return;quizDone=true;const q=quiz[quizIndex],ok=n===q.correct;document.querySelectorAll(".quiz-option").forEach(b=>{b.disabled=true;if(Number(b.dataset.answer)===q.correct)b.style.borderColor="var(--lime)"});if(ok){const s=readSave();if(s){s.stats.knowledge=Math.min(100,s.stats.knowledge+8);s.xp=(s.xp||0)+15;while(s.xp>=s.level*100){s.xp-=s.level*100;s.level=(s.level||1)+1}try{localStorage.setItem(SAVE,JSON.stringify(s))}catch(e){}}meta.quizCorrect++;persist();$("quiz-feedback").className="quiz-correct";$("quiz-feedback").textContent="Correct! "+q.why+" +8 knowledge, +15 XP.";checkAwards()}else{$("quiz-feedback").className="quiz-wrong";$("quiz-feedback").textContent="Not quite. "+q.why+" No penalty—learning is the point."}$("quiz-next").hidden=false;$("quiz-next").textContent="BACK TO GAME";renderObjectives()}
function move(dir){const scene=$("scene"),player=$("player");if(!scene||!player)return;const w=scene.clientWidth,pw=player.offsetWidth,cur=player.offsetLeft,step=10;let x=cur,y=Number(player.dataset.y||0),nx=x,ny=y;if(dir==="left")nx-=step;if(dir==="right")nx+=step;if(dir==="up")ny=Math.min(24,y+step);if(dir==="down")ny=Math.max(-24,y-step);nx=Math.max(4,Math.min(w-pw-4,nx));const building=scene.querySelector(".building");const br=building.getBoundingClientRect(),sr=scene.getBoundingClientRect();const center=nx+pw/2,inside=center>br.left-sr.left&&center<br.right-sr.left;const playerTop=scene.clientHeight-30-60-ny,playerBottom=playerTop+60,buildingTop=br.top-sr.top,buildingBottom=br.bottom-sr.top;if(inside&&playerBottom>buildingTop+8&&playerTop<buildingBottom-5){showToast("The building blocks your path!");return}player.style.left=nx+"px";player.dataset.y=String(ny);player.style.bottom=(30+ny)+"px";player.style.zIndex=ny>10?"3":"1"}
function initMove(){const player=$("player");player.style.left="18%";document.addEventListener("keydown",e=>{if($("journalmodal").open||$("ending").open||$("challenge-modal").open||$("achievements-modal").open)return;const map={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};if(map[e.key]){e.preventDefault();move(map[e.key])}});$("dpad").querySelectorAll("button").forEach(b=>{b.addEventListener("pointerdown",e=>{e.preventDefault();move(b.dataset.move)})})}
$("choices").addEventListener("click",e=>{if(e.target.closest(".choice"))setTimeout(trackDecision,0)});
$("locations").addEventListener("click",e=>{if(e.target.closest(".location"))setTimeout(trackTravel,0)});\ndocument.addEventListener("keydown",e=>{if($("journalmodal").open||$("ending").open||$("challenge-modal").open||$("achievements-modal").open)return;if("1234".includes(e.key)&&e.key.length===1)setTimeout(trackDecision,0);if("qwerty".includes(e.key.toLowerCase())&&e.key.length===1)setTimeout(trackTravel,0)});
$("challenge-open").addEventListener("click",openQuiz);$("quiz-next").addEventListener("click",()=>{if(quizDone){$("challenge-modal").close();location.reload()}else{quizIndex=(quizIndex+1)%quiz.length;renderQuestion()}});
$("achievements-open").addEventListener("click",()=>{$("achievements-modal").showModal();renderAchievements()});
$("textsize").addEventListener("click",()=>{document.body.classList.toggle("large-text");const on=document.body.classList.contains("large-text");localStorage.setItem("mbssim-large-text",on?"1":"0");$("textsize").textContent=on?"A− NORMAL TEXT":"A+ LARGER TEXT"});
$("contrast").addEventListener("click",()=>{document.body.classList.toggle("high-contrast");const on=document.body.classList.contains("high-contrast");localStorage.setItem("mbssim-high-contrast",on?"1":"0");$("contrast").textContent=on?"◐ NORMAL CONTRAST":"◐ HIGH CONTRAST"});
document.querySelectorAll(".close").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
$("reset").addEventListener("click",()=>{setTimeout(()=>{meta={decisions:0,visited:["campus"],quizCorrect:0,unlocked:[],seenEvents:[]};persist();renderObjectives();renderAchievements()},0)});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("install-app").hidden=false});
$("install-app").addEventListener("click",async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("install-app").hidden=true});
window.addEventListener("appinstalled",()=>showToast("Game installed!"));
if(localStorage.getItem("mbssim-large-text")==="1"){document.body.classList.add("large-text");$("textsize").textContent="A− NORMAL TEXT"}
if(localStorage.getItem("mbssim-high-contrast")==="1"){document.body.classList.add("high-contrast");$("contrast").textContent="◐ NORMAL CONTRAST"}
initMove();renderObjectives();renderAchievements();checkAwards();
if("serviceWorker"in navigator&&location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
})();