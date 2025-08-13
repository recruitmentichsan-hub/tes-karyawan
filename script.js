
(function(){
  const byId = (id)=>document.getElementById(id);
  const intro = byId('intro');
  const testSec = byId('test');
  const finish = byId('finish');
  const testTitle = byId('testTitle');
  const testContent = byId('testContent');
  const timerEl = byId('timer');
  const progressBar = byId('progressBar');
  const summaryEl = byId('summary');
  const startBtn = byId('startBtn');
  const prevBtn = byId('prevBtn');
  const nextBtn = byId('nextBtn');
  const submitBtn = byId('submitBtn');
  const downloadBtn = byId('downloadBtn');

  // State
  let selectedTests = [];
  let activeTestIndex = 0;
  let activeItemIndex = 0;
  let answers = {}; // { testId: { items: [...], startAt, endAt, score, detail } }
  let timer = null;
  let remaining = 0; // seconds

  function formatTime(s){
    const m = Math.floor(s/60).toString().padStart(2,'0');
    const r = (s%60).toString().padStart(2,'0');
    return `${m}:${r}`;
  }

  function startTimer(minutes){
    if(timer) clearInterval(timer);
    remaining = Math.max(1, minutes*60);
    timerEl.textContent = formatTime(remaining);
    timer = setInterval(()=>{
      remaining -= 1;
      timerEl.textContent = formatTime(Math.max(0, remaining));
      if(remaining <= 0){
        clearInterval(timer);
        // Auto move to next test
        nextItem(true);
      }
    }, 1000);
  }

  function collectCandidate(){
    return {
      nama: byId('nama').value.trim(),
      email: byId('email').value.trim(),
      posisi: byId('posisi').value.trim(),
      kode: byId('kode').value.trim()
    };
  }

  function validateCandidate(c){
    return c.nama && c.email && c.posisi;
  }

  function start(){
    const c = collectCandidate();
    if(!validateCandidate(c)){
      alert('Lengkapi Nama, Email, dan Posisi terlebih dahulu.');
      return;
    }
    const paket = Array.from(document.querySelectorAll('.paket:checked')).map(x=>x.value);
    if(paket.length === 0){
      alert('Pilih satu paket tes dahulu.');
      return;
    }
    selectedTests = paket.map(id => window.TESTS[id]).filter(Boolean);
    answers = {};
    activeTestIndex = 0;
    activeItemIndex = 0;
    // Prepare result scaffold
    selectedTests.forEach(t => {
      answers[t.id] = {
        id: t.id,
        title: t.title,
        minutes: t.minutes,
        startAt: new Date().toISOString(),
        endAt: null,
        items: new Array(t.items.length).fill(null),
        score: null,
        detail: null
      };
    });

    intro.classList.add('hidden');
    testSec.classList.remove('hidden');
    loadTest(0);
  }

  function loadTest(index){
    activeTestIndex = index;
    activeItemIndex = 0;
    const t = selectedTests[index];
    testTitle.textContent = t.title + ` ` + badge(`${t.items.length} butir • ${t.minutes} menit`);
    startTimer(t.minutes);
    renderItem();
    updateProgress();
    prevBtn.disabled = true;
    nextBtn.textContent = 'Berikutnya';
  }

  function badge(text){
    return '';
  }

  function renderItem(){
    const t = selectedTests[activeTestIndex];
    const item = t.items[activeItemIndex];
    testContent.innerHTML = ''; // reset

    const qWrap = document.createElement('div');
    qWrap.className = 'q';

    const h = document.createElement('h4');
    h.innerHTML = `(${activeItemIndex+1}/${t.items.length}) ${item.prompt}`;
    qWrap.appendChild(h);

    const opts = document.createElement('div');
    opts.className = 'opts';

    if(item.type === 'likert5'){
      const labels = ['1 – Sangat Tidak Setuju','2 – Tidak Setuju','3 – Netral','4 – Setuju','5 – Sangat Setuju'];
      labels.forEach((lab, idx)=>{
        const id = `li_${activeTestIndex}_${activeItemIndex}_${idx}`;
        const row = document.createElement('label');
        row.className = 'check';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q_${activeTestIndex}_${activeItemIndex}`;
        input.value = (idx+1).toString();
        input.id = id;
        if(answers[t.id].items[activeItemIndex] == input.value) input.checked = true;
        row.appendChild(input);
        const span = document.createElement('span');
        span.textContent = lab;
        row.appendChild(span);
        opts.appendChild(row);
      });
    } else if(item.type === 'mcq'){
      item.options.forEach((opt, idx)=>{
        const id = `mc_${activeTestIndex}_${activeItemIndex}_${idx}`;
        const row = document.createElement('label');
        row.className = 'check';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q_${activeTestIndex}_${activeItemIndex}`;
        input.value = opt;
        input.id = id;
        if(answers[t.id].items[activeItemIndex] == input.value) input.checked = true;
        row.appendChild(input);
        const span = document.createElement('span');
        span.textContent = opt;
        row.appendChild(span);
        opts.appendChild(row);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = 'Tipe butir belum didukung.';
      opts.appendChild(p);
    }

    qWrap.appendChild(opts);
    testContent.appendChild(qWrap);
  }

  function saveCurrentAnswer(){
    const t = selectedTests[activeTestIndex];
    const name = `q_${activeTestIndex}_${activeItemIndex}`;
    const input = document.querySelector(`input[name="${name}"]:checked`);
    if(input){
      answers[t.id].items[activeItemIndex] = input.value;
    }
  }

  function updateProgress(){
    const t = selectedTests[activeTestIndex];
    const pct = ((activeItemIndex+1) / t.items.length) * 100;
    progressBar.style.width = pct + '%';
  }

  function nextItem(auto=false){
    saveCurrentAnswer();
    const t = selectedTests[activeTestIndex];
    if(activeItemIndex < t.items.length - 1){
      activeItemIndex += 1;
      renderItem();
      updateProgress();
      prevBtn.disabled = false;
      if(activeItemIndex === t.items.length - 1) nextBtn.textContent = 'Selesai Tes';
    } else {
      // selesai test ini
      answers[t.id].endAt = new Date().toISOString();
      // skor
      scoreTest(t);
      // lanjut ke test berikutnya atau finish
      if(activeTestIndex < selectedTests.length - 1){
        loadTest(activeTestIndex + 1);
      } else {
        showFinish();
      }
    }
  }

  function prevItem(){
    if(activeItemIndex === 0) return;
    saveCurrentAnswer();
    activeItemIndex -= 1;
    renderItem();
    updateProgress();
    if(activeItemIndex === 0) prevBtn.disabled = true;
    nextBtn.textContent = 'Berikutnya';
  }

  function scoreTest(t){
    const rec = answers[t.id];
    if(t.id === 'b5'){
      // hitung rata-rata tiap trait
      const traits = {E:[],A:[],C:[],N:[],O:[]};
      t.items.forEach((it, i)=>{
        const v = parseInt(rec.items[i] || '0', 10);
        if(Number.isFinite(v)){
          let trait = (it.trait || '').replace('-','');
          const reverse = !!it.reverse || (it.trait && it.trait.includes('-'));
          traits[trait] && traits[trait].push(reverse && v ? (6 - v) : v);
        }
      });
      const avg = {};
      for(const k of Object.keys(traits)){
        const arr = traits[k];
        const s = arr.reduce((a,b)=>a+b,0);
        avg[k] = arr.length ? +(s/arr.length).toFixed(2) : null;
      }
      rec.score = avg;
      rec.detail = {scale:'1=STS ... 5=SS'};
    } else if(t.id === 'num' || t.id === 'verbal'){
      let correct = 0;
      t.items.forEach((it, i)=>{
        if((rec.items[i] || '').toString() === it.key) correct += 1;
      });
      rec.score = { benar: correct, total: t.items.length, persentase: Math.round(100*correct/t.items.length) };
    }
  }

  function showFinish(){
    testSec.classList.add('hidden');
    finish.classList.remove('hidden');
    // ringkasan
    const c = collectCandidate();
    const wrap = document.createElement('div');
    const now = new Date();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    wrap.innerHTML = `
      <p><b>Nama:</b> ${c.nama} &nbsp; <b>Email:</b> ${c.email} &nbsp; <b>Posisi:</b> ${c.posisi} &nbsp; <b>Kode:</b> ${c.kode || '-'}</p>
      <p><b>Waktu Selesai:</b> ${now.toLocaleString(window.HR_CONFIG.LOCALE || 'id-ID',{ timeZone: window.HR_CONFIG.TIMEZONE || tz })}</p>
    `;

    const ul = document.createElement('ul');
    for(const t of selectedTests){
      const rec = answers[t.id];
      const li = document.createElement('li');
      li.style.marginBottom = '8px';
      if(t.id === 'b5'){
        const s = rec.score || {};
        li.innerHTML = `<b>${t.title}:</b> E=${s.E ?? '-'}; A=${s.A ?? '-'}; C=${s.C ?? '-'}; N=${s.N ?? '-'}; O=${s.O ?? '-'}`;
      } else {
        li.innerHTML = `<b>${t.title}:</b> ${rec.score.benar}/${rec.score.total} benar (${rec.score.persentase}%)`;
      }
      ul.appendChild(li);
    }
    summaryEl.innerHTML = '';
    summaryEl.appendChild(wrap);
    summaryEl.appendChild(ul);
    // simpan ke localStorage sementara
    localStorage.setItem('psikotest_result', JSON.stringify({candidate: c, results: answers}));
  }

  async function submitResult(){
    const c = collectCandidate();
    const payload = {
      company: window.HR_CONFIG.COMPANY,
      candidate: c,
      results: answers,
      completedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    try{
      if(!window.HR_CONFIG.SUBMIT_URL || window.HR_CONFIG.SUBMIT_URL.includes('YOUR_APPS_SCRIPT_WEB_APP_URL')){
        alert('Belum ada SUBMIT_URL. Ikuti panduan di README untuk membuat Google Sheets endpoint, lalu tempel URL-nya ke index.html.');
        return;
      }
      const res = await fetch(window.HR_CONFIG.SUBMIT_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error('Gagal submit');
      alert('Hasil terkirim. Terima kasih!');
    }catch(e){
      console.error(e);
      alert('Tidak bisa mengirim hasil. Coba lagi atau hubungi HR.');
    }
  }

  function downloadPDF(){
    // Simpel: print to PDF
    window.print();
  }

  // Events
  startBtn.addEventListener('click', start);
  nextBtn.addEventListener('click', ()=>nextItem(false));
  prevBtn.addEventListener('click', prevItem);
  submitBtn.addEventListener('click', submitResult);
  downloadBtn.addEventListener('click', downloadPDF);
})();
