


(function init(){
  document.addEventListener("DOMContentLoaded", () => {
    let header = document.querySelector(".header-wrap");
    let headerButton = document.querySelector(".header-btn");
    let headerLinks = document.querySelector(".header-links");
    let form = document.querySelector(".enquiry-form");
    
    let m1024 = window.matchMedia("(min-width:1024px)");
    let m360 = window.matchMedia("(min-width: 360px)");
    getHeaderHeight(header);
    scrollHeader(header);

    
    if (m1024.matches) {
      form.classList.remove("hide");     
    } else if (m360.matches) {
      form.classList.add("hide");     
      mobileDropdown(headerButton, headerLinks);   

    }


    classForm.formDropDown("#queryBtn","#queryType", "hide");
    classForm.formChecked("#queryType", ".form-item", "checked", "hide");


    document.querySelector(".button-map").addEventListener("click", ()=> {
      form.classList.remove("hide");
    })
    document.querySelector(".cancel-btn").addEventListener("click", ()=> {
      form.classList.add("hide"); 
    })
});
})()

class Form {
  formDropDown (btnSelector, elemSelector, classToToggle) {
    document.querySelector(btnSelector).addEventListener("click", () => {
      this.toggleClass (elemSelector, classToToggle)
    });
  }

  toggleClass (elemSelector, classToToggle){
    console.log(elemSelector, classToToggle)
    document.querySelector(elemSelector).classList.toggle(classToToggle);
  }

  formChecked(selector, targetClass, checkClass, classToToggle) {
     document.querySelector(selector).addEventListener("click", (e) => {
      if (e.target.closest(targetClass) && !(document.getElementsByClassName(checkClass).length > 0)) {
        let targetItem = e.target.closest(targetClass);
        let targetValue;
        if (targetItem.querySelector("img")) return;
        let createImg = document.createElement("img");
        createImg.src = "img/checkMark.svg";
        targetItem.appendChild(createImg);
        targetItem.classList.add(checkClass);
        targetValue = targetItem.getAttribute("data-value");    

        if (targetValue) {
          setTimeout( ()=> {
            document.querySelectorAll(targetClass).forEach(elm => { elm.classList.remove(checkClass) });
            targetItem.querySelector("img").remove();
            this.toggleClass(selector, classToToggle);
            this.createOptions(document.querySelector(selector).parentNode.parentNode, targetItem.closest(".form-group"), targetValue)
          }, 2000)
        }

      }
    });
  }

  createOptions(mainParent, parentNode, targetValue){
    let targetGroup = document.createElement("div");
    let targetSelect = document.createElement("div");
    let targetTitle = document.createElement("span");
    targetGroup.classList.add("form-group");
    targetSelect.classList.add("form-select");
    targetTitle.textContent = targetValue;
    mainParent.appendChild(targetGroup);
    mainParent.insertBefore(targetGroup, parentNode.nextSibling);
    targetGroup.appendChild(targetSelect);
    targetSelect.appendChild(targetTitle);

    let targetOptions = document.createElement("div");
    targetOptions.classList.add("form-options", "hide");
    

    

    
  }
  


}
const classForm = new Form();


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

