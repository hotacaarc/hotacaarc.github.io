(() => {
  function initGallery () {
    const main     = document.getElementById('gw-main');
    const thumbs   = document.querySelectorAll('.gw-thumbs img');
    const modal    = document.getElementById('gw-modal');
    const modalImg = modal.querySelector('.gw-modal-img');
    const prevBtn  = modal.querySelector('.gw-prev');
    const nextBtn  = modal.querySelector('.gw-next');
    const closeBtn = modal.querySelector('.gw-close');
    const dotsBox  = modal.querySelector('.gw-dots');

    const srcs   = Array.from(thumbs, t => t.src);
    let current  = 0;      // 表示中インデックス
    let isOpen   = false;  // モーダル開閉フラグ

    /* ---------- キーボード操作 ---------- */
    function handleKey (e) {
      if (!isOpen) return;                // 開いているときだけ
      switch (e.key) {
        case 'ArrowLeft':  nav(-1);  break;
        case 'ArrowRight': nav(+1);  break;
        case 'Escape':     closeModal(); break;
      }
    }

    /* ---------- モーダル ---------- */
    function openModal (i) {
      modal.classList.add('open');        // display 制御は CSS に任せる
      modalImg.src = srcs[i];
      buildDots(i);
      isOpen = true;
      document.addEventListener('keydown', handleKey);
    }

    function closeModal () {
      modal.classList.remove('open');
      isOpen = false;
      document.removeEventListener('keydown', handleKey);
    }

    /* ---------- ナビゲーション (Prev / Next / ドット) ---------- */
    function nav (dir) {
      current = (current + dir + srcs.length) % srcs.length;
      modalImg.src = srcs[current];
      buildDots(current);
    }

    function buildDots (active) {
      dotsBox.innerHTML = '';
      srcs.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === active) dot.classList.add('active');
        dot.addEventListener('click', () => {
          current = i;
          modalImg.src = srcs[i];
          buildDots(i);
        });
        dotsBox.appendChild(dot);
      });
    }

    /* ---------- サムネ＆メイン ---------- */
    function selectThumb (i) {
      thumbs.forEach(t => t.classList.remove('active'));
      thumbs[i].classList.add('active');
      main.src = srcs[i];
      current  = i;
    }

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        selectThumb(+t.dataset.index);
        openModal(current);               // サムネ→即モーダルならここで
      });
    });

    main.addEventListener('click', () => openModal(current));

    /* ---------- ボタン & 背景クリック ---------- */
    prevBtn.addEventListener('click', () => nav(-1));
    nextBtn.addEventListener('click', () => nav(+1));
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    /* ---------- 初期表示 ---------- */
    selectThumb(0);
  }

  /* ---------- DOMContentLoaded もれ対策 ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
