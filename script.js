// select elements
const features = document.querySelectorAll('.feature');
const displaytexts = document.querySelectorAll('.display-text')
const navSqrs = document.querySelectorAll('.nav-link-group img');
const header = document.querySelector('header');
const qFrames = document.querySelectorAll('.q-frame');
const blackSection = document.getElementById('black-section');
const footerLinks = document.querySelectorAll("#footer-links");
const footer = document.querySelector("footer");
const body = document.querySelectorAll('body');
const headerAll = document.querySelectorAll('#new-wordmark img, #subheader-1, #subheader-2, #subheader-3,  #header-info');
const skewTargets = document.querySelectorAll('span.skewer');
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
const gssound = document.getElementById('gs-sound');

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
            const offset = i * 0.03; // stagger delay per letter
            const p = Math.max(0, Math.min(1, progress - offset));
        
            el.style.opacity = Math.max(0, 1 - 4*p);
            el.style.transform = `translateY(${p * -30}px)`;
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
        anime.remove(el); // stop any running animation

        anime({
            targets: el,
            skewY: -10,
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



document.getElementById('letter-s').addEventListener('mouseenter', () => {
    const s = csound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-u').addEventListener('mouseenter', () => {
    const s = cssound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-p').addEventListener('mouseenter', () => {
    const s = dssound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-e').addEventListener('mouseenter', () => {
    const s = fsound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-r').addEventListener('mouseenter', () => {
    const s = fssound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-t').addEventListener('mouseenter', () => {
    const s = gssound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-o').addEventListener('mouseenter', () => {
    const s = assound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-n').addEventListener('mouseenter', () => {
    const s = assound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-i').addEventListener('mouseenter', () => {
    const s = assound.cloneNode();
    s.volume = 0.2;
    s.play();
});
document.getElementById('letter-c').addEventListener('mouseenter', () => {
    const s = assound.cloneNode();
    s.volume = 0.2;
    s.play();
});