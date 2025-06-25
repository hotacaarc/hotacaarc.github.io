document.addEventListener('DOMContentLoaded', () => {
  const main      = document.getElementById('gw-main');
  const thumbs    = document.querySelectorAll('.gw-thumbs img');
  const modal     = document.getElementById('gw-modal');
  const modalImg  = modal.querySelector('.gw-modal-img');
  const prevBtn   = modal.querySelector('.gw-prev');
  const nextBtn   = modal.querySelector('.gw-next');
  const closeBtn  = modal.querySelector('.gw-close');
  const dotsBox   = modal.querySelector('.gw-dots');

  let current = 0;
  const srcs  = Array.from(thumbs).map(t => t.src);

  //=== 追加: キーボードハンドラ ===
  function handleKey(e){
    if(modal.style.display !== 'flex') return;     // モーダルが開いているときだけ
    switch(e.key){
      case 'ArrowLeft':  nav(-1);   break;         // ← キー
      case 'ArrowRight': nav(+1);   break;         // → キー
      case 'Escape':     closeModal(); break;      // Esc
    }
  }

  //=== モーダルを開く ===
  function openModal(i){
    modal.style.display = 'flex';
    modalImg.src = srcs[i];
    buildDots(i);
    document.addEventListener('keydown', handleKey);   // ここで監視開始
  }

  //=== モーダルを閉じる（共通関数にしておくと楽） ===
  function closeModal(){
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleKey); // 必ず解除
  }

  // サムネイルクリック
  thumbs.forEach(t => t.addEventListener('click', () => {
    current = +t.dataset.index;
    selectThumb(current);
  }));

  // メイン画像クリック → モーダル
  main.addEventListener('click', () => openModal(current));

  // 閉じる UI
  closeBtn.onclick = closeModal;
  modal.onclick = e => { if(e.target === modal) closeModal(); };

  // ナビゲーション
  prevBtn.onclick = () => nav(-1);
  nextBtn.onclick = () => nav(+1);
  function nav(dir){
    current = (current + dir + srcs.length) % srcs.length;
    modalImg.src = srcs[current];
    buildDots(current);
  }

  // ドット UI
  function buildDots(active){
    dotsBox.innerHTML = '';
    srcs.forEach((_, i) => {
      const dot = document.createElement('span');
      if(i === active) dot.classList.add('active');
      dot.onclick = () => { current = i; modalImg.src = srcs[i]; buildDots(i); };
      dotsBox.appendChild(dot);
    });
  }

  // サムネイル選択
  function selectThumb(i){
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[i].classList.add('active');
    main.src = srcs[i];
    current  = i;
  }
  selectThumb(0);
});
