"use strict";

/* ==========================================
   ELEMENTS
========================================== */

const loader = document.getElementById("loader");
const progress = document.getElementById("progress");
const cursorGlow = document.getElementById("cursorGlow");
const typing = document.getElementById("typing");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const counters = document.querySelectorAll("[data-target]");

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 700);

});

/* ==========================================
   TYPING EFFECT
========================================== */

const words = [
    "Retail Operations",
    "Inventory Management",
    "Warehouse Operations",
    "Customer Service",
    "MS Excel"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

    const currentWord = words[wordIndex];

    typing.textContent = currentWord.substring(0, charIndex);

    if (!deleting) {

        charIndex++;

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1400);

            return;
        }

    } else {

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typingEffect, deleting ? 40 : 80);

}

typingEffect();

/* ==========================================
   COUNTER
========================================== */

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const about = document.getElementById("about");

    if (!about) return;

    const trigger = about.getBoundingClientRect().top;

    if (trigger > window.innerHeight - 100) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.ceil(target / 100);

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current;

        }, 20);

    });

}

/* ==========================================
   REVEAL
========================================== */

const revealItems = document.querySelectorAll(".reveal");

function revealElements() {

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            item.classList.add("active");

        }

    });

}

/* ==========================================
   CURSOR GLOW
========================================== */

if (window.innerWidth > 900) {

    document.addEventListener("mousemove", e => {

        cursorGlow.style.left = e.clientX + "px";

        cursorGlow.style.top = e.clientY + "px";

    });

}


/* ==========================================
   SCROLL EVENTS
========================================== */

function onScroll() {

    /* Progress */

    const doc = document.documentElement;

    const percent =
        (doc.scrollTop /
            (doc.scrollHeight - doc.clientHeight)) * 100;

    progress.style.width = percent + "%";


    /* Active Nav */

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 200;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

    animateCounters();

    revealElements();

}

window.addEventListener("scroll", onScroll);

/* Run once */

onScroll();



/*=========================================
 JOURNEY ANIMATION
=========================================*/

const timeline =
document.querySelector(".timeline-track");

const timelinePoints =
document.querySelectorAll(".timeline-point");

const journeyCards =
document.querySelectorAll(".journey-card");

function animateJourney(){

    const section =
    document.querySelector("#journey");

    if(!section) return;

    const top =
    section.getBoundingClientRect().top;

    if(top < window.innerHeight-150){

        timeline.classList.add("active");

        timelinePoints.forEach((point,index)=>{

            setTimeout(()=>{

                point.classList.add("active");

            },index*180);

        });

        journeyCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.classList.add("show");

            },250+(index*120));

        });

    }

}

window.addEventListener("scroll",animateJourney);

animateJourney();
