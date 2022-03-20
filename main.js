/* Opens and closes the menu when clicking on the icon */
const nav = document.querySelector("#header nav");
const toggle = document.querySelectorAll("nav .toggle");

for (const element of toggle) {
  element.addEventListener("click", function () {
    nav.classList.toggle("show");
  });
}

/* When clicking on a menu item, hide the menu */
const links = document.querySelectorAll("nav ul li a");

for (const link of links) {
  link.addEventListener("click", function () {
    nav.classList.remove("show");
  });
}

/* Change header when scroll is used */
const header = document.querySelector("#header");
const navHeight = header.offsetHeight;

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll is greater than height
    header.classList.add("scroll");
  } else {
    // scroll is less than height
    header.classList.remove("scroll");
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true,
    },
  },
});

/* ScrollReveal: Show elements when scrolling */
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 700,
  reset: true,
});

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #service header, #service .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links ,
  footer .brand, footer .social 
  `,
  { interval: 100 }
);

/* Back to top button */
const backToTopButton = document.querySelector(".back-to-top");

function backToTop() {
  if (this.window.scrollY >= 560) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

/* Active menu as per the session visible on the page */
const sections = document.querySelectorAll("main section[id]");
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector("nav ul li a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector("nav ul li a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  }
}

/* When Scroll */
window.addEventListener("scroll", function () {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});

/* Form validation */
function validateForm() {
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;

  /* User validation */
  let user = email.substring(0, email.lastIndexOf("@"));
  let userPattern = /^(?=.*[.])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,32}$/;
  let userVerified = userPattern.test(user);

  let domain = email.substring(
    email.lastIndexOf("@") + 1,
    email.lastIndexOf(".")
  );
  let domainPattern = /^(?=.*\d)(?=.*[a-z]).{1,16}$/;
  let domainVerified = domainPattern.test(domain);

  if (userVerified && domainVerified && subject !== "") {
    alert(`Obrigado pelo contato, ${user}!`);
  } else if (subject == "" && userVerified && domainVerified) {
    alert("Erro no envio: Insira uma mensagem");
  } else {
    alert("Erro no envio: Endereço de email inválido");
  }
}
