import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = document.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    //hide
    hideBasket();
  } else {
    //show
    showBasket();
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

// 검색부분
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600); //searching 클래스 부여 후에 .6s 뒤에 focus함
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  //위에서 showSearch()하면 배열에서 이미 reverse가 진행됐으므로 다시 reverse하면 반대로 애니메이션 적용
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse(); //원래 상태로 되돌려 놓음
  searchInputEl.value = "";
}

// 요소의 가시성 관찰
// 요소의 가시성 관찰 로직!
const io = new IntersectionObserver((entries) => {
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach((entry) => {
    // 사라질 때.
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll(".info");
// 관찰 시작!
infoEls.forEach((el) => io.observe(el));
// const io = new IntersectionObserver(function (entries) {
//   entries.forEach(function (entry) {
//     if (!entries.isInersecting) {
//       return;
//     }
//     entry.target.classList.add("show");
//   });
// });
// const infoEls = document.querySelectorAll(".info");
// infoEls.forEach(function (el) {
//   io.observe(el);
// });

//비디오 재생!
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

//'당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color}"></li>`;
  });

  // itemEl.textContent = '<div style="color: red;">Hello</div>';
  // textContent : 글자 그대로 요소에 추가함.
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <!-- <span class="icon">+</span> -->
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
