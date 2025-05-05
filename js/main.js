"use strict";
import AOS      from "https://cdn.skypack.dev/aos@2.3.4";
import form     from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {

  /* AOS + index 専用処理 ------------------------------ */
  AOS.init({ once:true });
  if (typeof form     === "function") form();
  if (typeof skillbar === "function") skillbar();

  /* ハンバーガー -------------------------------------- */
  const navBtn    = document.getElementById("nav-btn");
  const navBtnImg = document.getElementById("nav-btn-img");
  const nav       = document.getElementById("nav");

  if (navBtn && navBtnImg && nav){
    navBtn.addEventListener("click", ()=>{
      nav.classList.toggle("open");
      navBtnImg.src = nav.classList.contains("open")
        ? "/img/icons/close.svg"   // ← ルート基準で 404 防止
        : "/img/icons/open.svg";
    });
    nav.querySelectorAll(".nav-link").forEach(a=>{
      a.addEventListener("click", ()=> nav.classList.remove("open"));
    });
  }

  /* スクロール連動 ------------------------------------ */
  const header   = document.getElementById("header");
  const hero     = document.getElementById("home");
  const goTop    = document.getElementById("goToTop");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const onScroll = ()=>{
    const y        = window.scrollY;
    const trigger  = hero ? hero.offsetHeight - 170 : 0;

    if (header) header.classList.toggle("header-sticky", y > trigger);
    if (goTop)  goTop .classList.toggle("reveal",        y > trigger);

    sections.forEach(sec=>{
      const inView = y >= sec.offsetTop - 170 && y < sec.offsetTop + sec.offsetHeight;
      if (inView){
        navLinks.forEach(a=>a.classList.remove("active"));
        const cur = document.querySelector(`header nav a[href*=${sec.id}]`);
        if (cur) cur.classList.add("active");
      }
    });
  };
  onScroll();                         // ★ 初回に 1 回実行
  window.addEventListener("scroll", onScroll, {passive:true});
});
