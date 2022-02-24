let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();
let textAnimate = new TimelineMax();
let scrollCont = new TimelineMax();
const navCont = document.querySelector(".navbar");
const scrollBtn = document.querySelector(".action");

// hamburger animation 

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".nav-options");

let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navbar.classList.add('show');
        navCont.classList.add('toggle');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navbar.classList.remove('show');
        navCont.classList.remove('toggle');
        menuOpen = false;
    }
});

// reload on brower resize 

jQuery(function($) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $(window).resize(function() {
        if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
            location.reload();
            return;
        }
    });
});

// reload on browser resize end

// Text Animation

textAnimate
    .fromTo(".welcome-text", 4, { opacity: 0 }, { opacity: 1 });

// Text Animation End

// Scroll Page

scrollBtn.addEventListener('click', () => {
    jQuery('html').animate({
        scrollTop: jQuery("#info-section").offset().top
    }, 1500, 'swing');
})

// Scroll Page End

// Parallax Animation

timeline
    .to(".hacker", 3, { y: -300 })
    .to(".table", 3, { y: -400 }, "-=3")
    .fromTo(".background", 3, { y: -50 }, { y: 0, duration: 3 },"-=3")
    .to(".info-container", 3, { top:"0%" }, "-=3");

let scene = new ScrollMagic.Scene({
    triggerElement: ".container",
    duration: "100%",
    triggerHook: 0,
})
    .setTween(timeline)
    .setPin(".container")
    .addTo(controller);

// Parallax Animation End