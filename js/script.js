const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLinks = document.querySelectorAll(".nav-link");
function linkAction() {
  navMenu.classList.remove("show-menu");
}
navLinks.forEach((n) => n.addEventListener("click", linkAction));

function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);
/* =================TESTIMONIAL SWIPER */
var swiper = new Swiper(".testimonial-wrapper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 58; 
    const sectionId = section.getAttribute('id');

    
    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = sectionId; 
    }
  });

  
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active-link');
  });

 
  if (currentSectionId) {
    document.querySelector(`.nav-menu a[href*="${currentSectionId}"]`).classList.add('active-link');
  }
}


document.addEventListener('scroll', navHighlighter);

const filterContainer = document.querySelector(".porfolio-filter-inner"),
  filterBtns = filterContainer.children;
totalFilterBtn = filterBtns.length;
portfolioItems = document.querySelectorAll(".protfolio-item");

totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function(){
    
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    console.log(this);
    const filterValue = this.getAttribute("data-filter");
    console.log(filterValue);
    for (let k = 0; k < totalPortfolioItem; k++) {
      if (filterValue === portfolioItems[k].getAttribute("data-category")) {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      } else {
        portfolioItems[k].classList.add("hide");
        portfolioItems[k].classList.remove("show");
      }
      if(filterValue === 'all') {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      }
    }
  });
}

const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPalette = document.querySelectorAll(".choose-color span");

const root = document.querySelector(":root");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

const openThemeModal = () => {
  themeModal.style.display = "grid";
};

const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};

theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);

const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");
    if (size.classList.contains("font-size-1")) {
      fontSize = "12px";
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "14px";
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "18px";
    }

    document.querySelector("html").style.fontSize = fontSize;
  });
});

const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};

colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primaryHue;
    
    changeActiveColorClass();
    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
    }
    color.classList.add("active");
    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

const saveThemeSettings = () => {
  localStorage.setItem('theme-lightness', lightColorLightness);
  localStorage.setItem('theme-white-lightness', whiteColorLightness);
  localStorage.setItem('theme-dark-lightness', darkColorLightness);
};

const applySavedThemeSettings = () => {
  lightColorLightness = localStorage.getItem('theme-lightness') || '92%';
  whiteColorLightness = localStorage.getItem('theme-white-lightness') || '100%';
  darkColorLightness = localStorage.getItem('theme-dark-lightness') || '17%';
  changeBG();
};

// Apply saved theme on page load
applySavedThemeSettings();

Bg1.addEventListener("click", () => {
  lightColorLightness = "92%";
  whiteColorLightness = "100%";
  darkColorLightness = "17%";

  Bg1.classList.add("active");
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
  saveThemeSettings();
});

Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  Bg2.classList.add("active");
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
  saveThemeSettings();
});

Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  Bg3.classList.add("active");
  Bg2.classList.remove("active");
  Bg1.classList.remove("active");
  changeBG();
  saveThemeSettings();
});


