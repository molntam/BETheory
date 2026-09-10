(() => {
  const D = window.BETheoryData;
  const STORAGE_KEY = 'betheory.progress.v1';
  const defaults = {completedLessons:[],questionStats:{},mockHistory:[],lastStudyDate:null,streak:0,preferences:{readAloud:false,timedMock:true}};
  let state = loadState();
  let session = null;
  let timerId = null;
  let timeLeft = 15;

  function loadState(){
    try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'),preferences:{...defaults.preferences,...(JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}').preferences||{})}}}catch{return structuredClone(defaults)}
  }
  function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  function localDay(){return new Date().toLocaleDateString('en-CA')}
  function daysBetween(a,b){return Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/86400000)}
  function touchStudy(){
    const today=localDay();
    if(state.lastStudyDate!==today){
      if(!state.lastStudyDate) state.streak=1;
      else state.streak=daysBetween(state.lastStudyDate,today)===1?state.streak+1:1;
      state.lastStudyDate=today;saveState();
    }
  }
  function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function route(){return location.hash.slice(1)||'home'}
  function go(path){location.hash=path}
  function topicTitle(id){return D.lessons.find(l=>l.id===id)?.title||id.replaceAll('-',' ')}
  function lessonProgress(){return Math.round((state.completedLessons.length/D.lessons.length)*100)}
  function totalStats(){
    const vals=Object.values(state.questionStats);const seen=vals.reduce((n,s)=>n+(s.seen||0),0);const correct=vals.reduce((n,s)=>n+(s.correct||0),0);
    return {seen,correct,accuracy:seen?Math.round(correct/seen*100):0};
  }
  function readiness(){
    const q=totalStats();const lessonPart=lessonProgress();const practicePart=q.seen?Math.min(100,q.accuracy*.75+Math.min(q.seen,100)*.25):0;
    return Math.round(lessonPart*.4+practicePart*.6);
  }
  function updateQuestionStat(q,correct){
    const s=state.questionStats[q.id]||{seen:0,correct:0,wrong:0,last:null};s.seen++;correct?s.correct++:s.wrong++;s.last=Date.now();state.questionStats[q.id]=s;touchStudy();saveState();
  }

  function signSvg(sign){
    const circle=(inside,stroke='#e11d48',fill='white')=>`<svg viewBox="0 0 100 100" role="img" aria-label="${escapeHtml(sign.name)}"><circle cx="50" cy="50" r="41" fill="${fill}" stroke="${stroke}" stroke-width="9"/>${inside}</svg>`;
    if(sign.kind==='speed') return circle(`<text x="50" y="61" text-anchor="middle" font-size="34" font-family="Arial" font-weight="700" fill="#111">${sign.value}</text>`,'#e11d48');
    if(sign.kind==='yield') return `<svg viewBox="0 0 100 100" role="img" aria-label="Give way"><path d="M50 86 9 16h82z" fill="white" stroke="#e11d48" stroke-width="9" stroke-linejoin="round"/></svg>`;
    if(sign.kind==='stop') return `<svg viewBox="0 0 100 100" role="img" aria-label="Stop"><polygon points="31,7 69,7 93,31 93,69 69,93 31,93 7,69 7,31" fill="#d71920" stroke="white" stroke-width="3"/><text x="50" y="59" text-anchor="middle" font-size="26" font-family="Arial" font-weight="800" fill="white">STOP</text></svg>`;
    if(sign.kind==='priority') return `<svg viewBox="0 0 100 100" role="img" aria-label="Priority road"><rect x="20" y="20" width="60" height="60" rx="3" transform="rotate(45 50 50)" fill="white" stroke="#111" stroke-width="3"/><rect x="28" y="28" width="44" height="44" transform="rotate(45 50 50)" fill="#f7d117"/></svg>`;
    if(sign.kind==='roundabout') return circle(`<path d="M34 34a23 23 0 0 1 32-2l-7-1 4-10 16 17-22 4 4-8a15 15 0 0 0-20 4zM68 62a23 23 0 0 1-31 4l7 1-3 10-18-15 21-6-3 9a15 15 0 0 0 20-3z" fill="white"/>`,'white','#1f63b5');
    if(sign.kind==='noentry') return circle(`<rect x="27" y="45" width="46" height="10" rx="2" fill="white"/>`,'#d71920','#d71920');
    if(sign.kind==='noparking') return circle(`<path d="M25 75 75 25" stroke="#d71920" stroke-width="9"/>`,'#d71920','#1761ad');
    if(sign.kind==='nostopping') return circle(`<path d="M25 75 75 25M25 25l50 50" stroke="#d71920" stroke-width="8"/>`,'#d71920','#1761ad');
    if(sign.kind==='oneway') return `<svg viewBox="0 0 100 100" role="img" aria-label="One-way"><rect x="8" y="22" width="84" height="56" rx="6" fill="#1761ad"/><path d="M24 50h43M57 36l15 14-15 14" stroke="white" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    if(sign.kind==='pedestrian') return circle(`<circle cx="50" cy="30" r="7" fill="white"/><path d="M50 39v21m0-12-12 11m12-11 14 10M50 60 39 77m11-17 13 17" stroke="white" stroke-width="6" stroke-linecap="round"/>`,'white','#1761ad');
    if(sign.kind==='bike') return circle(`<circle cx="34" cy="65" r="12" fill="none" stroke="white" stroke-width="5"/><circle cx="68" cy="65" r="12" fill="none" stroke="white" stroke-width="5"/><path d="M34 65l12-24 9 24H34l19-13h15M45 41h13" stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>`,'white','#1761ad');
    if(sign.kind==='crossing') return `<svg viewBox="0 0 100 100" role="img" aria-label="Pedestrian crossing"><rect x="8" y="8" width="84" height="84" rx="5" fill="#1761ad"/><polygon points="50,17 84,79 16,79" fill="white"/><circle cx="50" cy="35" r="6" fill="#111"/><path d="M50 42v17m0-9-10 9m10-9 10 8M50 59 42 72m8-13 10 13" stroke="#111" stroke-width="5" stroke-linecap="round"/></svg>`;
    if(sign.kind==='motorway') return `<svg viewBox="0 0 100 100" role="img" aria-label="Motorway"><rect x="8" y="8" width="84" height="84" rx="5" fill="#1761ad"/><path d="M35 80 43 20m22 60-8-60M29 59h42M26 70h48" stroke="white" stroke-width="7" fill="none"/></svg>`;
    return '';
  }
  function signCard(id){const s=D.signs.find(x=>x.id===id);return s?`<div class="sign-card">${signSvg(s)}<strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.code)}</small></div>`:''}

  function shell(content,active='home'){
    return `<div class="app-shell"><header class="topbar"><div class="topbar-inner"><div class="brand" role="button" tabindex="0" data-go="home"><span class="flag"><i></i><i></i><i></i></span>BE Theory</div><nav class="nav" aria-label="Main navigation">${[['home','Home'],['learn','Learn'],['practice','Practice'],['mock','Mock test'],['signs','Signs'],['progress','Progress'],['sources','Sources']].map(([id,label])=>`<button data-go="${id}" class="${active===id?'active':''}">${label}</button>`).join('')}</nav></div></header><main>${content}</main><div class="footer-note">Independent study companion for the Flemish Category B theory exam. Not an official exam provider. Rules verified ${D.verified}; always check the linked official sources before your exam.</div></div>`
  }

  function homeView(){
    const ts=totalStats(),last=state.mockHistory[0],ready=readiness();
    return shell(`<section class="hero"><div class="hero-card"><div class="eyebrow"><span class="pill good">Flanders · Category B</span><span class="pill">English</span><span class="pill">Verified ${D.verified}</span></div><h1>Pass Belgian driving theory with confidence.</h1><p>Short lessons, exam-weighted practice, visual road signs and a realistic 50-question mock test. Your progress stays on this device.</p><div class="actions"><button class="btn" data-go="learn">Continue learning</button><button class="btn secondary" data-go="mock">Start mock test</button></div></div><aside class="hero-card exam-card"><div><h2>Your readiness</h2><div class="exam-grid"><div class="metric"><strong>${ready}%</strong><span>readiness estimate</span></div><div class="metric"><strong>${state.streak}</strong><span>day streak</span></div><div class="metric"><strong>${ts.accuracy}%</strong><span>practice accuracy</span></div><div class="metric"><strong>${last?last.score+'/50':'—'}</strong><span>last mock</span></div></div></div><div class="progress-bar" aria-label="Course progress"><span style="width:${ready}%"></span></div></aside></section>
      <div class="grid-3"><article class="card"><h3>Official-style scoring</h3><p>Start at 50. Normal mistakes cost 1. Maximum-speed and confirmed third/fourth-degree offence mistakes cost 5.</p></article><article class="card"><h3>Local memory</h3><p>No account or database. Lesson progress, weak questions, streaks and mock history are stored in your browser.</p></article><article class="card"><h3>Current rules only</h3><p>The new Code of the Public Road is scheduled for 1 June 2027. This course teaches the rules applicable before that date.</p></article></div>
      <div class="section-head"><div><h2 class="section-title">Pick up where you left off</h2><p>${state.completedLessons.length} of ${D.lessons.length} lessons completed</p></div><button class="ghost-btn" data-go="learn">View course</button></div><div class="grid-3">${D.lessons.slice(0,3).map(courseCard).join('')}</div>`, 'home');
  }

  function courseCard(l){const done=state.completedLessons.includes(l.id);return `<article class="card course-card"><div class="lesson-num">Lesson ${l.num} · ${l.minutes} min</div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.summary)}</p><footer><button class="btn secondary" data-go="lesson/${l.id}">${done?'Review':'Start lesson'}</button><span class="status-dot ${done?'done':''}" title="${done?'Completed':'Not completed'}"></span></footer></article>`}
  function learnView(){return shell(`<div class="section-head"><div><h1 class="section-title">Course</h1><p>Built around the current Flemish Category B exam and Belgian traffic rules.</p></div><span class="pill">${lessonProgress()}% complete</span></div><div class="progress-bar"><span style="width:${lessonProgress()}%"></span></div><div class="grid-3" style="margin-top:18px">${D.lessons.map(courseCard).join('')}</div>`,'learn')}

  function lessonView(id){
    const l=D.lessons.find(x=>x.id===id);if(!l)return notFound();
    const signs=l.signs?.length?`<div class="lesson-block"><h2>Visual memory</h2><div class="sign-row">${l.signs.map(signCard).join('')}</div></div>`:'';
    const blocks=l.blocks.map(b=>`<section class="lesson-block ${b.type==='key'?'key-rule':b.type==='danger'?'danger-rule':''}"><h2>${escapeHtml(b.title)}</h2><div>${b.html}</div></section>`).join('');
    const done=state.completedLessons.includes(l.id);
    return shell(`<article class="lesson"><div class="lesson-header"><button class="ghost-btn" data-go="learn">← Course</button><div class="eyebrow"><span class="pill">Lesson ${l.num}</span><span class="pill">${l.minutes} min</span></div><h1>${escapeHtml(l.title)}</h1><p>${escapeHtml(l.summary)}</p></div>${blocks}${signs}<div class="actions" style="margin-top:22px"><button class="btn" data-complete="${l.id}">${done?'Completed — practice again':'Mark complete & practice'}</button><button class="btn secondary" data-practice-topic="${l.id}">Practice this topic</button></div></article>`,'learn')
  }

  function practiceView(){
    const topicCards=D.lessons.filter(l=>D.questions.some(q=>q.topic===l.id)).map(l=>`<article class="card"><h3>${escapeHtml(l.title)}</h3><p>${D.questions.filter(q=>q.topic===l.id).length} questions</p><div class="actions" style="margin-top:16px"><button class="btn secondary" data-practice-topic="${l.id}">Practice 10</button></div></article>`).join('');
    return shell(`<div class="section-head"><div><h1 class="section-title">Practice</h1><p>Immediate explanations. Your mistakes automatically become your weak-question deck.</p></div></div><div class="grid-3"><article class="card"><h3>Mixed practice</h3><p>Ten questions across all topics.</p><div class="actions" style="margin-top:16px"><button class="btn" data-practice="mixed">Start mixed</button></div></article><article class="card"><h3>Weak questions</h3><p>Questions you have missed before are prioritised.</p><div class="actions" style="margin-top:16px"><button class="btn secondary" data-practice="weak">Train weak areas</button></div></article><article class="card"><h3>Speed danger deck</h3><p>Drill the questions where one wrong answer can cost five points.</p><div class="actions" style="margin-top:16px"><button class="btn secondary" data-practice-topic="speed">Practice speed</button></div></article></div><div class="section-head"><div><h2 class="section-title">By topic</h2></div></div><div class="grid-3">${topicCards}</div>`,'practice')
  }

  function startPractice(mode,topic){
    let pool=topic?D.questions.filter(q=>q.topic===topic):D.questions;
    if(mode==='weak'){
      const weak=pool.filter(q=>{const s=state.questionStats[q.id];return s&&s.wrong>0&&s.correct<=s.wrong*2});
      pool=weak.length?weak:pool;
    }
    session={type:'practice',questions:shuffle(pool).slice(0,10),index:0,answers:[],answered:false};touchStudy();render();
  }

  function practiceQuizView(){
    const q=session.questions[session.index],answer=session.answers[session.index];
    const answered=answer!==undefined;
    const options=q.answers.map((a,i)=>`<button class="answer ${answered?(i===q.correct?'correct':i===answer?'wrong':''):''}" data-answer="${i}" ${answered?'disabled':''}><span class="answer-key">${String.fromCharCode(65+i)}</span><span>${escapeHtml(a)}</span></button>`).join('');
    const explanation=answered?`<div class="explanation"><strong>${answer===q.correct?'Correct':'Not quite'}</strong>${escapeHtml(q.explanation)}${q.penalty===5?'<div class="pill warn" style="margin-top:10px">5-point exam category</div>':''}</div>`:'';
    return shell(`<div class="quiz-wrap"><div class="quiz-top"><button class="ghost-btn" data-end-quiz>← Exit</button><span class="pill">${session.index+1} / ${session.questions.length}</span></div><div class="progress-bar" style="margin-bottom:14px"><span style="width:${(session.index/session.questions.length)*100}%"></span></div><section class="question-card"><div class="question-meta"><span>${escapeHtml(topicTitle(q.topic))}</span><span>${q.penalty===5?'High-stakes question':'1-point question'}</span></div><h2>${escapeHtml(q.text)}</h2><div class="answers">${options}</div>${explanation}<div class="quiz-footer"><span>${answered?'Press N or tap Next':''}</span>${answered?`<button class="btn" data-next>${session.index===session.questions.length-1?'Finish':'Next question'}</button>`:''}</div></section></div>`,'practice')
  }

  function finishPractice(){
    const correct=session.answers.reduce((n,a,i)=>n+(a===session.questions[i].correct?1:0),0);const total=session.questions.length;session={type:'practice-result',correct,total};render();
  }
  function practiceResultView(){return shell(`<div class="quiz-wrap"><section class="card score-card"><div class="score-big">${session.correct}/${session.total}</div><h1>${session.correct>=8?'Strong round':'Keep drilling'}</h1><p>${session.correct>=8?'You are building reliable recall.':'Review the explanations and hit your weak deck next.'}</p><div class="actions" style="justify-content:center;margin-top:22px"><button class="btn" data-practice="mixed">Another 10</button><button class="btn secondary" data-go="practice">Practice menu</button></div></section></div>`,'practice')}

  function mockSetupView(){
    const last=state.mockHistory[0];
    return shell(`<div class="quiz-wrap"><div class="section-head"><div><h1 class="section-title">50-question mock test</h1><p>Broad topic mix with official Flemish Category B scoring.</p></div></div><section class="card"><div class="mock-rules"><div class="metric"><strong>50</strong><span>questions</span></div><div class="metric"><strong>41</strong><span>points to pass</span></div><div class="metric"><strong>−5</strong><span>high-stakes error</span></div></div><div class="notice"><strong>Timing note:</strong> the official exam gives 15 seconds after the question has been fully read. If Read aloud is on, this simulator starts its 15-second timer when your browser finishes speaking. Browser speech timing is not an official exam implementation.</div><div style="display:grid;gap:12px;margin:20px 0"><label><input type="checkbox" data-pref="timedMock" ${state.preferences.timedMock?'checked':''}> Use 15-second training timer</label><label><input type="checkbox" data-pref="readAloud" ${state.preferences.readAloud?'checked':''}> Read questions aloud in English when supported</label></div><div class="actions"><button class="btn" data-start-mock>Start mock test</button>${last?`<span class="pill">Last: ${last.score}/50 · ${last.passed?'Pass':'Fail'}</span>`:''}</div></section></div>`,'mock')
  }
  function makeMock(){
    const by={};D.questions.forEach(q=>(by[q.topic]??=[]).push(q));let chosen=[];Object.values(by).forEach(arr=>chosen.push(...shuffle(arr).slice(0,5)));
    const ids=new Set(chosen.map(q=>q.id));const rest=shuffle(D.questions.filter(q=>!ids.has(q.id)));chosen.push(...rest.slice(0,50-chosen.length));return shuffle(chosen).slice(0,50);
  }
  function startMock(){clearTimer();window.speechSynthesis?.cancel();session={type:'mock',questions:makeMock(),index:0,answers:[],losses:[],started:Date.now(),locked:false};touchStudy();render();setTimeout(armQuestion,120)}
  function mockQuestionView(){
    const q=session.questions[session.index];
    return shell(`<div class="quiz-wrap"><div class="quiz-top"><span class="pill">Mock test</span><div style="display:flex;gap:8px;align-items:center"><span class="pill">${session.index+1} / 50</span>${state.preferences.timedMock?`<span id="timer" class="pill timer">${timeLeft}s</span>`:''}</div></div><div class="progress-bar" style="margin-bottom:14px"><span style="width:${(session.index/50)*100}%"></span></div><section class="question-card"><div class="question-meta"><span>${escapeHtml(topicTitle(q.topic))}</span><span>${q.penalty===5?'Potential −5':'Potential −1'}</span></div><h2>${escapeHtml(q.text)}</h2><div class="answers">${q.answers.map((a,i)=>`<button class="answer" data-mock-answer="${i}"><span class="answer-key">${String.fromCharCode(65+i)}</span><span>${escapeHtml(a)}</span></button>`).join('')}</div><div class="quiz-footer"><span>Use keys <span class="kbd">1</span> <span class="kbd">2</span> <span class="kbd">3</span></span><button class="ghost-btn" data-end-mock>End test</button></div></section></div>`,'mock')
  }
  function armQuestion(){
    if(!session||session.type!=='mock')return;clearTimer();window.speechSynthesis?.cancel();timeLeft=15;updateTimerUi();
    const start=()=>{if(!state.preferences.timedMock)return;clearTimer();timerId=setInterval(()=>{timeLeft--;updateTimerUi();if(timeLeft<=0){clearTimer();submitMockAnswer(null,true)}},1000)};
    if(state.preferences.readAloud&&'speechSynthesis'in window){const q=session.questions[session.index];const u=new SpeechSynthesisUtterance(`${q.text}. ${q.answers.map((a,i)=>`${String.fromCharCode(65+i)}: ${a}`).join('. ')}`);u.lang='en-GB';u.rate=.95;u.onend=start;u.onerror=start;window.speechSynthesis.speak(u)}else start();
  }
  function updateTimerUi(){const el=document.getElementById('timer');if(el){el.textContent=`${timeLeft}s`;el.classList.toggle('low',timeLeft<=5)}}
  function clearTimer(){if(timerId){clearInterval(timerId);timerId=null}}
  function submitMockAnswer(value,timedOut=false){
    if(!session||session.type!=='mock'||session.locked)return;session.locked=true;clearTimer();window.speechSynthesis?.cancel();const q=session.questions[session.index];const correct=value===q.correct;const loss=timedOut?1:(correct?0:q.penalty);session.answers.push(value);session.losses.push(loss);updateQuestionStat(q,correct);setTimeout(()=>{session.index++;session.locked=false;if(session.index>=50)finishMock();else{render();setTimeout(armQuestion,80)}},180)
  }
  function finishMock(){
    clearTimer();window.speechSynthesis?.cancel();const score=Math.max(0,50-session.losses.reduce((a,b)=>a+b,0));const passed=score>=41;const result={date:new Date().toISOString(),score,passed,duration:Date.now()-session.started,questions:session.questions.map((q,i)=>({id:q.id,answer:session.answers[i],loss:session.losses[i]}))};state.mockHistory.unshift(result);state.mockHistory=state.mockHistory.slice(0,20);saveState();session={type:'mock-result',result,questions:session.questions};render();
  }
  function mockResultView(){
    const r=session.result;const mistakes=r.questions.map((x,i)=>({x,q:session.questions[i]})).filter(({x,q})=>x.answer!==q.correct);
    return shell(`<div class="quiz-wrap"><section class="card score-card"><div class="score-big ${r.passed?'score-pass':'score-fail'}">${r.score}/50</div><h1>${r.passed?'Pass':'Not yet'}</h1><p>${r.passed?'You reached the official pass threshold. Keep a buffer above 41 before booking.':'You need 41/50. Focus first on five-point mistakes and weak topics.'}</p><div class="actions" style="justify-content:center;margin-top:22px"><button class="btn" data-start-mock>Try another mock</button><button class="btn secondary" data-go="progress">View progress</button></div></section>${mistakes.length?`<div class="section-head"><div><h2 class="section-title">Review mistakes</h2><p>${mistakes.length} question${mistakes.length===1?'':'s'} to review</p></div></div>${mistakes.map(({x,q})=>`<article class="lesson-block ${x.loss===5?'danger-rule':''}"><h2>${escapeHtml(q.text)}</h2><p><strong>Correct:</strong> ${escapeHtml(q.answers[q.correct])}</p><p>${escapeHtml(q.explanation)}</p><span class="pill ${x.loss===5?'warn':''}">Lost ${x.loss} point${x.loss===1?'':'s'}</span></article>`).join('')}`:''}</div>`,'mock')
  }

  function signsView(){return shell(`<div class="section-head"><div><h1 class="section-title">Road sign gallery</h1><p>High-frequency Belgian signs rendered as clean study illustrations.</p></div><span class="pill">${D.signs.length} signs</span></div><div class="sign-row">${D.signs.map(s=>signCard(s.id)).join('')}</div><div class="notice">Illustrations are study recreations. For legal sign specifications and the complete sign catalogue, use the current Wegcode source linked on the Sources page.</div>`,'signs')}

  function progressView(){
    const ts=totalStats();const topicRows=D.lessons.filter(l=>D.questions.some(q=>q.topic===l.id)).map(l=>{const ids=D.questions.filter(q=>q.topic===l.id).map(q=>q.id),vals=ids.map(id=>state.questionStats[id]).filter(Boolean),seen=vals.reduce((n,s)=>n+s.seen,0),correct=vals.reduce((n,s)=>n+s.correct,0),acc=seen?Math.round(correct/seen*100):0;return `<tr><td>${escapeHtml(l.title)}</td><td>${seen}</td><td>${seen?acc+'%':'—'}</td></tr>`}).join('');
    const history=state.mockHistory.length?`<table class="table"><thead><tr><th>Date</th><th>Score</th><th>Result</th></tr></thead><tbody>${state.mockHistory.slice(0,8).map(h=>`<tr><td>${new Date(h.date).toLocaleDateString()}</td><td><strong>${h.score}/50</strong></td><td>${h.passed?'Pass':'Fail'}</td></tr>`).join('')}</tbody></table>`:'<div class="empty">No mock tests yet.</div>';
    return shell(`<div class="section-head"><div><h1 class="section-title">Progress</h1><p>Stored locally in this browser.</p></div><button class="ghost-btn" data-reset-progress>Reset data</button></div><div class="progress-stats"><div class="big-stat"><strong>${readiness()}%</strong><span>readiness</span></div><div class="big-stat"><strong>${lessonProgress()}%</strong><span>course complete</span></div><div class="big-stat"><strong>${ts.accuracy}%</strong><span>practice accuracy</span></div><div class="big-stat"><strong>${state.streak}</strong><span>day streak</span></div></div><div class="grid-2" style="margin-top:18px"><section class="card"><h3>Topic accuracy</h3><table class="table"><thead><tr><th>Topic</th><th>Answered</th><th>Accuracy</th></tr></thead><tbody>${topicRows}</tbody></table></section><section class="card"><h3>Mock history</h3>${history}</section></div>`,'progress')
  }

  function sourcesView(){return shell(`<div class="section-head"><div><h1 class="section-title">Sources & accuracy</h1><p>Every core rule in the course is grounded in current official or government-supported material.</p></div><span class="pill good">Verified ${D.verified}</span></div><section class="lesson-block danger-rule"><h2>Important 2026/2027 transition</h2><p>The new Code of the Public Road is scheduled to enter into force on <strong>1 June 2027</strong>. This site deliberately teaches the current rules that remain applicable before that date. Do not mix future-code study material into a 2026 exam.</p></section>${Object.values(D.sources).map(s=>`<a class="source" href="${s.url}" target="_blank" rel="noopener"><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.note)}</small></a>`).join('')}<section class="lesson-block"><h2>Scope</h2><p>This is an independent English study tool for the <strong>Flemish Category B theory exam</strong>, not an official VSV, GOCA or Flemish Government product. The mock questions are original study questions, not copied official exam questions. Regional defaults can differ elsewhere in Belgium.</p></section>`,'sources')}
  function notFound(){return shell('<div class="empty">Page not found. <button class="ghost-btn" data-go="home">Go home</button></div>','home')}

  function render(){
    clearTimer();const r=route();let html;
    if(session?.type==='practice') html=practiceQuizView();
    else if(session?.type==='practice-result') html=practiceResultView();
    else if(session?.type==='mock') html=mockQuestionView();
    else if(session?.type==='mock-result') html=mockResultView();
    else if(r==='home') html=homeView();
    else if(r==='learn') html=learnView();
    else if(r.startsWith('lesson/')) html=lessonView(r.split('/')[1]);
    else if(r==='practice') html=practiceView();
    else if(r==='mock') html=mockSetupView();
    else if(r==='signs') html=signsView();
    else if(r==='progress') html=progressView();
    else if(r==='sources') html=sourcesView();
    else html=notFound();
    document.getElementById('app').innerHTML=html;window.scrollTo({top:0,behavior:'instant'});
  }

  document.addEventListener('click',e=>{
    const goEl=e.target.closest('[data-go]');if(goEl){session=null;clearTimer();window.speechSynthesis?.cancel();go(goEl.dataset.go);return}
    const complete=e.target.closest('[data-complete]');if(complete){const id=complete.dataset.complete;if(!state.completedLessons.includes(id))state.completedLessons.push(id);touchStudy();saveState();startPractice('topic',id);return}
    const pt=e.target.closest('[data-practice-topic]');if(pt){startPractice('topic',pt.dataset.practiceTopic);return}
    const pm=e.target.closest('[data-practice]');if(pm){startPractice(pm.dataset.practice);return}
    const ans=e.target.closest('[data-answer]');if(ans&&session?.type==='practice'){const q=session.questions[session.index];const v=Number(ans.dataset.answer);session.answers[session.index]=v;updateQuestionStat(q,v===q.correct);render();return}
    if(e.target.closest('[data-next]')&&session?.type==='practice'){if(session.index===session.questions.length-1)finishPractice();else{session.index++;render()}return}
    if(e.target.closest('[data-end-quiz]')){session=null;go('practice');return}
    if(e.target.closest('[data-start-mock]')){startMock();return}
    const ma=e.target.closest('[data-mock-answer]');if(ma)submitMockAnswer(Number(ma.dataset.mockAnswer),false);
    if(e.target.closest('[data-end-mock]')){if(confirm('End this mock test? It will not be saved.')){session=null;clearTimer();window.speechSynthesis?.cancel();go('mock')}return}
    if(e.target.closest('[data-reset-progress]')){if(confirm('Delete all BE Theory progress stored in this browser?')){state=structuredClone(defaults);saveState();render()}return}
  });
  document.addEventListener('change',e=>{if(e.target.matches('[data-pref]')){state.preferences[e.target.dataset.pref]=e.target.checked;saveState()}});
  document.addEventListener('keydown',e=>{
    if(session?.type==='mock'&&['1','2','3'].includes(e.key)){document.querySelector(`[data-mock-answer="${Number(e.key)-1}"]`)?.click()}
    if(session?.type==='practice'&&['1','2','3'].includes(e.key)){document.querySelector(`[data-answer="${Number(e.key)-1}"]`)?.click()}
    if(session?.type==='practice'&&e.key.toLowerCase()==='n')document.querySelector('[data-next]')?.click();
  });
  window.addEventListener('hashchange',()=>{session=null;clearTimer();window.speechSynthesis?.cancel();render()});
  if('serviceWorker'in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  render();
})();
