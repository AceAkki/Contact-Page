

let m1024 = window.matchMedia("(min-width:1024px)");
let m360 = window.matchMedia("(min-width: 360px)");

class Form {

  formDropDown (btnSelector, listSelector) {
    document.querySelector(btnSelector).addEventListener("click", () => {
      document.querySelector(listSelector).classList.toggle("hide");
    });
  }

  formChecked(selector) {
     document.querySelector(selector).addEventListener("click", (e) => {
      if (e.target.closest(".form-item")) {
        if (!e.target.closest(".form-item").querySelector("img")) {
          let createImg = document.createElement("img");
          createImg.src = "img/checkMark.svg";
          e.target.closest(".form-item").appendChild(createImg);
        }
      }
    });
  }

}
const classForm = new Form();

document.addEventListener("DOMContentLoaded", documentLoaded());


function documentLoaded() {
    let header = document.querySelector(".header-wrap");
    let headerButton = document.querySelector(".header-btn");
    let headerLinks = document.querySelector(".header-links");
    let form = document.querySelector(".enquiry-form");

    getHeaderHeight(header);
    scrollHeader(header);

    
    if (m1024.matches) {
      form.classList.remove("hide");     
    } else if (m360.matches) {
      form.classList.add("hide");     
      mobileDropdown(headerButton, headerLinks);   

    }


    classForm.formDropDown("#queryBtn","#queryType");
    classForm.formDropDown("#projectBtn","#projectType");
    classForm.formChecked("#queryType");
    classForm.formChecked("#projectType");


    document.querySelector(".button-map").addEventListener("click", ()=> {
      form.classList.remove("hide");
    })
}


function getHeaderHeight(header) {
  let headerHeight = header.getBoundingClientRect().height;
  const root = document.documentElement;
  root.style.setProperty("--header-height", `${headerHeight + 40}px`);
  console.log(headerHeight);
}

function scrollHeader(header) {
    window.addEventListener("scroll", (e) => {
    let scrollPos = window.scrollY;
    if (scrollPos >= 10) {
      header.style.padding = "1rem 0";
      header.classList.add("glass");
    } else {
      header.style.padding = "0 0 1rem";
      header.classList.remove("glass");
    }
  });
}

function mobileDropdown(button, linksElem){
  button.addEventListener("click", () => {
    linksElem.classList.toggle("dropdown");
    linksElem.parentNode.classList.toggle("desk");
  });
}

