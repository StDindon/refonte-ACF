// Accordéons
const btns = document.querySelectorAll(".fa-solid");
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const question = e.currentTarget.parentElement.parentElement;
    question.classList.toggle("active");
  });
});

// Menu hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".categorie");

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle('no-scroll');
  });

  document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove('no-scroll');
  }));
}