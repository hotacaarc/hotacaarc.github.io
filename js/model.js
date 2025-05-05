/* --------------------------------------------------------------
   hero‑model.js
   作品ページ（<model-viewer> が存在する画面）だけ読み込む。
   ・読み込み完了でポスターを外す
   ・ライト／環境テクスチャなどをページ側からカスタム可
   -------------------------------------------------------------- */

   document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('model-viewer');
  
    if (!viewer) return;                   // 3D を置いていないページは何もしない
  
    /* 1. 読み込み完了でフェードイン（ポスター画像がある場合） */
    viewer.addEventListener('load', () => {
      viewer.classList.add('is‑loaded');   // CSS で opacity をトランジションしても OK
    });
  
    /* 2. マウスホイールでズーム量をやや抑える（任意） */
    viewer.addEventListener('wheel', (e) => {
      const maxFieldOfView = 60;
      const minFieldOfView = 20;
  
      // wheelDeltaY は非標準、deltaY を符号反転
      const delta = Math.sign(-e.deltaY);
      let fov = (+viewer.fieldOfViewDeg) + delta * 1.5;     // 1 クリックにつき 1.5°
      fov = Math.min(maxFieldOfView, Math.max(minFieldOfView, fov));
      viewer.fieldOfViewDeg = fov;
    });
  
    /* 3. ダークモードに合わせて背景を切り替える（例） */
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function updateBg(e){
      viewer.style.backgroundColor = e.matches ? '#121212' : '#ffffff';
    }
    updateBg(darkMedia);
    darkMedia.addEventListener('change', updateBg);
  
    /* 4. 必要なら環境マップを差し替える（例） */
    // viewer.environmentImage = '../img/hdr/studio.hdr';
  });
  