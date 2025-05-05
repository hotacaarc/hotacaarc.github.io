/* ───────────────────────────────────────────────
   main.js  –  全ページ共通スクリプト
   ・AOS 初期化
   ・スクロールでヘッダー影と Go‑to‑Top 表示
   ・ハンバーガーナビ（#nav-btn）が存在するときだけ開閉処理
   ──────────────────────────────────────────── */

   import AOS from 'https://cdn.skypack.dev/aos@2.3.4';

   document.addEventListener('DOMContentLoaded', () => {
   
     /* ========== 1. AOS (Animate On Scroll) ========== */
     AOS.init({ once: true });
   
     /* ========== 2. ヘッダーの影 & Go‑to‑Top ========== */
     const header = document.getElementById('header');
     const goTop  = document.getElementById('goToTop');
   
     window.addEventListener('scroll', () => {
       const y = window.scrollY;
   
       // ヘッダー影
       if (header) {
         header.classList.toggle('header-sticky', y > 50);
       }
   
       // Go‑to‑Top ボタン
       if (goTop) {
         goTop.classList.toggle('reveal', y > 400);
       }
     });
   
     /* ========== 3. ハンバーガーメニュー ========== */
     const navBtn     = document.getElementById('nav-btn');      // ボタン
     const navBtnImg  = document.getElementById('nav-btn-img');  // アイコン画像
     const nav        = document.getElementById('nav');          // ナビ本体
   
     // 3 要素が全部そろっているページだけ実行
     if (navBtn && navBtnImg && nav) {
       navBtn.addEventListener('click', () => {
         nav.classList.toggle('open');
   
         // アイコン画像を開閉で切り替え
         navBtnImg.src = nav.classList.contains('open')
           ? '../img/icons/close.svg'   // 開いているとき ×
           : '../img/icons/open.svg';   // 閉じているとき ≡
       });
   
       // メニュー項目クリックで自動クローズ
       nav.querySelectorAll('.nav-link').forEach(link => {
         link.addEventListener('click', () => nav.classList.remove('open'));
       });
     }
   });
   