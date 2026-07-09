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

/*==================================================
DIGITAL JOURNEY
==================================================*/

const journeyData = {

2015:{
icon:"🌐",
title:"Started My Digital Journey",
desc:"Began learning websites independently by exploring domains, hosting and WordPress.",
tags:["Domains","Hosting","WordPress","HTML"]
},

2016:{
icon:"🖥️",
title:"Website Management",
desc:"Learned cPanel, DNS management, website migration and server management through practical work.",
tags:["cPanel","DNS","Migration","Servers"]
},

2017:{
icon:"🔍",
title:"SEO & Search Engines",
desc:"Focused on organic growth, technical SEO and website optimization.",
tags:["SEO","Keywords","Google","Analytics"]
},

2018:{
icon:"📢",
title:"Digital Marketing",
desc:"Expanded into Facebook Marketing, Google Ads and content strategy.",
tags:["Facebook","Google Ads","Marketing","Content"]
},

2019:{
icon:"🛒",
title:"E-commerce",
desc:"Built WooCommerce stores and explored online business systems.",
tags:["WooCommerce","Products","Payments","Orders"]
},

2020:{
icon:"🐍",
title:"Programming & Automation",
desc:"Started learning Python, Selenium and automation to solve repetitive work.",
tags:["Python","Automation","Selenium","Scraping"]
},

2021:{
icon:"📊",
title:"Excel & Data",
desc:"Worked with reporting, Excel analysis and data organization.",
tags:["Excel","Reports","Data","Analysis"]
},

2022:{
icon:"🎓",
title:"Professional Certification",
desc:"Completed Digital Marketing training while continuing self-learning.",
tags:["Certification","SEO","Ads","Learning"]
},

2023:{
icon:"🏪",
title:"Retail Operations",
desc:"Applied digital thinking in retail operations, inventory and customer service.",
tags:["Inventory","POS","Customer","Retail"]
},

2024:{
icon:"📦",
title:"Inventory & Warehouse",
desc:"Focused on inventory accuracy, warehouse operations and reporting.",
tags:["Warehouse","Inventory","Excel","Reporting"]
},

2025:{
icon:"🤖",
title:"AI & Business Systems",
desc:"Integrated AI tools into research, productivity and business workflows.",
tags:["AI","ChatGPT","Research","Automation"]
},

2026:{
icon:"🚀",
title:"International Career",
desc:"Building an international portfolio while continuously learning new technologies.",
tags:["Portfolio","GitHub","Global Jobs","Growth"]
}

};

const yearButtons=document.querySelectorAll(".year");

const icon=document.getElementById("journeyIcon");
const year=document.getElementById("journeyYear");
const title=document.getElementById("journeyTitle");
const desc=document.getElementById("journeyDescription");
const tags=document.getElementById("journeyTags");

yearButtons.forEach(button=>{

button.addEventListener("click",()=>{

yearButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const data=journeyData[button.dataset.year];

journeyCardAnimation(data,button.dataset.year);

});

});

function journeyCardAnimation(data,selectedYear){

const card=document.querySelector(".journey-card");

card.animate([

{

opacity:0,

transform:"translateY(20px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:350,

fill:"forwards"

});

icon.textContent=data.icon;

year.textContent=selectedYear;

title.textContent=data.title;

desc.textContent=data.desc;

tags.innerHTML="";

data.tags.forEach(tag=>{

const span=document.createElement("span");

span.textContent=tag;

tags.appendChild(span);

});

}
