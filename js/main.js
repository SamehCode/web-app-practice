
// set dynamic background image

let landing = document.querySelector(".landing");

let imgsArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
];

let bckOption = true;
let bckInterval;

let bckLocalItem = localStorage.getItem("bck-img");

if (bckLocalItem !== null) {
  if (bckLocalItem == "true") {
    bckOption = true;
    bckLocalItem = true
  } else {
    bckOption = false;
    bckLocalItem = false
  }
  // remove active class from all spans
  document.querySelectorAll(".random-bck span").forEach((e) => {
    e.classList.remove("active");
  });
  if (bckLocalItem === "true") {
    document.querySelector(".random-bck .yes").classList.add("active");
  } else {
    document.querySelector(".random-bck .no").classList.add("active");
  }
}
console.log(bckLocalItem)
console.log(typeof bckLocalItem)

function customizeBackgrounds() {
  if (bckOption === true) {
    let randomNum = Math.floor(Math.random() * imgsArray.length);
    bckInterval = setInterval(() => {
      landing.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
      
    }, 3000);
  }
}

// loop on backgrounds

let bckList = document.querySelectorAll(".random-bck span");

bckList.forEach((span) => {
  span.addEventListener("click", (e) => {
  

    if (span.dataset.bck == "yes") {
      // document.querySelector('.random-bck .yes').classList.add('active')
      bckOption = true;
      localStorage.setItem("bck-option", true);
      customizeBackgrounds()
    } else {
      // document.querySelector('.random-bck .no').classList.add('active')
      bckOption = false;
      clearInterval(bckInterval);
      localStorage.setItem("bck-option", false);
    }
    handleActive(e);
  });
});

// curtain

let settings = document.querySelector(".settings");
let toggle = document.querySelector(".settings .toggle");

toggle.onclick = function () {
  toggle.classList.toggle("fa-spin");
  settings.classList.toggle("open");
};

// check if there is color option in local storage
const mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  // check for active class
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");

    // add active class for element === local storage item
    if (el.dataset.color === localStorage.getItem("color-option")) {
      el.classList.add("active");
    }
  });
}

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set current color to root element
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    handleActive(e);

    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);
  });
});

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSpans = document.querySelectorAll(".skill-box .skill-prog span");
    allSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  } else {
    document
      .querySelectorAll(".skill-box .skill-prog span")
      .forEach((e) => (e.style.width = "0"));
  }
};

// create the popUp Box
let galleryImg = document.querySelectorAll(".gallery img");

galleryImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create the overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "overlay-popup";

    // append overlay to body
    document.body.append(overlay);

    // create the popup
    let popupBox = document.createElement("div");

    // add class to popup
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading element
      let imgHeading = document.createElement("h3");
      imgHeading.style.color = localStorage.getItem("color-option");

      // create the alt text
      let altText = document.createTextNode(img.alt);

      // append alt text to heading element
      imgHeading.append(altText);

      // append heading element to popup box
      popupBox.append(imgHeading);

      // create close span
      let closeSpan = document.createElement("span");

      closeSpan.className = "popup-x";

      closeSpan.textContent = "X";

      popupBox.append(closeSpan);

      closeSpan.onclick = function () {
        popupBox.remove();
        overlay.remove();
      };
    }

    // create the image
    let popupImage = document.createElement("img");

    // add class to image
    popupImage.className = "popup-image";

    // set image src
    popupImage.src = img.src;

    // append image to popup box
    popupBox.append(popupImage);

    // append popupbox to body
    document.body.append(popupBox);
  });
});


let allBullets = document.querySelectorAll(".nav-bullets .bullet");

let allLinks = document.querySelectorAll(".links li a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
// scrollToSomewhere(allLinks);
scrollToSomewhere(allBullets);

// handle active function
function handleActive(ev) {
  // remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  // add active class to current element
  ev.target.classList.add("active");
}

// show / hide nav bullets

let bulletsSpans = document.querySelectorAll('.bullets-option span')
let bulletsContainer = document.querySelector('.nav-bullets')
let bulletsLocalItem = localStorage.getItem('bullets-option')

if(bulletsLocalItem !== null) {
  bulletsSpans.forEach(span => {
    span.classList.remove('active')
  })
  if(bulletsLocalItem == 'block') {
    bulletsContainer.style.display = 'block'

    document.querySelector('.bullets-option .yes').classList.add('active')
  } else {
    bulletsContainer.style.display = 'none'

    document.querySelector('.bullets-option .no').classList.add('active')

  }
}

bulletsSpans.forEach(span => {
  span.addEventListener('click', (e) => {
    span.classList.remove('active')
    if(span.dataset.display == 'show') {
      bulletsContainer.style.display = 'block'
      localStorage.setItem('bullets-option', 'block')
          
    } else {
      bulletsContainer.style.display = 'none'
      
      localStorage.setItem('bullets-option', 'none') 

    }

    handleActive(e)
  
  })

})

// add reset button option
document.querySelector('.settings .reset').onclick = function() {

  // localStorage.clear()

  localStorage.removeItem('bullets-option')
  localStorage.removeItem('bck-option')
  localStorage.removeItem('color-option')


  location.reload()
}

// Toggle menu

let toggleBtn = document.querySelector('.toggle-menu')
let headLinks = document.querySelector('.header .links')

toggleBtn.onclick = function (e) {
  // e.stopPropagation()
  this.classList.toggle('menu-active')
  headLinks.classList.toggle('open')
}


document.body.onclick = function (e) {
  if(e.target !== toggleBtn && e.target !== headLinks) {
    
    if(headLinks.classList.contains('open')) {
      toggleBtn.classList.toggle('menu-active')
      headLinks.classList.toggle('open')
    }

  }
}

headLinks.onclick = function (e) {
  e.stopPropagation()
}

// nav show/hide

let headLi = document.querySelector('.landing .header')
let navChoice = document.querySelector('.nav-option')

navChoice.addEventListener('click', e => {
 e.target.parentElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'))
  if(e.target.dataset.display == 'show') {
    headLi.style = 'position: fixed; background-color: rgb(255 87 34 / 90%); color: var(--main-color);'
    document.querySelector('.nav-option .yes').classList.add('active')
    document.querySelector('.header .logo').style = 'color: white;'
  } else {
    headLi.style = 'position: relative;'
    document.querySelector('.nav-option .no').classList.add('active')

  }
})

