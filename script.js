$(document).ready(function() {

// const interleaveOffset = 0.5;

const mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  // loop: true,
  speed: 1200,
  slideToClickedSlide: true,
  forceToAxis: true,
  // slidePerView: "auto",
  // freeMode: {
  //   enabled: true,
  // },
  // grabCursor: true,
  // slidesPerView: 'auto',
  mousewheel: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    slideChangeTransitionStart: function() {
      gsap.to($(".cgi-desc"), 0.4, {autoAlpha: 1, y: 400, ease: Power1.easeIn});
    },
    slideChangeTransitionEnd: function() {
      gsap.to($(".cgi-desc"), 0.4, {autoAlpha: 0, y: 400, ease: Power1.easeIn});
    }
    // progress: function() {
    //   var swiper = this;
    //   for (var i = 0; i < swiper.slides.length; i++) {
    //     var slideProgress = swiper.slides[i].progress;
    //     var innerOffset = swiper.width * interleaveOffset;
    //     var innerTranslate = slideProgress * innerOffset;
    //     swiper.slides[i].querySelector(".slide-inner").style.transform =
    //       "translate3d(" + innerTranslate + "px, 0, 0)";
    //   }      
    // },
    // touchStart: function() {
    //   var swiper = this;
    //   for (var i = 0; i < swiper.slides.length; i++) {
    //     swiper.slides[i].style.transition = "";
    //   }
    // },
    // setTransition: function(speed) {
    //   var swiper = this;
    //   for (var i = 0; i < swiper.slides.length; i++) {
    //     swiper.slides[i].style.transition = speed + "ms";
    //     swiper.slides[i].querySelector(".slide-inner").style.transition =
    //       speed + "ms";
    //   }
    // },

    // activeIndex: function () {
    //   console.log(this, 'ini index')
    // },

    // slideChangeTransitionStart: function () {
    //   // Slide captions
    //   var swiper = this;
    //   setTimeout(function () {
    //     var currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
    //     var currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
        
    //   }, 500);
    //   gsap.to($(".current-title"), 0.4, {autoAlpha: 0, y: -40, ease: Power1.easeIn});
    //   gsap.to($(".current-subtitle"), 0.4, {autoAlpha: 0, y: -40, delay: 0.15, ease: Power1.easeIn});
    //   gsap.to($(".swiper-slide-active h1.branding"), 0.4, {
    //     rotation:0, left: '50', bottom: '90', ease:Linear.easeNone
    //   })
    // },

    // slideChangeTransitionStart: index => {
    //   console.log(index.snapIndex); 
    //   let currentIndex = $(index.activeIndex);
    //   console.log(currentIndex);
    //   gsap.fromTo($(".swiper-slide-active h1"), 0.4, {
    //     rotation:-90, left: '50', bottom: '90', ease:Linear.easeNone
    //   }, {
    //     rotation:0, left: '50', bottom: '90', ease:Linear.easeNone
    //   })
    // },

    // slideChangeTransitionEnd: function () {
    //   // Slide captions
    //   var swiper = this;
    //   var currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
    //   var currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
    //   $(".slide-captions").html(function() {
    //     return "<h2 class='current-title'>" + currentTitle + "</h2>" + "<h3 class='current-subtitle'>" + currentSubtitle + "</h3>";
    //   });   
    //   gsap.from($(".current-title"), 0.4, {autoAlpha: 0, y: 40, ease: Power1.easeOut});
    //   gsap.from($(".current-subtitle"), 0.4, {autoAlpha: 0, y: 40, delay: 0.15, ease: Power1.easeOut});
    //   gsap.to($(".swiper-slide-active h1"), 0.4, {rotation:90, left: '50', ease: Power1.easeIn});
    // },
  },
});

TweenLite.set("body", {
  opacity: 1,
});

mySwiper.mousewheel.enable()
gsap.config({nullTargetWarn: false});

const navBtnWrapper = document.querySelector(".nav__btn__wrapper");
const navBtnFirst = document.querySelectorAll(".nav__toggle:first-child");
const navBtnLast = document.querySelectorAll(".nav__toggle:last-child");
const navBtnMiddle = document.querySelectorAll(".nav__toggle:nth-child(2)");
const navBody = document.querySelector(".nav-body");
const navBodyItems = document.querySelectorAll(".nav-body__item");

const tlBtn = gsap.timeline({ duration: 0.5, paused: true });
tlBtn
  .to(navBtnFirst, {
    rotation: 45,
    transformOrigin: "50% 50%",
    x: -3,
    y: 8,
    backgroundColor: "#565656"
  })
  .to(
    navBtnLast,
    {
      rotation: -45,
      transformOrigin: "-50% 50%",
      x: 5,
      y: 12,
      backgroundColor: "#565656"
    },
    "<"
  )
  .to(navBtnMiddle, { x: -100, opacity: 0 }, "<");

const tlNav = gsap.from(navBody, { paused: true, duration: 0.3, opacity: 0, display:"none" });
const tNavItems = gsap.from(navBodyItems, {
  paused: true,
  duration: 0.8,
  opacity: 0,
  stagger: 0.2,
  y: 500
});

navBtnWrapper.addEventListener("click", () => {
  tlBtn.reversed() ? tlBtn.play() : tlBtn.reverse();
  tlNav.reversed() ? tlNav.play() : tlNav.reverse();
  tNavItems.reversed() ? tNavItems.play() : tNavItems.reverse();
});
})
