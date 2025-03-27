(function () {
  'use strict';
});

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const on = (type, el, listener, all = false) => {
  let selectE1 = select(el, all);
  if (selectE1) {
    if (all) {
      selectE1.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectE1.addEventListener(type, listener);
    }
  }
};

const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener);
};

let navbarlinks = select('#navbar .scrollto', true);
const navbarlinksActive = () => {
  let position = window.scrollY + 200;
  navbarlinks.forEach((navbarlink) => {
    if (!navbarlink.hash) return;
    let section = select(navbarlink.hash);
    if (!section) return;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      navbarlink.classList.remove('active');
    } else {
      navbarlink.classList.remove('active');
    }
  });
};
window.addEventListener('load', navbarlinksActive);
onscroll(document, navbarlinksActive);

const scrollto = (el) => {
  let header = select('#header');
  let offset = header.offsetHeight;

  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos - offset,
    behavior: 'smooth',
  });
};

window.addEventListener('load', () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); 

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId.toLowerCase());

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', 
          block: 'start',
        });
      }
    });
  });
});
