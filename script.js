$(document).ready(function() {

  // mousewheel control for swipe slider
  $('.swiper-container').on('wheel', function(e){
    if(e.originalEvent.wheelDelta > 0) {
      $('.swiper-button-prev').trigger('click');
    }
    else {
      $('.swiper-button-next').trigger('click');
    }
  });

const interleaveOffset = 0.5;

const mySwiper = new Swiper ('.swiper-container', {
  // direction: 'horizontal',
  // loop: true,
  speed: 1200,
  slideToClickedSlide: true,
  /* mousewheel cuma bisa scroll sekali, gak tau kenapa */
  // mousewheel: true,
  // allowSlideNext: true,
  // allowSlidePrev: true,
  // slidePerView: 'auto',
  draggable: true,
  // freeMode: {
  //   enabled: true,
  // },

  // Navigation arrows
  /* Kalo klik navigasi ini tetep bisa next ke slide selanjutnya */
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    activeIndex: function () {
      console.log(this, 'ini index')
    },

    init: function () {
      gsap.set("body", {
        opacity: 1,
      });      
      // show slides animation when page are loaded
      gsap.from($(".swiper-slide.one"), 1, {autoAlpha: 0, y: -1000, delay: 0.5, ease: Power1.linear});
      gsap.from($(".swiper-slide.two"), 1, {autoAlpha: 0, y: 1000, delay: 0.5, ease: Power1.linear});
      gsap.from($(".swiper-slide.three"), 1, {autoAlpha: 0, y: -1000, delay: 0.5, ease: Power1.linear});
      gsap.from($(".swiper-slide.four"), 1, {autoAlpha: 0, y: 1000, delay: 0.5, ease: Power1.linear});
      
      // remove active class when page started, karena si boss maunya dimulai dengan ukuran gallery yang sama
      $('.swiper-slide').removeClass('swiper-slide-active');
    },
    
    slideChangeTransitionStart: function () {
      $('.swiper-slide').css('transition', '1s easeIn');
      // Slide captions
      const swiper = this;
      setTimeout(function () {
        const currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
        const currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
        
      }, 300);
      gsap.to($(".current-title"), 0.4, {autoAlpha: 0, y: -40, ease: Power1.easeIn});
      gsap.to($(".current-subtitle"), 0.4, {autoAlpha: 0, y: -40, delay: 0.15, ease: Power1.easeIn});
    },

    slideChangeTransitionEnd: function () {
      // Slide captions
      const swiper = this;
      const currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
      const currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
      $(".slide-captions").html(function() {
        return "<h2 class='current-title'>" + currentTitle + "</h2>" + "<h3 class='current-subtitle'>" + currentSubtitle + "</h3>";
      });   
      gsap.from($(".current-title"), 0.4, {autoAlpha: 0, y: 40, ease: Power1.easeOut});
      gsap.from($(".current-subtitle"), 0.4, {autoAlpha: 0, y: 40, delay: 0.15, ease: Power1.easeOut});
    },
  },
});





// mySwiper.mousewheel.enable()
gsap.config({nullTargetWarn: false});

// BEGIN MENU NAV
const navBtnWrapper = document.querySelector(".nav__btn__wrapper");
const navBtnFirst = document.querySelectorAll(".nav__toggle:first-child");
const navBtnLast = document.querySelectorAll(".nav__toggle:last-child");
const navBtnMiddle = document.querySelectorAll(".nav__toggle:nth-child(2)");
const navBody = document.querySelector(".nav-body");
const navBodyItems = document.querySelectorAll(".nav-body__item");

const tlBtn = gsap.timeline({ duration: 0.3, paused: true });
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

const tlNav = gsap.from(navBody, { paused: true, duration: 1, x: 500, display:"none" });
const overlay = document.querySelector('#overlay');
const tlOverlay = gsap.to(overlay, { autoAlpha:0.7, paused: true, duration: 0.5, display:"block", ease: Power1.easeOut });
const tNavItems = gsap.from(navBodyItems, {
  paused: true,
  duration: 0.3,
  opacity: 0,
  stagger: 0.2,
  x: 500
});

navBtnWrapper.addEventListener('click', toggleMenu);

function toggleMenu() {
  tlBtn.reversed() ? tlBtn.play() : tlBtn.reverse();
  tlNav.reversed() ? tlNav.play() : tlNav.reverse();
  tNavItems.reversed() ? tNavItems.play() : tNavItems.reverse();
  tlOverlay.reversed() ? tlOverlay.play() : tlOverlay.reverse();
}

overlay.addEventListener('click', toggleMenu);

})
// END MENU NAV
