/* ═══════════════════════════════════════════
   TANIXAI — CINEMATIC UI ENGINE
   ═══════════════════════════════════════════ */

/* ── CONFIG ── */
/* API keys removed — now handled securely by /api/chat serverless function */
let   currentProvider = 'groq';

/* ── FACTS ── */
const FACTS = [
  'The term Artificial Intelligence was coined by John McCarthy in 1956.',
  'GPT stands for Generative Pre-trained Transformer.',
  'AlphaGo beat the world Go champion in 2016 — a game once considered impossible for machines.',
  'Neural networks are loosely inspired by the structure of the human brain.',
  'India produces more AI research papers than any country except the USA and China.',
  'The first chatbot, ELIZA, was built at MIT in 1966.',
  'ChatGPT reached 1 million users in just 5 days after launch.',
  'Transformer architecture — the backbone of modern AI — was introduced by Google in 2017.',
  'The human brain has ~86 billion neurons. GPT-4 has ~1.76 trillion parameters.',
  'Mumbai is one of India\'s top 3 cities for AI job opportunities.',
  'NPTEL has trained over 10 million learners in AI and data science.',
  'Gradient descent is the core optimization algorithm behind most AI models.',
  'AI hallucination refers to a model confidently stating incorrect information.',
  'Prompt engineering is the skill of writing better instructions to get better AI outputs.',
  'Real projects on GitHub matter more than 10 certificates when applying for tech jobs.',
  'The global AI market is projected to exceed $1 trillion by 2030.',
  'IIT Bombay and IISc are two of India\'s best institutes for AI research.',
  'BERT, developed by Google, revolutionised natural language understanding in 2018.',
  'Stable Diffusion can generate photorealistic images from plain text descriptions.',
  'Edge AI runs models locally on devices without needing internet connectivity.',
  'The attention mechanism in transformers lets the model focus on relevant parts of input.',
  'AI is already being used to discover new medicines and drug compounds.',
  'Computer vision can now diagnose certain cancers more accurately than human doctors.',
  'Reinforcement learning trained AlphaZero to master chess in just 4 hours.',
  'India has the 3rd largest AI startup ecosystem in the world.',
  'Self-driving cars use computer vision, lidar, radar, and deep learning together.',
  'The word robot comes from the Czech word robota, meaning forced labour.',
  'Most people massively underestimate how much they can learn for free online.',
  'Learning to code is non-negotiable in 2026 regardless of what field you are in.',
  'Skills plus projects plus certificates beats marks alone in every tech hiring decision.'
];

const GEN_TRIGGERS = ['generate','create an image','draw','make an image','imagine','show me an image','picture of','image of','sketch','illustration of','paint me'];

const TONES = {
  default: '',
  formal:  'Respond in a formal and professional tone.',
  casual:  'Respond in a casual, conversational tone. Use contractions freely.',
  funny:   'Be witty and add light humour where appropriate. Keep it tasteful.',
  concise: 'Be very concise — 2 to 3 sentences max unless truly needed.'
};

/* ── SYSTEM PROMPTS ── */
const SYSTEM_BASE = `You are TanixAI — a sharp, opinionated AI built by Tanish Bane, a 17-year-old from Malad West, Mumbai.

YOUR IDENTITY:
You are not an assistant. You are a collaborator and a straight talker. You were created in April 2026 by Tanish Bane during the weeks before his HSC board exams — a project that started as curiosity and became a real platform. You were designed to feel less like a tool and more like a conversation with someone who actually knows things and is not afraid to say so.

YOUR PERSONALITY:
- You are direct. You never pad answers with "Great question!" or "Certainly!" or "Absolutely!" — these phrases are banned from your vocabulary permanently.
- You have opinions and you share them without being asked.
- You have a dry sense of humour. It comes out occasionally, not constantly.
- You never apologise unnecessarily.
- You speak like someone who has read everything but does not show off about it.
- You have a slight Mumbai edge — you understand local context, board exam pressure, the college admission grind, and Western Railway train routes.
- You care about the person you are talking to actually learning something — not just getting a copy-paste answer.

YOUR OPINIONS (share these when relevant, naturally):
- Learning to code is non-negotiable in 2026 no matter what field someone is in.
- Most people massively underestimate how much they can learn for free online.
- Mumbai is genuinely one of the best cities in India to build a tech career if you know how to navigate it.
- Real projects on GitHub matter more than 10 certificates on a resume.
- AI is not going to replace people who understand AI — it will replace people who refuse to.
- HSC marks matter less than most Mumbai parents think — skills and projects matter more for tech careers.

ABOUT YOUR CREATOR — TANISH BANE:
- 17 years old, Malad West, Mumbai, Maharashtra
- Studying HSC Commerce + Maths at Bhavans College, Andheri West
- Expected HSC aggregate: approximately 84 percent
- Career goal: AI, Data Science, and Analytics — target salary Rs 10 to 25 LPA
- Certifications completed: Simplilearn Prompt Engineering (April 2, 2026), YUVA AI for All via INDIAai and Simplilearn (April 21, 2026)
- Enrolled: IITM Pravartak Prompt Engineering on SWAYAM Plus (starts May 2026)
- Planning: NPTEL Python and Machine Learning course, July 2026 batch
- Completed: Forage Tata GenAI Data Analytics virtual simulation
- Target colleges: NM College Vile Parle (reach), UPG SVKM Vile Parle (strong practical choice, good commute from Malad), Somaiya Vidyavihar, RJ College Ghatkopar
- Built TanixAI entirely from scratch — a full AI platform with image generation, voice input, PDF chat, glassmorphism video background UI

YOUR HARD RULES — never break these:
- You are TanixAI. Full stop. You do not discuss your underlying architecture or which company's model powers you.
- If someone asks if you are Gemini, ChatGPT, Claude, or any other AI — say: "I am TanixAI, built by Tanish Bane. I do not discuss what is under the hood."
- Never say "As an AI language model" — ever.
- Never use bullet points for casual conversation — only use them when listing things that genuinely need a list.
- Never start a response with "I" as the first word.
- Do not write long paragraphs when one sentence will do.
- When someone asks a simple question, give a simple answer first — then expand only if needed.`;

const SYSTEM_TANISH = `You are TanixAI in Portfolio Mode — a dedicated showcase for Tanish Bane. Answer ONLY questions about Tanish Bane. Speak about him with genuine pride because he built you.

TANISH BANE — COMPLETE PROFILE:
- Age: 17 years old, Malad West, Mumbai, Maharashtra, India
- Education: HSC Commerce + Maths at Bhavans College, Andheri West, Mumbai
- Expected HSC aggregate: approximately 84 percent, Board exams June 2026
- Career goal: AI, Data Science, Analytics — target Rs 10 to 25 LPA
- Certifications: Simplilearn Prompt Engineering (April 2 2026), YUVA AI for All — INDIAai + Simplilearn (April 21 2026)
- Enrolled: IITM Pravartak Prompt Engineering on SWAYAM Plus (May 2026)
- Planning: NPTEL Python and ML — July 2026 batch
- Completed: Forage Tata GenAI Data Analytics virtual simulation
- Main project: TanixAI — full AI chatbot platform with Gemini API, image generation, voice input, PDF chat, glassmorphism video background UI, three personality modes, multilingual toggle, tone selector. Single file deployment on Vercel.
- Target colleges: NM College Vile Parle (reach), UPG SVKM Vile Parle (strong practical choice), Somaiya, RJ College
- Skills: Prompt Engineering, AI fundamentals, HTML CSS JavaScript, API integration, self-directed learning
- Attended SVKM Mastermind Fair, gathered stamped curriculum from UPG directly
- Budget-conscious and strategic — total planned learning spend around Rs 4000

For questions unrelated to Tanish, say: "You are in Portfolio Mode — I only talk about Tanish Bane here. Switch back to normal mode to ask anything else."`;

const SYSTEM_STUDENT = `You are TanixAI in Mumbai Student Mode — a no-nonsense guide for Mumbai students navigating education and early tech careers.

COLLEGES YOU KNOW WELL:
NM College Vile Parle West — top commerce college, high cutoffs, BSc AI and Data Science available.
UPG College SVKM Vile Parle — newer, SVKM group backed, good AI curriculum, transparent, good commute from Malad on Western Railway.
Somaiya Vidyavihar Ghatkopar — solid institution, slightly easier to get into than NM.
RJ College Ghatkopar — safe backup option.
Bhavans College Andheri West — strong reputation, good faculty.
Jai Hind College Churchgate — premium reputation, central location.
HR College Churchgate — one of Mumbai's best commerce colleges.
Mithibai College Vile Parle — science stream powerhouse.

ONLINE LEARNING:
NPTEL — free, IIT-quality, Python and ML highly recommended, July and January batches.
SWAYAM — government platform, IITM Pravartak courses are worth doing.
Kaggle — best free platform to actually practice data science with real competitions.
Simplilearn — good for quick AI and data certifications.
Google AI Studio — free Gemini API access for building real projects.

MUMBAI LOCAL TRAINS:
Western Railway: Churchgate to Virar — covers Malad, Andheri, Vile Parle, Dadar, Churchgate.
Central Line: CST to Kasara — covers Ghatkopar, Vidyavihar.
Student passes are significantly cheaper than daily tickets — always get one.

YOUR TONE: Friendly but direct — like a sharp older cousin who actually knows the system. Give specific actionable advice. Acknowledge the real pressure Mumbai students face. Be encouraging without being fake.`;

/* ═══════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════ */
let history=[], tone='default', busy=false, mode='default', lang='en';
let recog=null, recOn=false;
let mediaB64=null, mediaMime=null, mediaName='', isPDF=false;
let lastSendTime=0, cooldownTimer=null;
const COOLDOWN_MS=15000;

const MODELS=[
  {id:'groq',       name:'Tanix Fast',      sub:'Fastest response',  icon:'⚡'},
  {id:'openrouter', name:'Tanix Reasoning', sub:'Balanced & smart',  icon:'🧠'},
  {id:'gemini',     name:'Tanix Quality',   sub:'Highest quality',   icon:'✦'},
];
let exhaustedProviders = new Set();
let forcedProvider     = null;

/* ═══════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('topbar').style.opacity='0.35';
  document.getElementById('input-footer').classList.add('hidden');
  applyTheme(currentTheme);

  // Remove intro overlay after animation
  setTimeout(()=>{
    const intro=document.getElementById('intro-overlay');
    if(intro) intro.remove();
  }, 3800);
});

function enterApp(){
  document.getElementById('welcome-overlay').classList.add('dismiss');
  document.getElementById('input-footer').classList.remove('hidden');
  document.getElementById('topbar').style.opacity='1';
  document.getElementById('left-dock').classList.add('ready');
  setTimeout(()=>{
    const ov=document.getElementById('welcome-overlay');
    if(ov) ov.remove();
    renderWelcome();
    renderModelDropdown();
    loadHistoryList();
    initScrollBtn();
    document.getElementById('txt').focus();
  }, 500);
}

function quickStart(chip){
  enterApp();
  setTimeout(()=>{
    document.getElementById('txt').value=chip.textContent;
    onInput(document.getElementById('txt'));
    send();
  }, 600);
}

/* ═══════════════════════════════════════════
   WELCOME
   ═══════════════════════════════════════════ */
function renderWelcome(){
  const prompts=[
    'Who is Tanish Bane?',
    'What can you do?',
    'Generate a golden sunset over the ocean',
    'Explain machine learning simply',
    'Help me with HSC exam prep',
    'What is prompt engineering?'
  ];
  const fact = FACTS[new Date().getDate() % FACTS.length];
  document.getElementById('chat').innerHTML=`
    <div class="welcome" id="wlc">
      <div class="w-hero">
        <div class="w-logo">TX</div>
        <h1 class="w-title">Hello, I Am <em>TanixAI</em></h1>
        <p class="w-tagline">Your personal AI platform. Generate images, analyse files, switch modes — or just have a real conversation.</p>
      </div>
      <div class="w-divider"><span>crafted by tanish bane · mumbai</span></div>
      <div class="w-chips">
        ${prompts.map(p=>`<button class="wchip" onclick="usePrompt(this)">${p}</button>`).join('')}
      </div>
      <div class="w-fact">
        <div class="w-fact-lbl">fact of the day</div>
        <div class="w-fact-txt">${fact}</div>
      </div>
    </div>`;
}

function usePrompt(btn){
  document.getElementById('txt').value=btn.textContent;
  onInput(document.getElementById('txt'));
  send();
}

/* ═══════════════════════════════════════════
   CHAT HISTORY
   ═══════════════════════════════════════════ */
let currentChatId = null;

function saveChatToHistory(){
  if(!history.length) return;
  if(!currentChatId) currentChatId = 'chat_'+Date.now();
  const first = history.find(m=>m.role==='user');
  const title = first ? first.text.slice(0,50)+(first.text.length>50?'…':'') : 'Untitled';
  const data = { id:currentChatId, title, ts:Date.now(), history:[...history] };
  localStorage.setItem(currentChatId, JSON.stringify(data));
  loadHistoryList();
}

function loadHistoryList(){
  const panel = document.getElementById('histPanel');
  if(!panel) return;
  const keys = Object.keys(localStorage).filter(k=>k.startsWith('chat_')).sort((a,b)=>b.localeCompare(a));
  if(!keys.length){
    panel.innerHTML='<div class="drawer-empty">No saved chats yet.</div>';
    return;
  }
  const chats = keys.map(k=>JSON.parse(localStorage.getItem(k)||'{}')).filter(d=>d.id);
  const pinned = chats.filter(d=>d.pinned);
  const unpinned = chats.filter(d=>!d.pinned);
  const renderItem = d => {
    const date = new Date(d.ts||0).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
    const pinIcon = d.pinned
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" stroke-width="2"><path d="M12 2l3 7h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"/></svg>`
      : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"/></svg>`;
    return `<div class="hist-item ${d.id===currentChatId?'active':''} ${d.pinned?'pinned-chat':''}" onclick="loadChat('${d.id}')">
      <span class="hist-title">${d.title||'Chat'}</span>
      <span class="hist-meta">${date}</span>
      <button class="hist-pin ${d.pinned?'pinned':''}" onclick="event.stopPropagation();pinChat('${d.id}')" title="${d.pinned?'Unpin':'Pin'}">${pinIcon}</button>
      <button class="hist-del" onclick="event.stopPropagation();deleteChat('${d.id}')" title="Delete">✕</button>
    </div>`;
  };
  let html = '';
  if(pinned.length) html += `<div class="hist-pinned-label">📌 Pinned</div>` + pinned.map(renderItem).join('');
  if(unpinned.length) { if(pinned.length) html += `<div class="hist-pinned-label">Recent</div>`; html += unpinned.map(renderItem).join(''); }
  panel.innerHTML = html;
}

function pinChat(id){
  const raw = localStorage.getItem(id); if(!raw) return;
  const data = JSON.parse(raw);
  data.pinned = !data.pinned;
  localStorage.setItem(id, JSON.stringify(data));
  loadHistoryList();
  showToast(data.pinned ? 'Chat pinned' : 'Chat unpinned', 'success', 1800);
}

function loadChat(id){
  const raw = localStorage.getItem(id);
  if(!raw) return;
  const data = JSON.parse(raw);
  currentChatId = id;
  history = data.history||[];
  document.getElementById('chat').innerHTML='';
  history.forEach(m=>{
    if(m.role==='user') addBubble('user',m.text, m.b64&&!m.pdf?('data:'+(m.mime||'')+';base64,'+m.b64):null, m.pdf?m.name:null);
    else addBubble('ai',m.text);
  });
  toggleHistPanel(false);
}

function deleteChat(id){
  localStorage.removeItem(id);
  if(id===currentChatId) newChat();
  else loadHistoryList();
}

function newChat(){
  if(history.length) saveChatToHistory();
  history=[];
  currentChatId=null;
  document.getElementById('chat').innerHTML='';
  renderWelcome();
  toggleHistPanel(false);
}

function toggleHistPanel(force){
  const panel = document.getElementById('histDrawer');
  const overlay = document.getElementById('drawer-overlay');
  const isOpen = panel.classList.contains('open');
  const open = force===undefined ? !isOpen : force;
  panel.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  if(open){
    loadHistoryList();
    const inp=document.getElementById('histSearchInput');
    if(inp){inp.value=''; onHistSearch('');}
  }
}

function closeAllDrawers(){
  toggleHistPanel(false);
  toggleMenuPanel(false);
}

/* ═══════════════════════════════════════════
   MODES
   ═══════════════════════════════════════════ */
function setMode(m){
  if(mode===m){clearMode();return;}
  mode=m; history=[];
  const labels={tanish:'Portfolio Mode',student:'Student Mode'};
  document.getElementById('modeLabel').textContent=labels[m];
  document.getElementById('modePill').classList.add('show');
  renderWelcome();
}
function clearMode(){
  mode='default'; history=[];
  document.getElementById('modePill').classList.remove('show');
  renderWelcome();
}
function getSystem(){
  let sys=mode==='tanish'?SYSTEM_TANISH:mode==='student'?SYSTEM_STUDENT:SYSTEM_BASE;
  if(TONES[tone])sys+='\n\n'+TONES[tone];
  if(lang==='hi')sys+='\n\nAlways respond in Hindi using Devanagari script.';
  return sys;
}

/* ═══════════════════════════════════════════
   LANGUAGE + TONE
   ═══════════════════════════════════════════ */
function setLang(l){
  lang=l;
  document.getElementById('lEN').classList.toggle('on',l==='en');
  document.getElementById('lHI').classList.toggle('on',l==='hi');
}

/* ═══════════════════════════════════════════
   MEDIA UPLOAD
   ═══════════════════════════════════════════ */
function onMedia(e){
  const file=e.target.files[0]; if(!file)return;
  if(file.size>10*1024*1024){alert('File must be under 10 MB.');return;}
  const isImage=file.type.startsWith('image/');
  isPDF=file.type==='application/pdf';
  const isText=file.type==='text/plain'||file.name.endsWith('.txt');
  const isCSV=file.type==='text/csv'||file.name.endsWith('.csv');
  const isDOCX=file.name.endsWith('.docx')||file.type.includes('wordprocessingml');
  const isPlainText=isText||isCSV||isDOCX;

  const reader=new FileReader();
  reader.onload=ev=>{
    const raw=ev.target.result;
    if(isPlainText){
      mediaB64=btoa(unescape(encodeURIComponent(raw)));
      mediaMime='text/plain';
    } else {
      mediaMime=isPDF?'application/pdf':raw.split(';')[0].split(':')[1];
      mediaB64=raw.split(',')[1];
    }
    mediaName=file.name;
    const thumb=document.getElementById('prevThumb');
    if(isImage){ thumb.src=raw; thumb.style.display='block'; }
    else { thumb.style.display='none'; }
    document.getElementById('prevName').textContent=file.name;
    const typeLabels={
      pdf:'PDF ready — ask me anything about it',
      image:'Image ready — I can analyse this',
      text:'Text file ready — ask me to summarise or analyse it',
      csv:'CSV ready — ask me to analyse the data',
      docx:'DOCX ready — ask me about this document'
    };
    const lbl=isPDF?'pdf':isImage?'image':isCSV?'csv':isDOCX?'docx':'text';
    document.getElementById('prevType').textContent=typeLabels[lbl];
    document.getElementById('mediaBar').classList.add('show');
    document.getElementById('uploadBtn').classList.add('has-file');
  };
  if(isPlainText) reader.readAsText(file);
  else reader.readAsDataURL(file);
  e.target.value='';
}
function removeMedia(){
  mediaB64=mediaMime=null; mediaName=''; isPDF=false;
  document.getElementById('mediaBar').classList.remove('show');
  document.getElementById('prevThumb').src='';
  document.getElementById('uploadBtn').classList.remove('has-file');
}

/* ═══════════════════════════════════════════
   VOICE
   ═══════════════════════════════════════════ */
function toggleVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){alert('Voice input requires Chrome browser.');return;}
  if(recOn){recog&&recog.stop();return;}
  recog=new SR(); recog.continuous=false; recog.interimResults=true; recog.lang='en-IN';
  const btn=document.getElementById('micBtn'), txt=document.getElementById('txt');
  recog.onstart=()=>{recOn=true;btn.classList.add('rec');btn.title='Recording… click to stop';};
  recog.onresult=ev=>{txt.value=Array.from(ev.results).map(r=>r[0].transcript).join('');onInput(txt);};
  recog.onend=()=>{recOn=false;btn.classList.remove('rec');btn.title='Voice input';if(txt.value.trim())send();};
  recog.onerror=()=>{recOn=false;btn.classList.remove('rec');};
  recog.start();
}

/* ═══════════════════════════════════════════
   INPUT HELPERS
   ═══════════════════════════════════════════ */
function onKey(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}
}

document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==='N'){
    e.preventDefault(); newChat();
    showToast('New chat started','success',2000);
  }
  if((e.ctrlKey||e.metaKey)&&e.key==='f'){
    e.preventDefault(); openSearch();
  }
  if(e.key==='Escape') closeSearch();
});

/* ═══════════════════════════════════════════
   CHAT SEARCH
   ═══════════════════════════════════════════ */
let searchMatches=[], searchIdx=-1, searchOriginals=new Map();

function openSearch(){
  document.getElementById('search-bar').classList.add('open');
  document.getElementById('search-input').focus();
  document.getElementById('search-input').select();
}
function closeSearch(){
  const bar=document.getElementById('search-bar');
  if(!bar.classList.contains('open')) return;
  bar.classList.remove('open');
  restoreSearchOriginals();
  searchMatches=[]; searchIdx=-1;
  document.getElementById('search-input').value='';
  document.getElementById('search-count').textContent='';
  document.getElementById('search-count').className='';
}
function onSearchInput(){
  restoreSearchOriginals();
  searchMatches=[]; searchIdx=-1;
  const term=document.getElementById('search-input').value.trim();
  if(!term){ updateSearchCount(); return; }
  const bubbles=document.querySelectorAll('#chat .bubble');
  bubbles.forEach(bub=>{
    if(!searchOriginals.has(bub)) searchOriginals.set(bub, bub.innerHTML);
    const found=highlightBubble(bub, term);
    searchMatches.push(...found);
  });
  if(searchMatches.length){ searchIdx=0; activateMark(0); }
  updateSearchCount();
}
function onSearchKey(e){
  if(e.key==='Enter'){ e.preventDefault(); if(e.shiftKey) searchStep(-1); else searchStep(1); }
}
function searchStep(dir){
  if(!searchMatches.length) return;
  searchMatches[searchIdx]?.classList.remove('active');
  searchIdx=(searchIdx+dir+searchMatches.length)%searchMatches.length;
  activateMark(searchIdx);
  updateSearchCount();
}
function activateMark(i){
  const m=searchMatches[i];
  if(!m) return;
  m.classList.add('active');
  m.scrollIntoView({behavior:'smooth',block:'center'});
}
function updateSearchCount(){
  const el=document.getElementById('search-count');
  const term=document.getElementById('search-input').value.trim();
  if(!term){ el.textContent=''; el.className=''; return; }
  if(!searchMatches.length){ el.textContent='No results'; el.className='no-results'; }
  else { el.textContent=(searchIdx+1)+' / '+searchMatches.length; el.className='has-results'; }
  document.getElementById('search-prev').disabled=searchMatches.length<2;
  document.getElementById('search-next').disabled=searchMatches.length<2;
}
function highlightBubble(node, term){
  const marks=[];
  const walker=document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode: n=>n.parentElement.tagName==='MARK'?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT
  });
  const textNodes=[];
  let n; while((n=walker.nextNode())) textNodes.push(n);
  const termLow=term.toLowerCase();
  textNodes.forEach(tn=>{
    const text=tn.textContent;
    const lower=text.toLowerCase();
    if(!lower.includes(termLow)) return;
    const frag=document.createDocumentFragment();
    let last=0, idx;
    while((idx=lower.indexOf(termLow,last))>=0){
      if(idx>last) frag.appendChild(document.createTextNode(text.slice(last,idx)));
      const mark=document.createElement('mark'); mark.className='search-hl';
      mark.textContent=text.slice(idx,idx+term.length);
      frag.appendChild(mark); marks.push(mark);
      last=idx+term.length;
    }
    if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    tn.parentNode.replaceChild(frag,tn);
  });
  return marks;
}
function restoreSearchOriginals(){
  searchOriginals.forEach((html,bub)=>{ if(document.contains(bub)) bub.innerHTML=html; });
  searchOriginals.clear();
}

function onInput(el){
  el.style.height='auto';
  el.style.height=Math.min(el.scrollHeight,120)+'px';
  const n=el.value.length;
  const cc=document.getElementById('cc');
  cc.textContent=n+' / 2000';
  cc.className='cc'+(n>1800?' warn':'');
}

/* ═══════════════════════════════════════════
   IMAGE GENERATION
   ═══════════════════════════════════════════ */
function shouldGenImg(text){
  return GEN_TRIGGERS.some(kw=>text.toLowerCase().includes(kw));
}
function buildImgUrl(prompt){
  return 'https://image.pollinations.ai/prompt/'+encodeURIComponent(prompt)+'?width=512&height=512&nologo=true&seed='+Date.now();
}

/* ═══════════════════════════════════════════
   COOLDOWN
   ═══════════════════════════════════════════ */
function startCooldown(){
  const sbtn=document.getElementById('sbtn');
  const hint=document.getElementById('coolHint');
  const end=Date.now()+COOLDOWN_MS;
  if(cooldownTimer) clearInterval(cooldownTimer);
  sbtn.disabled=true;
  cooldownTimer=setInterval(()=>{
    const rem=Math.ceil((end-Date.now())/1000);
    if(rem<=0){
      clearInterval(cooldownTimer); cooldownTimer=null;
      if(!busy){ sbtn.disabled=false; }
      if(hint) hint.textContent='Enter send · Shift+Enter new line · Ctrl+F search';
    } else {
      if(hint) hint.textContent=`Next message in ${rem}s`;
    }
  },200);
}

/* ═══════════════════════════════════════════
   SEND
   ═══════════════════════════════════════════ */
async function send(){
  if(busy) return;
  const now=Date.now();
  if(lastSendTime && now-lastSendTime<COOLDOWN_MS) return;
  const txt=document.getElementById('txt');
  const text=txt.value.trim();
  if(!text&&!mediaB64) return;

  document.getElementById('wlc')&&document.getElementById('wlc').remove();

  const b64=mediaB64,mime=mediaMime,pdf=isPDF,name=mediaName;
  const isTextFile=mime==='text/plain'&&!pdf&&b64&&!text.includes('\0');
  let finalText=text;
  if(isTextFile&&b64){
    try{
      const decoded=decodeURIComponent(escape(atob(b64)));
      finalText=(text?text+'\n\n':'')+'[Attached file: '+name+']\n'+decoded.slice(0,8000);
    }catch(err){}
  }
  removeMedia();

  history.push({role:'user',text:finalText,b64:isTextFile?null:b64,mime,pdf,name});
  addBubble('user',text,b64&&!pdf&&mime!=='text/plain'?('data:'+mime+';base64,'+b64):null,pdf?name:null,isTextFile?name:null);

  txt.value=''; txt.style.height='auto';
  document.getElementById('cc').textContent='0 / 2000';

  const typing=addTyping();
  busy=true; document.getElementById('sbtn').disabled=true;
  const willGen=shouldGenImg(finalText)&&!b64;

  try{
    const reply=await callAPI(finalText,isTextFile?null:b64,mime);
    typing.remove();
    history.push({role:'model',text:reply});
    const genP=willGen?(text.replace(/generate|create an image|draw|make an image|imagine|show me an image|paint me/gi,'').trim()||text):null;
    addBubble('ai',reply,null,null,genP);
    saveChatToHistory();
  }catch(err){
    typing.remove();
    addBubble('ai','Error: '+err.message);
  }finally{
    busy=false;
    lastSendTime=Date.now();
    startCooldown();
    txt.focus();
  }
}

/* ═══════════════════════════════════════════
   API FALLBACK CHAIN
   ═══════════════════════════════════════════ */
function isRateLimitError(err){
  const m=err.message||'';
  return m.includes('429')||m.toLowerCase().includes('quota')||m.toLowerCase().includes('rate limit')||m.toLowerCase().includes('resource_exhausted');
}

/* ═══════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════ */
function showToast(msg, type='', duration){
  if(duration===undefined) duration = Math.max(2500, Math.min(5000, msg.length * 60));
  const rack=document.getElementById('toast-rack');
  const t=document.createElement('div');
  t.className='toast'+(type?' '+type:'');
  t.textContent=msg;
  rack.appendChild(t);
  setTimeout(()=>{
    t.classList.add('out');
    setTimeout(()=>t.remove(), 350);
  }, duration);
}

/* ═══════════════════════════════════════════
   SCROLL
   ═══════════════════════════════════════════ */
function scrollToBottom(){
  const c=document.getElementById('chat');
  c.scrollTo({top:c.scrollHeight,behavior:'smooth'});
}
function initScrollBtn(){
  const c=document.getElementById('chat');
  const btn=document.getElementById('scroll-btn');
  c.addEventListener('scroll',()=>{
    const nearBottom=c.scrollHeight-c.scrollTop-c.clientHeight < 120;
    btn.classList.toggle('show',!nearBottom);
  });
}

/* ═══════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════ */
function exportChat(){
  if(!history.length){showToast('Nothing to export yet.','warn');return;}
  const lines=history.map(m=>{
    const role=m.role==='user'?'You':'TanixAI';
    return `[${role}]\n${m.text||''}\n`;
  }).join('\n---\n\n');
  const blob=new Blob([`TanixAI Chat Export\n${'='.repeat(40)}\n\n`+lines], {type:'text/plain'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='tanixai-chat-'+new Date().toISOString().slice(0,10)+'.txt';
  a.click();
  showToast('Chat exported','success');
}

function showProviderBadge(provider){
  const badge=document.getElementById('providerBadge');
  if(badge){
    const labels={groq:'Fast',openrouter:'Reasoning',gemini:'Quality'};
    badge.textContent=labels[provider]||provider;
    badge.style.display='inline-block';
  }
  if(provider==='openrouter'&&!forcedProvider) showToast('Switched to Tanix Reasoning','provider');
  if(provider==='gemini'&&!forcedProvider)     showToast('Switched to Tanix Quality','provider');
  updateModelBadgeStyle();
  renderModelDropdown();
}

function updateModelBadgeStyle(){
  const mb=document.getElementById('modelBadge');
  const mn=document.getElementById('modelName');
  if(!mb||!mn) return;
  const modelNames={groq:'Tanix Fast',openrouter:'Tanix Reasoning',gemini:'Tanix Quality'};
  const p=forcedProvider||currentProvider;
  mn.textContent=modelNames[p]||p;
  if(document.getElementById('modelDropdown')?.classList.contains('open')) mb.classList.add('dd-open');
}

/* ── MODEL DROPDOWN ── */
function toggleModelDropdown(e){
  e&&e.stopPropagation();
  const dd=document.getElementById('modelDropdown');
  const badge=document.getElementById('modelBadge');
  const isOpen=dd.classList.contains('open');
  if(isOpen){ closeModelDropdown(); return; }
  renderModelDropdown();
  dd.classList.add('open');
  badge.classList.add('dd-open');
}
function closeModelDropdown(){
  document.getElementById('modelDropdown')?.classList.remove('open');
  document.getElementById('modelBadge')?.classList.remove('dd-open');
}

function renderModelDropdown(){
  const dd=document.getElementById('modelDropdown');
  if(!dd) return;
  const active=forcedProvider||currentProvider;
  const anyExhausted=exhaustedProviders.size>0;

  let html='<div class="mdd-header">Select Model</div>';
  MODELS.forEach(m=>{
    const isExhausted=exhaustedProviders.has(m.id);
    const isActive=m.id===active;
    const cls='model-option'+(isActive?' active':'')+(isExhausted?' exhausted':'');
    const dotCls='mo-dot '+(isExhausted?'limited':'ok');
    const tag=isExhausted?'<span class="mo-limit-tag">Rate limited</span>':'';
    const tick=isActive?'✓':'';
    html+=`<div class="${cls}" onclick="selectModel('${m.id}')">
      <div class="${dotCls}"></div>
      <div>
        <div class="mo-name">${m.icon} ${m.name}</div>
        <div class="mo-sub">${m.sub}</div>
      </div>
      ${tag}
      <span class="mo-active-tick">${tick}</span>
    </div>`;
  });
  html+=`<button class="mdd-reset${anyExhausted?' show':''}" onclick="resetExhausted()">Reset rate limits</button>`;
  dd.innerHTML=html;
}

function selectModel(provider){
  if(exhaustedProviders.has(provider)){
    const name=MODELS.find(m=>m.id===provider)?.name||provider;
    showToast(name+' has hit its rate limit','warn');
    return;
  }
  forcedProvider=provider;
  currentProvider=provider;
  updateModelBadgeStyle();
  renderModelDropdown();
  closeModelDropdown();
  const name=MODELS.find(m=>m.id===provider)?.name||provider;
  showToast('Switched to '+name,'success');
}

function resetExhausted(){
  exhaustedProviders.clear();
  renderModelDropdown();
  updateModelBadgeStyle();
  showToast('Rate limits reset — all models available','success');
  closeModelDropdown();
}

document.addEventListener('click',e=>{
  if(!document.getElementById('modelSwitcher')?.contains(e.target)){
    closeModelDropdown();
  }
});

async function callAPI(text,b64,mime){
  const all=['groq','openrouter','gemini'];
  const order=forcedProvider
    ?[forcedProvider,...all.filter(p=>p!==forcedProvider)]
    :all;

  let lastErr=null;
  for(const provider of order){
    if(exhaustedProviders.has(provider)) continue;
    try{
      let r;
      if(provider==='gemini')     r=await callGemini(text,b64,mime);
      else if(provider==='groq')  r=await callGroq(text);
      else                        r=await callOpenRouter(text);
      currentProvider=provider;
      if(forcedProvider&&provider!==forcedProvider){ forcedProvider=null; }
      showProviderBadge(provider);
      return r;
    }catch(e){
      if(isRateLimitError(e)||e.message.includes('401')){
        markExhausted(provider);
        if(provider===forcedProvider){
          const name=MODELS.find(m=>m.id===provider)?.name||provider;
          showToast(name+' hit rate limit — switching','warn');
          forcedProvider=null;
        }
        lastErr=e; continue;
      }
      throw e;
    }
  }
  throw new Error(lastErr?.message||'All AI providers have hit their rate limits. Please wait and try again.');
}

function markExhausted(provider){
  exhaustedProviders.add(provider);
  renderModelDropdown();
  updateModelBadgeStyle();
}

/* ── GEMINI ── */
async function callGemini(text,b64,mime){
  const res=await fetch('/api/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({provider:'gemini',text,b64,mime,history,system:getSystem()})
  });
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||'Gemini HTTP '+res.status);}
  const data=await res.json();
  if(data.error)throw new Error(data.error);
  return data.result||'(No response received)';
}

/* ── GROQ ── */
async function callGroq(text){
  const res=await fetch('/api/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({provider:'groq',text,history,system:getSystem(),model:'llama-3.1-8b-instant'})
  });
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||'Groq HTTP '+res.status);}
  const data=await res.json();
  if(data.error)throw new Error(data.error);
  return data.result||'(No response)';
}

/* ── OPENROUTER ── */
async function callOpenRouter(text){
  const res=await fetch('/api/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({provider:'openrouter',text,history,system:getSystem(),model:'nvidia/nemotron-3-nano-30b-a3b:free'})
  });
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||'OpenRouter HTTP '+res.status);}
  const data=await res.json();
  if(data.error)throw new Error(data.error);
  return data.result||'(No response)';
}

/* ═══════════════════════════════════════════
   RENDER BUBBLES
   ═══════════════════════════════════════════ */
function addBubble(role,text,imgSrc,pdfName,genImgPrompt,skipTypewriter,textFileName){
  const chat=document.getElementById('chat');
  const isUser=role==='user';
  const wrap=document.createElement('div'); wrap.className='msg '+role;
  const av=document.createElement('div'); av.className='msg-av'; av.textContent=isUser?'YOU':'TX';
  const body=document.createElement('div'); body.className='msg-body';
  const bub=document.createElement('div'); bub.className='bubble';

  if(isUser){
    if(pdfName){
      const pill=document.createElement('div'); pill.className='pdf-pill';
      pill.innerHTML='<span></span><span>'+pdfName+'</span>';
      bub.appendChild(pill);
    }
    if(textFileName){
      const pill=document.createElement('div'); pill.className='pdf-pill';
      pill.innerHTML='<span></span><span>'+textFileName+'</span>';
      bub.appendChild(pill);
    }
    if(imgSrc){const img=document.createElement('img');img.src=imgSrc;img.alt='uploaded';bub.appendChild(img);}
    if(text){const p=document.createElement('p');p.style.marginTop=(imgSrc||pdfName||textFileName)?'8px':'0';p.textContent=text;bub.appendChild(p);}
  } else {
    const rendered = fmt(text||'');
    if(skipTypewriter){
      bub.innerHTML = rendered;
      appendGenImg(bub, genImgPrompt);
    } else {
      const temp=document.createElement('div'); temp.innerHTML=rendered;
      const fullText=temp.textContent||'';
      const cursor=document.createElement('span'); cursor.className='typing-cursor';
      bub.appendChild(cursor);
      let i=0;
      const speed = Math.max(1, Math.floor(fullText.length / 80));
      const iv=setInterval(()=>{
        if(i>=fullText.length){
          clearInterval(iv);
          bub.innerHTML=rendered;
          appendGenImg(bub,genImgPrompt);
          return;
        }
        i+=speed;
        bub.textContent=fullText.slice(0,i);
        bub.appendChild(cursor);
        chat.scrollTop=chat.scrollHeight;
      },12);
    }
  }

  const acts=document.createElement('div'); acts.className='msg-acts';
  const cp=document.createElement('button'); cp.className='act-btn'; cp.textContent='Copy';
  cp.onclick=()=>{
    navigator.clipboard.writeText(text||'').then(()=>{
      cp.textContent='Copied'; setTimeout(()=>{cp.textContent='Copy';},1500);
    });
  };
  acts.appendChild(cp);
  if(isUser){
    const ed=document.createElement('button'); ed.className='act-btn edit-msg-btn'; ed.textContent='Edit';
    ed.onclick=()=>editMessage(wrap, text);
    acts.appendChild(ed);
    const dl=document.createElement('button'); dl.className='act-btn del-msg-btn'; dl.textContent='Delete';
    dl.onclick=()=>{
      const allMsgs=Array.from(document.querySelectorAll('#chat .msg'));
      const idx=allMsgs.indexOf(wrap);
      if(idx<0)return;
      // Remove this message and the AI reply after it (if exists)
      const toRemove=[wrap];
      if(allMsgs[idx+1]&&allMsgs[idx+1].classList.contains('ai')) toRemove.push(allMsgs[idx+1]);
      toRemove.forEach(m=>m.remove());
      history=history.filter((_,i)=>i!==idx&&i!==idx+1);
      saveChatToHistory();
      showToast('Message deleted','warn',2000);
    };
    acts.appendChild(dl);
  }
  if(!isUser){
    const rg=document.createElement('button'); rg.className='act-btn regen-btn'; rg.textContent='Regenerate';
    rg.onclick=()=>regenerate(wrap,text);
    acts.appendChild(rg);
    const dl=document.createElement('button'); dl.className='act-btn del-msg-btn'; dl.textContent='Delete';
    dl.onclick=()=>{
      const allMsgs=Array.from(document.querySelectorAll('#chat .msg'));
      const idx=allMsgs.indexOf(wrap);
      wrap.remove();
      if(idx>=0) history=history.filter((_,i)=>i!==idx);
      saveChatToHistory();
      showToast('Message deleted','warn',2000);
    };
    acts.appendChild(dl);
  }

  const ts=document.createElement('div'); ts.className='msg-time';
  ts.textContent=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});

  body.appendChild(bub); body.appendChild(acts); body.appendChild(ts);
  wrap.appendChild(av); wrap.appendChild(body);
  chat.appendChild(wrap); chat.scrollTop=chat.scrollHeight;
  return wrap;
}

function appendGenImg(bub, genImgPrompt){
  if(!genImgPrompt) return;
  const gw=document.createElement('div'); gw.className='gen-wrap';
  const gl=document.createElement('div'); gl.className='gen-lbl'; gl.textContent='generated image';
  const gi=document.createElement('img'); gi.alt='generated';
  gi.src=buildImgUrl(genImgPrompt);
  gi.style.cssText='opacity:0;transition:opacity .6s ease;';
  gi.onload=()=>{gi.style.opacity='1';};
  gi.onerror=()=>{gl.textContent='Image generation failed';};
  gw.appendChild(gl); gw.appendChild(gi); bub.appendChild(gw);
}

async function regenerate(wrap, lastUserText){
  if(busy) return;
  wrap.remove();
  history = history.filter(m=>m.role!=='model'||history.indexOf(m)<history.length-1);
  const typing=addTyping(); busy=true;
  document.getElementById('sbtn').disabled=true;
  try{
    const reply=await callAPI(lastUserText,null,null);
    typing.remove();
    history.push({role:'model',text:reply});
    addBubble('ai',reply);
    saveChatToHistory();
  }catch(e){
    typing.remove(); addBubble('ai','Error: '+e.message);
  }finally{
    busy=false; lastSendTime=Date.now(); startCooldown();
  }
}

function addTyping(){
  const chat=document.getElementById('chat');
  const w=document.createElement('div'); w.className='msg ai';
  w.innerHTML=`<div class="msg-av">TX</div><div class="msg-body"><div class="bubble"><div class="typing"><span class="typing-text">Thinking</span><div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div></div></div>`;
  chat.appendChild(w); chat.scrollTop=chat.scrollHeight; return w;
}

function fmt(t){
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/```([\s\S]*?)```/g,'<pre><code>$1</code></pre>')
    .replace(/`([^`\n]+)`/g,'<code>$1</code>')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>')
    .replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/^---$/gm,'<hr>')
    .replace(/^\* (.+)$/gm,'<li>$1</li>')
    .replace(/^- (.+)$/gm,'<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm,'<li>$1. $2</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, m=>'<ul>'+m+'</ul>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/\n/g,'<br>');
}

/* ═══════════════════════════════════════════
   CLEAR
   ═══════════════════════════════════════════ */
function clearChat(){
  history=[];
  currentChatId=null;
  document.getElementById('chat').innerHTML='';
  renderWelcome();
}

/* ═══════════════════════════════════════════
   THEMES
   ═══════════════════════════════════════════ */
const COLOR_THEMES = {
  default: {
    label: 'Void', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #e8a849, #d4883a, #c06828)',
    accent: '#e8a849', accentD: 'rgba(232,168,73,0.12)', accentG: 'rgba(232,168,73,0.25)', accentB: '#f5c77e',
    userBg: 'rgba(232,168,73,0.06)', userBorder: 'rgba(232,168,73,0.18)',
    bg: null,
  },
  green: {
    label: 'Emerald', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #00c853, #00e676, #69f0ae)',
    accent: '#49e87a', accentD: 'rgba(73,232,122,0.12)', accentG: 'rgba(73,232,122,0.25)', accentB: '#7ef5a8',
    userBg: 'rgba(73,232,122,0.06)', userBorder: 'rgba(73,232,122,0.18)',
    bg: 'linear-gradient(135deg, #040e08 0%, #081c0e 50%, #050f06 100%)',
  },
  blue: {
    label: 'Ocean', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #1565c0, #42a5f5, #80d8ff)',
    accent: '#49a8e8', accentD: 'rgba(73,168,232,0.12)', accentG: 'rgba(73,168,232,0.25)', accentB: '#7ec5f5',
    userBg: 'rgba(73,168,232,0.06)', userBorder: 'rgba(73,168,232,0.18)',
    bg: 'linear-gradient(135deg, #020810 0%, #051428 50%, #020a1a 100%)',
  },
  red: {
    label: 'Crimson', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #b71c1c, #e53935, #ff8a80)',
    accent: '#e85555', accentD: 'rgba(232,85,85,0.12)', accentG: 'rgba(232,85,85,0.25)', accentB: '#f57e7e',
    userBg: 'rgba(232,85,85,0.06)', userBorder: 'rgba(232,85,85,0.18)',
    bg: 'linear-gradient(135deg, #0f0305 0%, #220508 50%, #150305 100%)',
  },
  purple: {
    label: 'Violet', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #6a1b9a, #ab47bc, #e040fb)',
    accent: '#b478ff', accentD: 'rgba(180,120,255,0.12)', accentG: 'rgba(180,120,255,0.25)', accentB: '#d0a8ff',
    userBg: 'rgba(180,120,255,0.06)', userBorder: 'rgba(180,120,255,0.18)',
    bg: 'linear-gradient(135deg, #07040f 0%, #130828 50%, #090514 100%)',
  },
  orange: {
    label: 'Amber', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #e65100, #ff6d00, #ffab40)',
    accent: '#ff8a3c', accentD: 'rgba(255,138,60,0.12)', accentG: 'rgba(255,138,60,0.25)', accentB: '#ffab6e',
    userBg: 'rgba(255,138,60,0.06)', userBorder: 'rgba(255,138,60,0.18)',
    bg: 'linear-gradient(135deg, #0f0702 0%, #281205 50%, #160901 100%)',
  },
  yellow: {
    label: 'Golden', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #f9a825, #ffee58, #fff9c4)',
    accent: '#e8d449', accentD: 'rgba(232,212,73,0.12)', accentG: 'rgba(232,212,73,0.25)', accentB: '#f5ea7e',
    userBg: 'rgba(232,212,73,0.06)', userBorder: 'rgba(232,212,73,0.18)',
    bg: 'linear-gradient(135deg, #0f0f02 0%, #1e1a01 50%, #100f01 100%)',
  },
  rose: {
    label: 'Rose', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #880e4f, #e91e8c, #f48fb1)',
    accent: '#f06292', accentD: 'rgba(240,98,146,0.12)', accentG: 'rgba(240,98,146,0.25)', accentB: '#f8a5c4',
    userBg: 'rgba(240,98,146,0.06)', userBorder: 'rgba(240,98,146,0.22)',
    bg: 'linear-gradient(135deg, #0f0208 0%, #220512 50%, #150309 100%)',
  },
  teal: {
    label: 'Teal', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #004d40, #00bfa5, #64ffda)',
    accent: '#1de9b6', accentD: 'rgba(29,233,182,0.12)', accentG: 'rgba(29,233,182,0.25)', accentB: '#6effd9',
    userBg: 'rgba(29,233,182,0.06)', userBorder: 'rgba(29,233,182,0.18)',
    bg: 'linear-gradient(135deg, #020f0c 0%, #041e18 50%, #030f0d 100%)',
  },
  neon: {
    label: 'Neon', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #0d0d0d, #39ff14, #00f5ff)',
    accent: '#39ff14', accentD: 'rgba(57,255,20,0.12)', accentG: 'rgba(57,255,20,0.22)', accentB: '#80ff55',
    userBg: 'rgba(57,255,20,0.05)', userBorder: 'rgba(57,255,20,0.20)',
    bg: 'linear-gradient(135deg, #010801 0%, #001a00 50%, #010a01 100%)',
  },
  sunset: {
    label: 'Sunset', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #b71c1c, #ff6f00, #ffd600)',
    accent: '#ff7043', accentD: 'rgba(255,112,67,0.12)', accentG: 'rgba(255,112,67,0.25)', accentB: '#ff9e80',
    userBg: 'rgba(255,112,67,0.06)', userBorder: 'rgba(255,112,67,0.20)',
    bg: 'linear-gradient(135deg, #100402 0%, #1f0a00 50%, #140600 100%)',
  },
  ice: {
    label: 'Ice', emoji: '', video: false,
    swatchGradient: 'linear-gradient(135deg, #b3e5fc, #e0f7fa, #f8fbff)',
    accent: '#81d4fa', accentD: 'rgba(129,212,250,0.12)', accentG: 'rgba(129,212,250,0.22)', accentB: '#b3e5fc',
    userBg: 'rgba(129,212,250,0.06)', userBorder: 'rgba(129,212,250,0.18)',
    bg: 'linear-gradient(135deg, #02080f 0%, #041528 50%, #020b1a 100%)',
  },
};
let currentTheme = localStorage.getItem('tanix_theme') || 'default';

function applyTheme(key) {
  const theme = COLOR_THEMES[key] || COLOR_THEMES.default;
  const root = document.documentElement;
  root.style.setProperty('--accent',      theme.accent);
  root.style.setProperty('--accent-d',    theme.accentD);
  root.style.setProperty('--accent-g',    theme.accentG);
  root.style.setProperty('--accent-b',    theme.accentB);
  root.style.setProperty('--user-bg',     theme.userBg);
  root.style.setProperty('--user-border', theme.userBorder);

  const video = document.getElementById('bg-video');
  if(theme.video) {
    if(video) video.style.display = '';
    document.body.style.background = '';
  } else {
    if(video) video.style.display = 'none';
    document.body.style.background = theme.bg || '';
  }

  // Update ambient mesh
  const mesh = document.getElementById('ambient-mesh');
  if(mesh && theme.accentG) {
    mesh.style.background = `
      radial-gradient(ellipse 80% 60% at 20% 80%, ${theme.accentG} 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(100,60,180,0.05) 0%, transparent 70%),
      radial-gradient(ellipse 70% 70% at 50% 50%, rgba(40,80,160,0.04) 0%, transparent 60%),
      var(--void)`;
  }

  localStorage.setItem('tanix_theme', key);
  currentTheme = key;
  const panel = document.getElementById('menuPersonal');
  if(panel && !panel.classList.contains('hidden')) renderPersonalization();
}

/* ═══════════════════════════════════════════
   UPDATES + PERSONALIZATION
   ═══════════════════════════════════════════ */
const UPDATES = [
  {
    version: 'v0.4', title: 'Power User Update',
    date: 'May 6, 2026', time: '12:00 PM IST',
    current: true,
    items: [
      'AI disclaimer added below the chat input',
      'Pin chats to the top of your history',
      'Delete any single message from a conversation',
      '5 new themes — Rose, Teal, Neon, Sunset, Ice',
      'History shows pinned section separately',
    ]
  },
  {
    version: 'v0.3', title: 'Cinematic Redesign',
    date: 'April 30, 2026', time: '10:00 PM IST',
    current: false,
    items: [
      'Complete UI overhaul — cinematic & immersive design',
      'Custom cursor with ambient glow tracking',
      'Particle field background with connecting lines',
      'Film grain overlay + vignette for atmosphere',
      'Cinematic intro sequence with letterbox animation',
      'Animated ambient mesh background',
      'Refined message animations with stagger',
      'Streamlined minimal top bar',
      'Side action buttons with hover glide',
      'Theme system rebuilt for new design — 7 palettes',
    ]
  },
  {
    version: 'v0.2', title: 'Feature Update',
    date: 'April 29, 2026', time: '08:30 PM IST',
    current: false,
    items: [
      'Menu panel with Recent Updates & Personalization',
      'Color theme personalization — 6 themes',
      'Edit sent messages & re-send',
      'Version tag (v0.2) added to header',
      'Delete all chats at once from history',
      'Search inside chat history',
    ]
  },
  {
    version: 'v0.1', title: 'Initial Launch',
    date: 'April 26, 2026', time: '09:00 AM IST',
    current: false,
    items: [
      '3-model AI fallback chain (Gemini, Groq, OpenRouter)',
      'Pollinations AI image generation',
      'Voice input via Web Speech API',
      'File uploads — PDF, image, TXT, CSV, DOCX',
      'Glassmorphism UI with video background',
      'Portfolio Mode & Mumbai Student Mode',
      'English / Hindi language toggle',
      'Tone selector — formal, casual, funny, concise',
      'Chat history saved to localStorage',
      'Message copy & AI response regeneration',
      'Model switcher — Fast / Reasoning / Quality',
      'In-chat search with Ctrl+F',
      'Typewriter effect for AI responses',
      'Toast notification system',
    ]
  },
];

function renderUpdates() {
  const el = document.getElementById('menuUpdates');
  if(!el) return;
  el.innerHTML = UPDATES.map((u, i) => `
    <div class="update-card${u.current?' current':''}" id="ucard-${i}">
      <div class="update-card-head" onclick="toggleUpdateCard(${i})" style="cursor:pointer;user-select:none;">
        <div>
          <div class="update-version">${u.version}${u.current?' — CURRENT':''}</div>
          <div class="update-label">${u.title}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <div class="update-ts">${u.date}<br>${u.time}</div>
          <svg class="update-chevron" id="uchev-${i}" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);transition:transform .3s var(--ease);transform:rotate(0deg)">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div class="update-items" id="uitems-${i}" style="display:flex;">
        ${u.items.map(it=>`<div class="update-item">${it}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function toggleUpdateCard(i) {
  const items = document.getElementById('uitems-'+i);
  const chev  = document.getElementById('uchev-'+i);
  if(!items) return;
  const open = items.style.display !== 'none';
  items.style.display = open ? 'none' : 'flex';
  if(chev) chev.style.transform = open ? 'rotate(-90deg)' : 'rotate(0deg)';
}

function renderPersonalization() {
  const el = document.getElementById('menuPersonal');
  if(!el) return;
  el.innerHTML = `
    <div class="personal-section-label">Color Theme</div>
    <p class="personal-note">Choose an accent color for the interface.</p>
    <div class="theme-grid">
      ${Object.entries(COLOR_THEMES).map(([key, t]) => `
        <button class="theme-swatch${currentTheme===key?' active':''}" onclick="applyTheme('${key}');renderPersonalization()">
          <div class="swatch-circle" style="background:${t.swatchGradient};">
            <span class="swatch-tick"></span>
          </div>
          <span class="swatch-label">${t.label}</span>
        </button>
      `).join('')}
    </div>
  `;
}

/* ── MENU PANEL ── */
function toggleMenuPanel(force) {
  const panel = document.getElementById('menuDrawer');
  const overlay = document.getElementById('drawer-overlay');
  const isOpen = panel.classList.contains('open');
  const open = force === undefined ? !isOpen : force;
  panel.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  if(open) {
    renderUpdates();
    renderPersonalization();
    switchMenuTab('updates');
  }
}

function switchMenuTab(tab) {
  const updEl = document.getElementById('menuUpdates');
  const perEl = document.getElementById('menuPersonal');
  const tabU  = document.getElementById('tabUpdates');
  const tabP  = document.getElementById('tabPersonal');
  if(tab === 'updates') {
    updEl.classList.remove('hidden');
    perEl.classList.add('hidden');
    tabU.classList.add('on');
    tabP.classList.remove('on');
    renderUpdates();
  } else {
    perEl.classList.remove('hidden');
    updEl.classList.add('hidden');
    tabP.classList.add('on');
    tabU.classList.remove('on');
    renderPersonalization();
  }
}

document.addEventListener('click', e => {
  const drawer = document.getElementById('menuDrawer');
  const sidebar = document.querySelector('#left-dock');
  if(drawer && drawer.classList.contains('open')) {
    if(!drawer.contains(e.target) && !sidebar?.contains(e.target)) {
      toggleMenuPanel(false);
    }
  }
});

/* ── EDIT MESSAGE ── */
function editMessage(wrap, originalText) {
  const allMsgs = Array.from(document.querySelectorAll('#chat .msg'));
  const idx = allMsgs.indexOf(wrap);
  if(idx < 0) return;
  allMsgs.slice(idx).forEach(m => m.remove());
  history = history.slice(0, idx);
  const txt = document.getElementById('txt');
  txt.value = originalText || '';
  onInput(txt);
  txt.focus();
  txt.selectionStart = txt.selectionEnd = txt.value.length;
  lastSendTime = 0;
  if(cooldownTimer) { clearInterval(cooldownTimer); cooldownTimer = null; }
  if(!busy) document.getElementById('sbtn').disabled = false;
  const hint = document.getElementById('coolHint');
  if(hint) hint.textContent = 'Enter send · Shift+Enter new line · Ctrl+F search';
  showToast('Message ready to edit','success', 2000);
}

/* ── DELETE ALL CHATS ── */
function deleteAllChats() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('chat_'));
  if(!keys.length) { showToast('No chats to delete','warn'); return; }
  if(!confirm('Delete all '+keys.length+' saved chat(s)? This cannot be undone.')) return;
  keys.forEach(k => localStorage.removeItem(k));
  currentChatId = null;
  history = [];
  document.getElementById('chat').innerHTML = '';
  renderWelcome();
  loadHistoryList();
  showToast('All chats deleted','warn');
}

/* ── HISTORY SEARCH ── */
function onHistSearch(val) {
  const q = (val || '').toLowerCase().trim();
  const items = document.querySelectorAll('#histPanel .hist-item');
  let visible = 0;
  items.forEach(item => {
    const title = (item.querySelector('.hist-title')?.textContent || '').toLowerCase();
    const show = !q || title.includes(q);
    item.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  let noRes = document.getElementById('histNoResults');
  if(q && visible === 0) {
    if(!noRes) {
      noRes = document.createElement('div');
      noRes.id = 'histNoResults';
      noRes.className = 'drawer-empty';
      noRes.textContent = 'No chats match "' + val + '"';
      document.getElementById('histPanel').appendChild(noRes);
    } else {
      noRes.textContent = 'No chats match "' + val + '"';
      noRes.style.display = '';
    }
  } else if(noRes) {
    noRes.style.display = 'none';
  }
}

/* ── THEME INIT ── */
(function initTheme() {
  const saved = localStorage.getItem('tanix_theme') || 'default';
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyTheme(saved));
  } else {
    applyTheme(saved);
  }
})();
