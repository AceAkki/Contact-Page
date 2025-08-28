


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

    5
    if (m1024.matches) {
      form.classList.add("hide");     
    } else if (m360.matches) {
      form.classList.remove("hide");     
      mobileDropdown(headerButton, headerLinks);   

    }


    // classForm.formDropDown("#queryBtn","#queryType", "hide");
    // classForm.formChecked("#queryType", ".form-item", "checked", "hide");
    classForm.formDropDown(form, ".form-select", ".form-group", ".form-options", "hide");
    classForm.formChecked(form, ".form-options", ".form-item", "checked", "hide");

    document.querySelector(".button-map").addEventListener("click", ()=> {
      form.classList.remove("hide");
    })
    document.querySelector(".cancel-btn").addEventListener("click", ()=> {
      form.classList.add("hide"); 
    })
});
})()

class Form {
  formDropDown (form, btnSelector, parentSelector, elemSelector, classToToggle) {
    form.addEventListener("click", (e)=> {
      if(e.target.closest(btnSelector)) {
        this.toggleClass (e.target.closest(btnSelector).closest(parentSelector).querySelector(elemSelector), classToToggle)
      }
    }) 
  }

  toggleClass (elem, classToToggle){
    elem.classList.toggle(classToToggle);
  }

  formChecked(form, selector, targetClass, checkClass, classToToggle) {
    form.addEventListener("click", (e)=> {
      if(e.target.closest(selector)) {
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
            this.toggleClass(document.querySelector(selector), classToToggle);
            this.createOptions(document.querySelector(selector).parentNode.parentNode, targetItem.closest(".form-group"), targetValue)
          }, 2000)
        }

      }
      }
    })
    //  document.querySelector().addEventListener("click", (e) => {
     
    // });
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
    targetGroup.appendChild(targetOptions);

    Array.from([...Array(8).keys()]).forEach(num => {
      if (num > 0) {
        let elmOption = document.createElement("div");
        elmOption.classList.add("form-item");
        elmOption.setAttribute("data-value",`${targetValue}-${num}`);
        let optionSpan = document.createElement("span");
        optionSpan.textContent = `${targetValue}-${num}`;
        targetOptions.appendChild(elmOption);
        elmOption.appendChild(optionSpan);

      }
    })

    
    classForm.formDropDown(".form-select", ".form-group", ".form-options", "hide");
    classForm.formChecked(".form-options", ".form-item", "checked", "hide");
    
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

