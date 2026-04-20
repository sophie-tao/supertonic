// select elements
const features = document.querySelectorAll('.feature');
const header = document.querySelector('header');
const qFrames = document.querySelectorAll('.q-frame');
const headerAll = document.querySelectorAll('#new-wordmark img, #subheader-1, #subheader-2, #subheader-3,  #header-info');


// scroll reveal

function handleScroll() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

        // 🌊 HERO FADE OUT
        if (header) {
            const progress = Math.min(scrollY / windowH, 1);
    
            headerAll.forEach((el, i) => {
                const offset = i * 0.03; // stagger delay per letter
                const p = Math.max(0, Math.min(1, progress - offset));
        
                el.style.opacity = 1 - 4*p;
                el.style.transform = `translateY(${p * -30}px)`;
            });
        }
    
        // 🌿 Q-FRAME FADE IN
        qFrames.forEach(frame => {
            const rect = frame.getBoundingClientRect();
            const triggerPoint = windowH * 0.8;
    
            const distance = triggerPoint - rect.top;
            const progress = Math.max(0, Math.min(1, distance / 200));
    
            frame.style.opacity = progress;
            frame.style.transform = `translateY(${(1 - progress) * 40}px)`;
        });

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
        if (entry.isIntersecting) {
            const textElements = entry.target.querySelectorAll('.display-text p, .display-text img');
            const caption = entry.target.querySelector('.caption');
            
            // animate main text
            anime({
                targets: textElements,
                translateY: [40, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1000,
                delay: anime.stagger(120)
            });
            
            // calculate total time of text animation
            const totalTextDelay = (textElements.length - 1) * 120 + 500;
            
            if (caption) {
                anime({
                    targets: caption,
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 1000,
                    delay: totalTextDelay
                });
            }

            observer.unobserve(entry.target); // only animate once
        }
    });
}, {
    threshold: 0.3
});

features.forEach(feature => {
    observer.observe(feature);
});



// initial reveal

window.addEventListener('load', () => {

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
                '#subheader-1', "#subheader-2", "#subheader-3",
                '#header-info'
            ],
            opacity: [0, 1],
            translateY: [40, 0],
            easing: 'easeOutExpo',
            duration: 4000,
            delay: anime.stagger(300)
        });
    }, 2500);

    anime({
        targets: 'nav',
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2500,
        delay: 4000
    });


});