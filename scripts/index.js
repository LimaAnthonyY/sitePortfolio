const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burguer');

button.addEventListener('click', function () {
  mobileNavbar.classList.toggle('active');
});

window.addEventListener('scroll', function () {
  if (this.window.pageYOffset > 0) return navbar.classList.add('active');
  return navbar.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('header, section, footer');
  const navLinks = document.querySelectorAll('.navbar__links a, .mobile__links a');
  const scrollMarginTop = 320; // 20rem (em pixels) para scroll-margin-top

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + scrollMarginTop < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      // Ativa o link "Contato" quando chegar ao final da página
      navLinks.forEach((link) => {
        if (link.getAttribute('href').substring(1) === 'footer') {
          link.classList.add('active');
        }
      });
    } else if (index >= 0) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href').substring(1) === sections[index].id) {
          link.classList.add('active');
        }
      });
    }
  }

  changeActiveLink();
  window.addEventListener('scroll', changeActiveLink);

  // Para tratar o clique nos links e rolar suavemente para a seção
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      window.scrollTo({
        top: section.offsetTop - scrollMarginTop,
        behavior: 'smooth'
      });
      setTimeout(changeActiveLink, 500); // Atualiza o link ativo após o clique com um pequeno delay
    });
  });
});
