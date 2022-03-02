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

// countdown timer 

let countdown = () => {
    const finalDate = new Date("March 5, 2022 00:00:00").getTime();
    const currDate = new Date().getTime();
    const remainingTime = finalDate - currDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const remainingDays = Math.floor(remainingTime / day);
    const remainingHours = Math.floor((remainingTime % day) / hour);
    const remainingMinutes = Math.floor((remainingTime % hour) / minute);
    const remainingSeconds = Math.floor((remainingTime % minute) / second);

    if(remainingDays<10)
        document.querySelector('.days').innerText = "0" + remainingDays;
    else 
        document.querySelector('.days').innerText = remainingDays;

    if(remainingHours<10)
        document.querySelector('.hours').innerText = "0" + remainingHours;
    else 
        document.querySelector('.hours').innerText = remainingHours;

    if(remainingMinutes<10)
        document.querySelector('.minutes').innerText = "0" + remainingMinutes;
    else 
        document.querySelector('.minutes').innerText = remainingMinutes;

    if(remainingSeconds<10)
        document.querySelector('.seconds').innerText = "0" + remainingSeconds;
    else 
        document.querySelector('.seconds').innerText = remainingSeconds;
}

setInterval(countdown, 1000);

// countdown timer end