$(document).ready(function() {

  let swiperTransitionIsRunning = false;
  const interleaveOffset = 0.5;
  
  const mySwiper = new Swiper ('.swiper-container', {
    slideToClickedSlide: true,
    // spaceBetween: 30,
    // mousewheel:{
    //   invert: false,
    // },
    parallax: true,
    speed: 1000,
    lazy: true,
    centeredSlides: true, 
  
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
  
        gsap.set($(".mask-blur"), {width: "25%", ease: Power1.linear});
        
        // remove active class when page started, karena si boss maunya dimulai dengan ukuran gallery yang sama
        $('.swiper-slide').removeClass('swiper-slide-active');
      },
  
      slideChangeTransitionStart: function () {
        console.log('slideChangeTransitionStart');
        gsap.to($(".mask-blur"), 1, {width: "100%", ease: Power0.easeNone});      
        gsap.from($(".swiper-slide.swiper-slide-active .mask-blur"), 1, {width: "8%", ease: Power0.easeNone});      
        $('.swiper-slide').css('transition', '1s linear');
        // // // Slide captions
        // const swiper = this;
        // setTimeout(function () {
        //   const currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
        //   const currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
          
        // }, 300);
      },
  
      slideNextTransitionStart: function () {
        console.log('slideNextTransitionStart');
      },
  
      slideNextTransitionEnd: function () {
        console.log('slideNextTransitionEnd');
        swiperTransitionIsRunning = false;
      },
  
      slidePreviousTransitionEnd: function () {
        console.log('slidePreviousTransitionEnd');
      },
  
      transitionStart: function() {
        console.log('transitionStart');
        swiperTransitionIsRunning = true;
      },
  
      transitionEnd: function() {
        console.log('transitionEnd');
      },
  
      slideResetTransitionStart: function() {
        console.log('slideResetTransitionStart');
      },
  
      slideResetTransitionEnd: function() {
        console.log('slideResetTransitionEnd');
      },
  
      slideChangeTransitionEnd: function () {
        console.log('slideChangeTransitionEnd');
        swiperTransitionIsRunning = false;
      },
  
      click: function() {
        // benerin bug
        // klo di klik semua callback berakhiran "end" gak pernah dipanggil, jadi
        // value swiperTransitionIsRunning gak pernah false.
        // nah ini cara benerinnya.
        swiperTransitionIsRunning = false;
      },
    },
  });
  
  // mousewheel control for swipe slider
  // Setup isScrolling variable
  var isScrolling;
  var userIsScrolling = false;
  $('.swiper-container').on('wheel', function(e){
    userIsScrolling = true;
    // Clear our timeout throughout the scroll
    window.clearTimeout( isScrolling );
    // Set a timeout to run after scrolling ends
    const lastWheelDelta = e.originalEvent.wheelDelta;
    isScrolling = setTimeout(function() {
      userIsScrolling = false;
      // Run the callback
      console.log( 'Scrolling has stopped.' );
      if(lastWheelDelta >= 3) {
        if (!swiperTransitionIsRunning) {
          mySwiper.slidePrev(0);
        }
      }
      else {
        if (!swiperTransitionIsRunning) {
          mySwiper.slideNext(0);
        }
      }
    }, 66);
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
