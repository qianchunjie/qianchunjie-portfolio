const projects={
  policy:{index:'01',type:'AI PRODUCT · ZTE · 2026',title:'39 城政策监控 AI 产品',summary:'面向政策变动依赖人工监测、覆盖不稳定且响应滞后的问题，从零搭建自动化政策监控产品。',problem:'政策来源分散、表达差异大，单次搜索难以同时保证召回覆盖与变动判断质量；传统流程需要人工逐城检索和比对。',work:'主导算法策略与产品落地，设计“双层搜索召回 + 变动评估”，引入 Coverage-driven 补搜机制，并结合 Co-Claw 完成 Skill 部署。',result:'产出周期由天级缩短至分钟级，直接支撑运营团队效率提升 90%。'},
  gui:{index:'02',type:'MULTIMODAL AGENT · 2026',title:'移动端多模态 GUI Agent',summary:'让智能体理解自然语言指令，通过视觉感知自主操作 Android 真机，完成跨应用、多步骤任务。',problem:'移动端页面动态性强，模型容易出现动作无效、历史信息丢失、循环操作及完成状态误判。',work:'基于 Python、VLM、ReAct 与 ADB 打通感知—决策—执行闭环；设计滑动窗口历史与键值化置顶记忆，并加入重试、动作校验、页面变化检测、防循环与分级 Fallback。',result:'支持搜索、电商、影音、地图出行和跨 App 协作等场景，显著提升复杂动态页面下的执行稳定性。'},
  pinn:{index:'03',type:'PHYSICS-INFORMED AI · 2025',title:'锂电池热参数反演与实时监控',summary:'面向 BMS 内部温度难以直接测量的问题，用物理信息神经网络实现热参数辨识与温度场重构。',problem:'传统仿真计算成本高，而电池内部关键温度无法被传感器直接、完整地观测。',work:'基于 PyTorch 构建 PINN，将稀疏观测与热传导 PDE 约束联合训练，并把热扩散系数设置为可训练参数；封装 Web 可视化平台。',result:'热参数反演误差 <1%，内部温度重构误差 <2%，实现毫秒级推理。'},
  bearing:{index:'04',type:'TRANSFER LEARNING · 2025',title:'高铁列车轴承智能故障诊断',summary:'面向高速列车轴承故障样本稀缺、域分布差异与强噪声问题，实现试验台到实车场景的跨域诊断。',problem:'实验数据与真实运行数据存在明显域偏移，模型在源域上的高准确率难以直接迁移到实际场景。',work:'构建多维度特征提取、CORAL 迁移学习、随机森林分类与 SHAP 可解释分析框架，完成模型对比与消融优化。',result:'故障分类准确率 98.8%，跨域诊断准确率 95%，域偏移降低 44.89%。'},
  sparse:{index:'05',type:'SCIENTIFIC AI · 2025—2026',title:'高维稀疏 PINN 求解方法',summary:'探索稀疏网格与物理信息神经网络结合的高维方程求解方法，缓解传统全网格节点随维度指数增长的问题。',problem:'PINN 求解高维积分微分方程时，传统全张量积积分规则带来严重的维数灾难与计算开销。',work:'引入 Smolyak 稀疏网格与 Kronrod-Patterson 嵌套积分规则，设计积分算子模块，并集成到 PyTorch PINN 框架中。',result:'在二维、四维时空积分微分方程上完成验证；节点数减少约 1—2 个数量级，求解时间缩短 40%—74%。'}
};
const body=document.body, header=document.querySelector('.site-header'), menuBtn=document.querySelector('.menu-toggle'), menu=document.querySelector('.mobile-menu');
document.getElementById('year').textContent=new Date().getFullYear();
const themeBtn=document.querySelector('.theme-toggle');
const applyTheme=light=>{body.classList.toggle('light',light);themeBtn.setAttribute('aria-pressed',String(light));document.getElementById('theme-color').setAttribute('content',light?'#f3f5f0':'#081211');localStorage.setItem('q-theme',light?'light':'dark')};
applyTheme(localStorage.getItem('q-theme')==='light');
themeBtn.addEventListener('click',()=>applyTheme(!body.classList.contains('light')));
menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open);body.style.overflow=open?'hidden':''});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');body.style.overflow=''}));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const sections=[...document.querySelectorAll('main section[id]')],navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -60%'});sections.forEach(s=>sectionObserver.observe(s));
const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=Number(el.dataset.count),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'',start=performance.now(),duration=1100;const tick=now=>{const p=Math.min((now-start)/duration,1),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=prefix+v+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.8});document.querySelectorAll('[data-count]').forEach(el=>{el.textContent=(el.dataset.prefix||'')+'0'+(el.dataset.suffix||'');counterObserver.observe(el)});
const glow=document.querySelector('.pointer-glow'),cursorDot=document.querySelector('.cursor-dot');
if(cursorDot&&matchMedia('(hover:hover) and (pointer:fine)').matches){let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,gx=tx,gy=ty,ra=null;const follow=()=>{x+=(tx-x)*.32;y+=(ty-y)*.32;gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;cursorDot.style.left=x+'px';cursorDot.style.top=y+'px';if(glow){glow.style.left=gx+'px';glow.style.top=gy+'px'}if(Math.abs(tx-x)>.5||Math.abs(ty-y)>.5||Math.abs(tx-gx)>.5||Math.abs(ty-gy)>.5){ra=requestAnimationFrame(follow)}else{ra=null}};window.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursorDot.classList.add('on');if(!ra)ra=requestAnimationFrame(follow)},{passive:true});window.addEventListener('pointerdown',()=>cursorDot.classList.add('pressing'),{passive:true});window.addEventListener('pointerup',()=>cursorDot.classList.remove('pressing'),{passive:true});const HOVER='a,button,input,textarea,label,[data-project],.github-strip,.more-work article,.chat-project-card';document.addEventListener('mouseover',e=>{document.body.classList.toggle('cursor-active',!!(e.target.closest&&e.target.closest(HOVER)))},{passive:true})}
const dialog=document.querySelector('.project-dialog'),dialogClose=dialog.querySelector('.dialog-close');let lastTrigger=null;
function openProject(key){const p=projects[key];dialog.querySelector('.dialog-index').textContent=p.index;dialog.querySelector('.dialog-type').textContent=p.type;dialog.querySelector('#dialog-title').textContent=p.title;dialog.querySelector('.dialog-summary').textContent=p.summary;dialog.querySelector('.dialog-problem').textContent=p.problem;dialog.querySelector('.dialog-work').textContent=p.work;dialog.querySelector('.dialog-result').textContent='成果：'+p.result;dialog.showModal();dialogClose.focus()}
function closeProject(){dialog.close();if(lastTrigger)lastTrigger.focus()}
document.querySelectorAll('[data-project]').forEach(card=>{card.addEventListener('click',e=>{if(e.target.closest('a'))return;lastTrigger=card;openProject(card.dataset.project)});card.addEventListener('keydown',e=>{if(e.key==='Enter'){lastTrigger=card;openProject(card.dataset.project)}})});
dialogClose.addEventListener('click',closeProject);dialog.addEventListener('click',e=>{if(e.target===dialog)closeProject()});
const progress=document.querySelector('.scroll-progress'),toTop=document.querySelector('.back-to-top');
const onScroll=()=>{const h=document.documentElement,sc=h.scrollTop,max=h.scrollHeight-h.clientHeight;if(progress)progress.style.setProperty('--p',(max>0?sc/max:0).toFixed(4));if(toTop)toTop.classList.toggle('visible',sc>600)};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(toTop)toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const typedEl=document.getElementById('hero-typed');
if(typedEl&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.documentElement.classList.add('typing');
  const words=['做成真正好用的产品。','变成真正可用的智能体。','转化为可衡量的业务价值。'];
  let wi=0,ci=0,del=false;
  const typeTick=()=>{const w=words[wi];ci=del?ci-1:ci+1;typedEl.textContent=w.slice(0,ci);let delay=del?40:95;if(!del&&ci===w.length){delay=1900;del=true}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;delay=320}setTimeout(typeTick,delay)};
  typeTick();
}

// —— AI 助手（真 LLM，由部署后的 /api/chat 后端驱动）——
const chatLaunch=document.querySelector('.chat-launch'),chatPanel=document.querySelector('.chat-panel'),chatBody=document.querySelector('.chat-body'),chatForm=document.querySelector('.chat-form'),chatInput=document.querySelector('#chat-input'),chatClose=document.querySelector('.chat-close');
const chatHistory=[];let sending=false;
function addMsg(role,text,html){const row=document.createElement('div');row.className='chat-msg '+(role==='assistant'?'ai':'user');const b=document.createElement('div');b.className='chat-bubble';if(html){b.innerHTML=text}else{b.textContent=text}row.appendChild(b);chatBody.appendChild(row);chatBody.scrollTop=chatBody.scrollHeight;return b}
function openChat(){chatPanel.classList.add('open');chatPanel.setAttribute('aria-hidden','false');chatLaunch.setAttribute('aria-expanded','true');chatLaunch.setAttribute('aria-label','关闭 AI 助手');chatInput.focus()}
function closeChat(){chatPanel.classList.remove('open');chatPanel.setAttribute('aria-hidden','true');chatLaunch.setAttribute('aria-expanded','false');chatLaunch.setAttribute('aria-label','打开 AI 助手');chatLaunch.focus()}
if(chatLaunch&&chatPanel){chatLaunch.addEventListener('click',()=>chatPanel.classList.contains('open')?closeChat():openChat());chatClose.addEventListener('click',closeChat);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&chatPanel.classList.contains('open'))closeChat()});addMsg('assistant','你好，我是钱春节的 AI 助手 👋 关于他的教育背景、项目经历、技能或联系方式，都可以问我。')}
async function sendChat(text){const q=(text||'').trim();if(!q||sending)return;sending=true;addMsg('user',q);chatHistory.push({role:'user',content:q});chatInput.value='';const typing=addMsg('assistant','<span class="typing-dots"><i></i><i></i><i></i></span>',true);let reply=null,errMsg=null,actions=[];
  try{const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:chatHistory})});const data=await res.json().catch(()=>({}));if(res.status===404||res.status===405){errMsg='AI 助手还没连上后端：把网页部署到 Vercel 并设置 DEEPSEEK_API_KEY 后即可开启。'}else if(!res.ok){errMsg=data.error||'AI 助手暂时无法回复，请稍后再试。'}else{reply=data.reply||'（暂无回复）';actions=Array.isArray(data.actions)?data.actions:[]}}
  catch(err){errMsg='AI 助手暂时无法回复，请稍后再试，或直接邮件联系我：18355220163@163.com。'}
  typing.remove();if(reply!==null){addMsg('assistant',reply);chatHistory.push({role:'assistant',content:reply});actions.forEach(runChatAction)}else{addMsg('assistant',errMsg)}sending=false;chatInput.focus()}
function runChatAction(a){if(a&&a.type==='show_projects'&&Array.isArray(a.projects))addProjectCards(a.projects)}
function addProjectCards(keys){const wrap=document.createElement('div');wrap.className='chat-projects';keys.forEach(k=>{const p=projects[k];if(!p)return;const card=document.createElement('button');card.type='button';card.className='chat-project-card';const idx=document.createElement('span');idx.className='cp-index';idx.textContent=p.index;const bd=document.createElement('div');bd.className='cp-body';const t=document.createElement('strong');t.textContent=p.title;const s=document.createElement('small');s.textContent=p.type;bd.append(t,s);card.append(idx,bd);card.addEventListener('click',()=>{lastTrigger=card;openProject(k)});wrap.appendChild(card)});if(wrap.children.length){chatBody.appendChild(wrap);chatBody.scrollTop=chatBody.scrollHeight}}
if(chatForm)chatForm.addEventListener('submit',e=>{e.preventDefault();sendChat(chatInput.value)});

// —— 联系表单（Formspree，无需后端）——
const contactForm=document.querySelector('.contact-form');
if(contactForm){contactForm.addEventListener('submit',async e=>{e.preventDefault();const action=contactForm.getAttribute('action'),status=contactForm.querySelector('.form-status');if(!action||action.indexOf('XXXXXXXX')>-1){status.className='form-status err';status.textContent='表单尚未配置：请在 Formspree 创建表单并把 ID 填入 form 的 action。';return}const btn=contactForm.querySelector('button[type="submit"]'),orig=btn.textContent;btn.disabled=true;btn.textContent='发送中…';
  try{const res=await fetch(action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(contactForm)});if(res.ok){status.className='form-status ok';status.textContent='已收到你的留言，我会尽快回复。';contactForm.reset()}else{throw 0}}
  catch(err){status.className='form-status err';status.textContent='发送失败，请直接邮件联系我：18355220163@163.com。'}
  btn.disabled=false;btn.textContent=orig})}