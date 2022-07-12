const headerEl = document.getElementById("header");
const listSlide = document.getElementsByClassName("slide");
const listPage = document.getElementsByClassName("slide-page");
const preSlide = document.getElementById("preSlide");
const nextSlide = document.getElementById("nextSlide");
let currentPage = 0;

const resetPage = () => {
  for (let i = 0; i < listPage.length; i++) {
    listPage[i].classList.remove("active");
  }
  for (let i = 0; i < listSlide.length; i++) {
    listSlide[i].classList.remove("active");
  }
};

const changePage = (state) => {
  switch (state) {
    case "next":
      currentPage++;
      if (currentPage > 2) {
        currentPage = 0;
      }
      break;
    case "prev":
      currentPage--;
      if (currentPage < 0) {
        currentPage = 2;
      }
      break;
    default:
      currentPage = state;
  }
};

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    headerEl.classList.add("shrink");
  } else {
    headerEl.classList.remove("shrink");
  }
});

// auto change
setInterval(() => {
  changePage("next");
  resetPage();
  listPage[currentPage].classList.add("active");
  listSlide[currentPage].classList.add("active");
}, 5000);
// Change slide
preSlide.addEventListener("click", () => {
  changePage("prev");
  resetPage();
  listPage[currentPage].classList.add("active");
  listSlide[currentPage].classList.add("active");
});
nextSlide.addEventListener("click", () => {
  changePage("next");
  resetPage();
  listPage[currentPage].classList.add("active");
  listSlide[currentPage].classList.add("active");
});

for (let i = 0; i < listSlide.length; i++) {
  listPage[i].addEventListener("click", () => {
    changePage(i);
    resetPage();
    listPage[currentPage].classList.add("active");
    listSlide[currentPage].classList.add("active");
  });
}

let el_to_show = document.querySelectorAll(".show-on-scroll");

let scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const isElInViewPort = (el) => {
  let rect = el.getBoundingClientRect();

  let distance = 200;
  console.log(rect);
  return (
    rect.top <=
    (window.innerHeight - distance ||
      document.documentElement.clientHeight - distance)
  );
};

const loop = () => {
  el_to_show.forEach((el) => {
    if (isElInViewPort(el)) el.classList.add("show");
  });

  scroll(loop);
};

loop();
