(function init() {
  document.addEventListener("DOMContentLoaded", () => {
    let m1024 = window.matchMedia("(min-width:1024px)");
    let m360 = window.matchMedia("(min-width: 360px)");
    getHeaderHeight($(".header-wrap"));
    scrollHeader($(".header-wrap"));

    if (m1024.matches) {
      $(".enquiry-form").classList.add("hide");
    } else {
      $(".enquiry-form").classList.remove("hide");
      mobileDropdown($(".header-btn"), $(".header-links"));
    }

    classForm.formDropDown({
      form:$(".enquiry-form").querySelector("form"),
      btnSelector: ".form-select",
      parentSelector: ".form-group",
      elemSelector: ".form-options",
      classToToggle:"hide"});
    classForm.formChecked({
      form:$(".enquiry-form").querySelector("form"),
      selector:".form-options",
      targetClass:".form-item",
      checkClass:"checked",
      classToToggle:"hide"});

    $(".button-map").addEventListener("click", () => {
      form.classList.remove("hide");
    });
    $(".cancel-btn").addEventListener("click", () => {
      form.classList.add("hide");
    });

  });
})();

function $(selector) {
  return document.querySelector(selector);
}


class Form {
  formDropDown({form, btnSelector, parentSelector, elemSelector, classToToggle}) {
    form.addEventListener("click", (e) => {
      if (e.target.closest(btnSelector)) {
        this.toggleClass(e.target.closest(btnSelector).closest(parentSelector).querySelector(elemSelector),classToToggle);
      }
    });
  }

  toggleClass(elem, classToToggle) {
    elem.classList.toggle(classToToggle);
  }

  formChecked({form, selector, targetClass, checkClass, classToToggle}) {
    let flag = 0;
    form.addEventListener("click", (e) => {
      if (e.target.closest(selector))  {
        if (e.target.closest(targetClass) && !(document.getElementsByClassName(checkClass).length > 0)) {
          let targetItem = e.target.closest(targetClass);
          let targetValue;
          if (targetItem.querySelector("img")) return;
          let createImg = document.createElement("img");
          createImg.src = "img/checkMark.svg";
          targetItem.appendChild(createImg);
          targetItem.classList.add(checkClass);
          targetValue = targetItem.getAttribute("data-value");
          if (!targetValue) return 
          setTimeout(() => {
            this.toggleClass(targetItem.closest(selector), classToToggle);
            if (flag <= 0) {
            document.querySelectorAll(targetClass).forEach((elm) => {
              elm.classList.remove(checkClass);
            });
            // targetItem.querySelector("img").remove();
              this.createOptions(document.querySelector(selector).parentNode.parentNode,targetItem.closest(".form-group"),targetValue);
              flag += 1;
              console.log(flag)
            }
          }, 2000);
        }
      }
    });
  }

  createOptions(mainParent, parentNode, targetValue) {
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

    Array.from([...Array(8).keys()]).forEach((num) => {
      if (num > 0) {
        let elmOption = document.createElement("div");
        elmOption.classList.add("form-item");
        elmOption.setAttribute("data-value", `${targetValue}-${num}`);
        let optionSpan = document.createElement("span");
        optionSpan.textContent = `${targetValue}-${num}`;
        targetOptions.appendChild(elmOption);
        elmOption.appendChild(optionSpan);
      }
    });
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

function mobileDropdown(button, linksElem) {
  button.addEventListener("click", () => {
    linksElem.classList.toggle("dropdown");
    linksElem.parentNode.classList.toggle("desk");
  });
}
