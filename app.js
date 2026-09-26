(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Меню на телефоне
  const hdr = $('.hdr');
  $('.burger')?.addEventListener('click', () => {
    const open = hdr.classList.toggle('open');
    $('.burger').setAttribute('aria-expanded', open);
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => hdr.classList.remove('open')));

  // Подсказка для демо-ссылок
  let tt;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), 3200);
  }
  $$('[data-demo]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); toast(a.dataset.demo || 'В демо ссылка ведёт сюда. На сайте заказчика – на настоящую страницу.'); }));

  // Форма «Разобрать ситуацию»
  const modal = $('#form');
  if (!modal) return;
  const s1 = $('#step1', modal), s2 = $('#step2', modal), s3 = $('#step3', modal);
  function open(topic) {
    modal.hidden = false; document.body.style.overflow = 'hidden';
    s1.hidden = false; s2.hidden = true; s3.hidden = true;
    if (topic) { const r = $$('input[name=topic]', modal).find(i => i.value === topic); if (r) r.checked = true; }
    setTimeout(() => $('input[name=topic]:checked, input[name=topic]', modal).focus(), 30);
  }
  function close() { modal.hidden = true; document.body.style.overflow = ''; }
  $$('[data-open-form]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const sel = b.closest('form')?.querySelector('select');
    open(b.dataset.openForm || (sel && sel.value) || '');
  }));
  $('.modal__x', modal).addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
  $('#next', modal).addEventListener('click', () => {
    if (!$('input[name=topic]:checked', modal)) { toast('Выберите, с чем связана ситуация'); return; }
    s1.hidden = true; s2.hidden = false; $('#f-name', modal).focus();
  });
  $('#back', modal).addEventListener('click', () => { s2.hidden = true; s1.hidden = false; });
  $('#send', modal).addEventListener('submit', e => {
    e.preventDefault();
    if (!$('#f-name', modal).value.trim() || !$('#f-phone', modal).value.trim()) { toast('Укажите имя и телефон или Telegram'); return; }
    s2.hidden = true; s3.hidden = false;
  });
})();
