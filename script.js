// select elements
const features = document.querySelectorAll('.feature');
const displaytexts = document.querySelectorAll('.display-text')
const navSqrs = document.querySelectorAll('.nav-link-group img');
const header = document.querySelector('header');
const qFrames = document.querySelectorAll('.q-frame');
const blackSection = document.getElementById('black-section');
const footerLinks = document.querySelector("#footer-links");
const footerLink = document.querySelectorAll(".footer-link");
const footer = document.querySelector("footer");
const captions = document.querySelectorAll(".caption");
const body = document.querySelectorAll('body');
const headerAll = document.querySelectorAll('#new-wordmark img, #subheader-1, #subheader-2, #subheader-3,  #header-info');
const skewTargets = document.querySelectorAll('.skewer');
const skewTargets2 = document.querySelectorAll('.skewer2');
const sound = document.getElementById('hover-sound');
const asound = document.getElementById('a-sound');
const assound = document.getElementById('as-sound');
const bsound = document.getElementById('b-sound');
const csound = document.getElementById('c-sound');
const cssound = document.getElementById('cs-sound');
const dsound = document.getElementById('d-sound');
const dssound = document.getElementById('ds-sound');
const esound = document.getElementById('e-sound');
const fsound = document.getElementById('f-sound');
const fssound = document.getElementById('fs-sound');
const gsound = document.getElementById('g-sound');
const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2');
const d3 = document.getElementById('d3');
const d4 = document.getElementById('d4');
const d5 = document.getElementById('d5');
const d6 = document.getElementById('d6');
const d7 = document.getElementById('d7');
const d8 = document.getElementById('d8');
const d9 = document.getElementById('d9');
const d10 = document.getElementById('d10');
const d11 = document.getElementById('d11');
const d12 = document.getElementById('d12');
const d13 = document.getElementById('d13');
const d14 = document.getElementById('d14');
const d15 = document.getElementById('d15');
const d16 = document.getElementById('d16');
const d17 = document.getElementById('d17');
const d18 = document.getElementById('d18');



qFrames.forEach(frame => {
    const elements = frame.querySelectorAll('.q p, .q-square');

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
    });
});

features.forEach(feature => {
    const textElements = feature.querySelectorAll('.display-text p, .display-text img');
    const caption = feature.querySelector('.caption');

    [...textElements, caption].filter(Boolean).forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
    });
});




let allowScroll = false;
document.body.style.overflow = 'hidden';


// scroll reveal

function handleScroll() {
    if (!allowScroll) return;
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // 🌊 HERO FADE OUT
    if (header) {
        const progress = Math.min(scrollY / windowH, 1);
    
        headerAll.forEach((el, i) => {
            // const offset = i * 0.03;
            // const p = Math.max(0, Math.min(1, progress - offset));
        
            // el.style.opacity = Math.max(0, 1 - 4*p);
            // el.style.transform = `translateY(${p * -30}px)`;
            const offset = i * 0.03;
            const p = Math.max(0, Math.min(1, progress - offset));
        
            const opacity = Math.max(0, 1 - 4 * p);
        
            el.style.opacity = opacity;
            el.style.transform = `translateY(${p * -30}px)`;
        
            // 👇 toggle pointer events
            if (opacity <= 0.01) {
                el.style.pointerEvents = 'none';
            } else {
                el.style.pointerEvents = 'auto';
            }
        });
    }
    
    // // 🌿 Q-FRAME FADE IN
    // qFrames.forEach(frame => {
    //     const rect = frame.getBoundingClientRect();
    //     const triggerPoint = windowH * 0.8;
    
    //     const distance = triggerPoint - rect.top;
    //     const progress = Math.max(0, Math.min(1, distance / 200));
    
    //     frame.style.opacity = progress;
    //     frame.style.transform = `translateY(${(1 - progress) * 40}px)`;
    // });

    features.forEach(feature => {
        const rect = feature.getBoundingClientRect();
        const offsetTop = rect.top + scrollY;

        const img = feature.querySelector(':scope > img');
        const text = feature.querySelector('.display-text');

        // how far the section is from center of screen
        const progress = (scrollY + windowH - offsetTop) / (windowH + rect.height);

        // clamp between 0–1
        const clamped = Math.max(0, Math.min(1, progress));

        // 🌊 parallax movement
        if (img) {
            const rect = feature.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const screenCenter = window.innerHeight / 2;
        
            const distance = sectionCenter - screenCenter;
        
            const speed = 0.15; // smaller = more subtle
            const y = -distance * speed;
        
            img.style.transform = `translateY(${y}px)`;
        }

        if (text) {
            text.style.transform = `translateY(${clamped * -60}px)`; // faster (opposite direction feels nicer)
        }
    });
}



// parallax

window.addEventListener('scroll', handleScroll);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        const el = entry.target;

        // footer links
        if (el.id === "footer-links") {
            const elements = el.querySelectorAll('.footer-link');

            if (entry.isIntersecting) {
                anime({
                    targets: elements,
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(80)
                });
            } else {
                anime({
                    targets: elements,
                    translateY: [0, 40],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: 600,
                    delay: anime.stagger(50)
                });
            }
        }

        // Q-FRAME
        if (el.classList.contains('q-frame')) {
            const elements = el.querySelectorAll('.q p, .q-square');

            if (entry.isIntersecting) {
                anime({
                    targets: elements,
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(80)
                });
            } else {
                anime({
                    targets: elements,
                    translateY: [0, 40],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: 600,
                    delay: anime.stagger(50)
                });
            }
        }

        // FEATURE
        if (el.classList.contains('feature')) {
            const textElements = el.querySelectorAll('.display-text p, .display-text img');
            const caption = el.querySelector('.caption');

            if (entry.isIntersecting) {
                anime({
                    targets: textElements,
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 900,
                    delay: anime.stagger(80)
                });

                if (caption) {
                    anime({
                        targets: caption,
                        translateY: [40, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 900,
                        delay: 500
                    });
                }

            } else {
                anime({
                    targets: [...textElements, caption].filter(Boolean),
                    translateY: [0, 40],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: 600
                });
            }
        }
    });
}, {
    threshold: 0.5
});

const blackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        const el = entry.target;

        if (el.id === "black-section") {
            if (entry.isIntersecting) {
                if (el.dataset.active === "true") return;
                el.dataset.active = "true";
                anime ({
                    targets: body,
                    backgroundColor: "#000000",
                    easing: "easeOutExpo",
                    duration: 800
                });
                anime ({
                    targets: ["#last-q",".nav-link-group"],
                    color: "#FFFFFF",
                    easing: "easeOutExpo",
                    duration: 800
                });
                document.querySelector("#last-q img").src="images/square-white.png";
                anime ({
                    targets: body,
                    cursor: "url('images/cursor.svg'), auto"
                });
                navSqrs.forEach(sqr => {
                    sqr.src="images/square-white.png";
                });
                document.body.style.cursor = "url('images/cursor-white.svg'), auto";
            } else {
                if (el.dataset.active === "false") return;
                el.dataset.active = "false";
                anime ({
                    targets: body,
                    backgroundColor: "#FFFFFF",
                    easing: "easeOutExpo",
                    duration: 800
                });
                anime ({
                    targets: ["#last-q",".nav-link-group"],
                    color: "#000000",
                    easing: "easeOutExpo",
                    duration: 800
                });
                anime ({
                    targets: [".nav-link-group:hover"],
                    outline: "#000000 1px solid",
                    easing: "easeOutExpo",
                    duration: 800
                });
                document.querySelector("#last-q img").src="images/favicon.png";
                navSqrs.forEach(sqr => {
                    sqr.src="images/favicon.png";
                });
                document.body.style.cursor = "url('images/cursor.svg'), auto";
            }
        }

    });
});

features.forEach(feature => {
    observer.observe(feature);
});

qFrames.forEach(qFrame => {
    observer.observe(qFrame);
})

observer.observe(footerLinks);

blackObserver.observe(blackSection);



// initial reveal

window.addEventListener('load', () => {

    window.scrollTo(0, 0);


    setTimeout(() => {
        anime({
            targets: ["#letter-s", "#letter-u", "#letter-p", "#letter-e", "#letter-r", "#letter-t", "#letter-o", "#letter-n", "#letter-i", "#letter-c", "#letter-su", "#letter-nobashibou-1", "#letter-pa", "#letter-nobashibou-2", "#letter-to", "#letter-ni", "#letter-xtu", "#letter-ku"],
            translateY: [0, 0],
            opacity: [ 0, 1 ],
            easing: 'easeOutExpo',
            duration: 4000,
            delay: anime.stagger(100)
        });
    }, 200);

    setTimeout(() => {
        anime({
            targets: ["#letter-s", "#letter-p", "#letter-r", "#letter-o", "#letter-c", "#letter-su", "#letter-pa", "#letter-to", "#letter-xtu"],
            skewY: [ -30, 0 ],
            easing: 'easeInOutExpo',
            duration: 1200,
            delay: anime.stagger(200)
        });
    }, 200);
    setTimeout(() => {
        anime({
            targets: ["#letter-u", "#letter-e", "#letter-t", "#letter-n", "#letter-i", "#letter-nobashibou-1", "#letter-nobashibou-2", "#letter-ni", "#letter-ku"],
            skewY: [ 30, 0 ],
            easing: 'easeInOutExpo',
            duration: 1200,
            delay: anime.stagger(200)
        });
    }, 300);


    setTimeout(() => {
        anime({
            targets: [
                '#subheader-1', "#subheader-2", "#subheader-3"
            ],
            opacity: [0, 1],
            translateY: [40, 0],
            easing: 'easeOutExpo',
            duration: 4000,
            delay: anime.stagger(300)
        });
    }, 2800);

    setTimeout(() => {
        anime({
            targets: '#header-info',
            opacity: [0, 1],
            translateY: [40, 0],
            easing: 'easeOutExpo',
            duration: 4000,
            delay: anime.stagger(300)
        });
    }, 4000);

    anime({
        targets: 'nav',
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2500,
        delay: 4000
    });

    setTimeout(() => {
        allowScroll = true;
        document.body.style.overflow = '';
    }, 7000);

});


skewTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // anime.remove(el); // stop any running animation
        anime({
            targets: el,
            skewY: -15,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });

    el.addEventListener('mouseleave', () => {
        anime.remove(el);
        anime({
            targets: el,
            skewY: 0,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

skewTargets2.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // anime.remove(el); // stop any running animation
        anime({
            targets: el,
            skewY: 15,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });

    el.addEventListener('mouseleave', () => {
        anime.remove(el);
        anime({
            targets: el,
            skewY: 0,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});


footerLink.forEach (el => {
    el.addEventListener("mouseenter", () => {
        anime({
            targets: el,
            opacity: [1,0.6],
            duration: 100,
            easing: 'easeOutExpo'
        });
    });

    el.addEventListener('mouseleave', () => {
        anime({
            targets: el,
            opacity: [0.6, 1],
            duration: 100,
            easing: 'easeOutExpo'
        });
    });
});


captions.forEach (el => {
    el.addEventListener("mouseenter", () => {
        anime({
            targets: ".caption-arrow",
            translateX: [0,10],
            duration: 200,
            easing: 'easeOutExpo'
        });
    });

    el.addEventListener('mouseleave', () => {
        anime({
            targets: ".caption-arrow",
            translateX: [10,0],
            duration: 200,
            easing: 'easeOutExpo'
        });
    });
});

footer.addEventListener("mouseenter", () => {
    document.body.style.cursor = "url('images/cursor.svg'), auto";
});
footer.addEventListener("mouseleave", () => {
    document.body.style.cursor = "url('images/cursor-white.svg'), auto";
});


document.getElementById('letter-s').addEventListener('mouseenter', () => {
    const s = d1.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-u').addEventListener('mouseenter', () => {
    const s = d2.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-p').addEventListener('mouseenter', () => {
    const s = d3.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-e').addEventListener('mouseenter', () => {
    const s = d4.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-r').addEventListener('mouseenter', () => {
    const s = d5.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-t').addEventListener('mouseenter', () => {
    const s = d6.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-o').addEventListener('mouseenter', () => {
    const s = d7.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-n').addEventListener('mouseenter', () => {
    const s = d8.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-i').addEventListener('mouseenter', () => {
    const s = d9.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-c').addEventListener('mouseenter', () => {
    const s = d10.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-su').addEventListener('mouseenter', () => {
    const s = d11.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-nobashibou-1').addEventListener('mouseenter', () => {
    const s = d12.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-pa').addEventListener('mouseenter', () => {
    const s = d13.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-nobashibou-2').addEventListener('mouseenter', () => {
    const s = d14.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-to').addEventListener('mouseenter', () => {
    const s = d15.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-ni').addEventListener('mouseenter', () => {
    const s = d16.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-xtu').addEventListener('mouseenter', () => {
    const s = d17.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-ku').addEventListener('mouseenter', () => {
    const s = d18.cloneNode();
    s.volume = 0.2;
    s.play();
});
