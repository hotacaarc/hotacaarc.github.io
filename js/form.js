// === form.js (修正版) ===
const form = () => {
  const contactForm = document.querySelector(".contactForm");
  if (!contactForm) return;          // ← フォームが無ければ何もしない

  const responseMessage = document.querySelector(".response");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";

    try {
      const response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.text();   // ← result を先に取得
      responseMessage.textContent = result;   // ここで表示
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => responseMessage.classList.remove("open"), 3000);
      form.reset();
    }
  });
};

export default form;
