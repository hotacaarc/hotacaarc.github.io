// gallery.js
document.addEventListener('DOMContentLoaded', () => {
    const main   = document.getElementById('gw-main');
    const thumbs = document.querySelectorAll('.gw-thumbs img');
    const modal  = document.getElementById('gw-modal');
    const modalImg = modal.querySelector('.gw-modal-img');
    const prevBtn  = modal.querySelector('.gw-prev');
    const nextBtn  = modal.querySelector('.gw-next');
    const closeBtn = modal.querySelector('.gw-close');
    const dotsBox  = modal.querySelector('.gw-dots');
  
    let current = 0;                         // 現在の表示インデックス
    const srcs  = Array.from(thumbs).map(t => t.src);
  
    // サムネイルクリック
    thumbs.forEach(t => t.addEventListener('click', e => {
      current = +t.dataset.index;
      selectThumb(current);
    }));
  
    // メイン画像クリック → モーダル表示
    main.addEventListener('click', () => openModal(current));
  
    // モーダル表示用関数
    function openModal(i){
      modal.style.display='flex';
      modalImg.src = srcs[i];
      buildDots(i);
    }
  
    // 閉じる
    closeBtn.onclick = () => modal.style.display='none';
    modal.onclick = e => { if(e.target===modal) modal.style.display='none'; };
  
    // ナビゲーション
    prevBtn.onclick = () => nav(-1);
    nextBtn.onclick = () => nav(+1);
    function nav(dir){
      current = (current + dir + srcs.length) % srcs.length;
      modalImg.src = srcs[current];
      buildDots(current);
    }
  
    // ドット UI 再構築
    function buildDots(active){
      dotsBox.innerHTML='';
      srcs.forEach((_,i)=>{
        const dot=document.createElement('span');
        if(i===active) dot.classList.add('active');
        dot.onclick=()=>{ current=i; modalImg.src=srcs[i]; buildDots(i); };
        dotsBox.appendChild(dot);
      });
    }
  
    // サムネイル選択状態
    function selectThumb(i){
      thumbs.forEach(t=>t.classList.remove('active'));
      thumbs[i].classList.add('active');
      main.src = srcs[i];
      current  = i;
    }
    selectThumb(0); // 初期表示
  });
  