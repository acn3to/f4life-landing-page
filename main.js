/* Abre e fecha o menu quando clicar no icone */
const nav = document.querySelector("#header nav");
const toggle = document.querySelectorAll("nav .toggle");

for (const element of toggle) {
  element.addEventListener("click", function () {
    nav.classList.toggle("show");
  });
}

/* Quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll("nav ul li a");

for (const link of links) {
  link.addEventListener("click", function () {
    nav.classList.remove("show");
  });
}

/* mudar o header quando o scroll for usado */
const header = document.querySelector("#header");
const navHeight = header.offsetHeight;

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    //scroll é maior que a altura do height
    header.classList.add("scroll");
  } else {
    //scroll é menor que a altura do height
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

/* ScrollReveal: Mostrar elementos quando der scroll na pagina */
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

/* Botão voltar para o topo */
const backToTopButton = document.querySelector(".back-to-top");

function backToTop() {
  if (this.window.scrollY >= 560) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

/* Menu ativo conforme a sessão visível na página */
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
    alert("Erro no envio: Endereço de mail inválido");
  }
}
