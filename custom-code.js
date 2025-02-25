// custom-code.js
document.addEventListener('DOMContentLoaded', function () {
    /* ============================================================
       1. Slides (Controle de exibição e navegação)
    ============================================================ */
    (function initializeSlides() {
        const slides = Array.from(document.querySelectorAll('.div-block-76 > div'));
        const leftButton = document.querySelector('.slide-button-left');
        const rightButton = document.querySelector('.slide-button-right');
        let currentIndex = 1;

        function updateSlides(direction = null) {
            if (direction === 'right') {
                currentIndex++;
                if (currentIndex >= slides.length - 1) {
                    currentIndex = 1;
                }
            } else if (direction === 'left') {
                currentIndex--;
                if (currentIndex <= 0) {
                    currentIndex = slides.length - 2;
                }
            }
            slides.forEach((slide, index) => {
                slide.classList.remove('hidden', 'visible', 'slide', 'slide1', 'slide2', 'slide3',
                    'slide4', 'slide5', 'slide6', 'slide7', 'center');
                const headerText = slide.querySelector('.header_slide_txt');
                const centerHeaderText = slide.querySelector('.header_slide_center_txt');
                const slideText = slide.querySelector('.slide_txt');
                const centerSlideText = slide.querySelector('.slide_center_txt');
                if (headerText) headerText.classList.remove('header_slide_center_txt');
                if (centerHeaderText) centerHeaderText.classList.remove('header_slide_center_txt');
                if (slideText) slideText.classList.remove('slide_center_txt');
                if (centerSlideText) centerSlideText.classList.remove('slide_center_txt');
                if (index === currentIndex - 1) {
                    slide.classList.add('slide', 'visible');
                } else if (index === currentIndex) {
                    slide.classList.add('center', 'visible');
                    if (headerText) headerText.classList.add('header_slide_center_txt');
                    if (slideText) slideText.classList.add('slide_center_txt');
                } else if (index === currentIndex + 1) {
                    slide.classList.add('slide', 'visible');
                } else {
                    slide.classList.add('hidden');
                }
                slide.style.margin = slide.classList.contains('center') ? '0 auto' : '';
            });
        }
        if (rightButton) rightButton.addEventListener('click', () => updateSlides('right'));
        if (leftButton) leftButton.addEventListener('click', () => updateSlides('left'));
        updateSlides();
    })();

    /* ============================================================
       2. Botões e "Get Started"
    ============================================================ */
    (function initializeButtons() {
        const container = document.querySelector('.div-block-19');
        if (container) {
            container.addEventListener('click', function (event) {
                const button = event.target.closest('a');
                if (!button) return;
                event.preventDefault();
                const mainButtons = document.querySelectorAll('.div-block-19 a');
                const gsButtons = document.querySelectorAll(
                    '.button_gs_selected, .button_gs_nonselected');
                const divsSelected = document.querySelectorAll(
                    '.div-block-selected, .div-block-nonselected');
                mainButtons.forEach(btn => {
                    btn.classList.remove('button_selected');
                    btn.classList.add('button_nonselected');
                });
                gsButtons.forEach(btn => {
                    btn.classList.remove('button_gs_selected');
                    btn.classList.add('button_gs_nonselected');
                });
                divsSelected.forEach(div => {
                    div.classList.remove('div-block-selected');
                    div.classList.add('div-block-nonselected');
                });
                button.classList.remove('button_nonselected');
                button.classList.add('button_selected');
                const index = Array.from(mainButtons).indexOf(button);
                if (gsButtons[index]) {
                    gsButtons[index].classList.remove('button_gs_nonselected');
                    gsButtons[index].classList.add('button_gs_selected');
                }
                if (divsSelected[index]) {
                    divsSelected[index].classList.remove('div-block-nonselected');
                    divsSelected[index].classList.add('div-block-selected');
                }
            });
        }
        const gsButtons = document.querySelectorAll('.button_gs_selected, .button_gs_nonselected');
        gsButtons.forEach((button, index) => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const mainButtons = document.querySelectorAll('.div-block-19 a');
                const gsButtons = document.querySelectorAll(
                    '.button_gs_selected, .button_gs_nonselected');
                const divsSelected = document.querySelectorAll(
                    '.div-block-selected, .div-block-nonselected');
                mainButtons.forEach(btn => {
                    btn.classList.remove('button_selected');
                    btn.classList.add('button_nonselected');
                });
                gsButtons.forEach(btn => {
                    btn.classList.remove('button_gs_selected');
                    btn.classList.add('button_gs_nonselected');
                });
                divsSelected.forEach(div => {
                    div.classList.remove('div-block-selected');
                    div.classList.add('div-block-nonselected');
                });
                this.classList.remove('button_gs_nonselected');
                this.classList.add('button_gs_selected');
                if (mainButtons[index]) {
                    mainButtons[index].classList.remove('button_nonselected');
                    mainButtons[index].classList.add('button_selected');
                }
                if (divsSelected[index]) {
                    divsSelected[index].classList.remove('div-block-nonselected');
                    divsSelected[index].classList.add('div-block-selected');
                }
            });
        });
    })();

    /* ============================================================
       3. Abas (Tabs)
    ============================================================ */
    (function initializeTabs() {
        const buttons = document.querySelectorAll(".tabs-section .w-button");

        function updateSelectedButton(selectedButton) {
            buttons.forEach((button) => {
                button.classList.remove("button_cgi_tab", "button_3dmod_tab", "button_ar_tab",
                    "button_motion_tab", "button_uxi_tab", "button_selected_tab");
                if (button !== selectedButton && button.dataset.originalClass) {
                    button.classList.add(button.dataset.originalClass);
                }
            });
            selectedButton.classList.remove("button_cgi_tab", "button_3dmod_tab", "button_ar_tab",
                "button_motion_tab", "button_uxi_tab");
            selectedButton.classList.add("button_selected_tab");
        }
        buttons.forEach((button) => {
            button.dataset.originalClass = Array.from(button.classList).find(cls => [
                "button_cgi_tab", "button_3dmod_tab", "button_ar_tab", "button_motion_tab",
                "button_uxi_tab"
            ].includes(cls));
        });
        const firstButton = document.querySelector(".tabs-section .button_cgi_tab");
        if (firstButton) updateSelectedButton(firstButton);
        buttons.forEach((button) => {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                updateSelectedButton(button);
            });
        });
    })();

    /* ============================================================
       4. Animações com Anime.js e separação de texto (.tricks)
    ============================================================ */
    (function initializeAnimations() {
        const tricksWords = document.getElementsByClassName("tricks");
        for (let i = 0; i < tricksWords.length; i++) {
            const wordWrap = tricksWords.item(i);
            wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
                '$1<span class="tricksword">$2</span>');
        }
        const tricksLetters = document.getElementsByClassName("tricksword");
        for (let i = 0; i < tricksLetters.length; i++) {
            const letterWrap = tricksLetters.item(i);
            letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }
        const slideIn = anime.timeline({
            loop: false,
            autoplay: false
        });
        slideIn.add({
            targets: '.slide-in .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 2250,
            delay: (el, i) => 150 * (i + 1)
        });
        const slideUp = anime.timeline({
            loop: false,
            autoplay: false
        });
        slideUp.add({
            targets: '.slide-up .letter',
            translateY: ["1.1em", 0],
            opacity: [0, 1],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.slide-up',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
        const fadeUp = anime.timeline({
            loop: false,
            autoplay: true
        });
        fadeUp.add({
            targets: '.fade-up .letter',
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: (el, i) => 300 + 30 * i
        });
        const rotateIn = anime.timeline({
            loop: false,
            autoplay: false
        });
        rotateIn.add({
            targets: '.rotate-in .letter',
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            duration: 750,
            easing: "easeOutExpo",
            delay: (el, i) => 50 * i
        }).add({
            targets: '.rotate-in',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
        const popIn = anime.timeline({
            loop: false,
            autoplay: false
        });
        popIn.add({
            targets: '.pop-in .letter',
            scale: [0, 1],
            duration: 500,
            elasticity: 300,
            delay: (el, i) => 45 * (i + 1)
        });
        fadeUp.play();
        slideUp.play();
        slideIn.play();
        rotateIn.play();
        popIn.play();
    })();

    /* ============================================================
       5. Carousel com GSAP e ScrollTrigger
    ============================================================ */
    (function initializeCarousel() {
        $("[carousel='component']").each(function () {
            let componentEl = $(this);
            let wrapEl = componentEl.find("[carousel='wrap']");
            let itemEl = wrapEl.children().children();
            let panelEl = componentEl.find("[carousel='panel']");
            let nextEl = componentEl.find("[carousel='next']");
            let prevEl = componentEl.find("[carousel='prev']");
            let rotateAmount = 360 / itemEl.length;
            let zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
            let negTranslate =
                `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
            let posTranslate =
                `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;
            wrapEl.css("--3d-carousel-z", negTranslate);
            wrapEl.css("perspective", posTranslate);
            gsap.to(wrapEl, {
                opacity: 1
            });
            itemEl.each(function (index) {
                $(this).css("transform",
                    `rotateY(${rotateAmount * index}deg) translateZ(${posTranslate})`);
            });
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentEl,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
            tl.fromTo(wrapEl, {
                "--3d-carousel-rotate": 0
            }, {
                "--3d-carousel-rotate": -(360 - rotateAmount),
                duration: 30,
                ease: "none"
            });
            let activePanel;
            let animating = false;

            function makePanelActive(activeItem) {
                activePanel = activeItem;
                if (!activePanel.next().length) {
                    nextEl.addClass("is-disabled");
                } else {
                    nextEl.removeClass("is-disabled");
                }
                if (!activePanel.prev().length) {
                    prevEl.addClass("is-disabled");
                } else {
                    prevEl.removeClass("is-disabled");
                }
            }
            makePanelActive(panelEl.first());

            function scrollToActive() {
                animating = true;
                $("html, body").animate({
                    scrollTop: activePanel.offset().top
                }, 600, function () {
                    animating = false;
                });
            }
            panelEl.each(function () {
                ScrollTrigger.create({
                    trigger: $(this),
                    start: "top center",
                    end: "bottom center",
                    onToggle: ({
                        isActive
                    }) => {
                        if (isActive) {
                            makePanelActive($(this));
                        }
                    }
                });
            });
            nextEl.on("click", function () {
                if (activePanel.next().length && !animating) {
                    makePanelActive(activePanel.next());
                    scrollToActive();
                }
            });
            prevEl.on("click", function () {
                if (activePanel.prev().length && !animating) {
                    makePanelActive(activePanel.prev());
                    scrollToActive();
                }
            });
        });
    })();

    /* ============================================================
       6. Loop contínuo para Slider Mobile
    ============================================================ */
    (function initializeContinuousSlider() {
        const mobileSlider = document.querySelector('.slider-content_artsmobile');
        if (!mobileSlider) {
            console.log("Container '.slider-content_artsmobile' não encontrado");
            return;
        }
        const sliderTrack = mobileSlider.querySelector('.slider-3');
        if (!sliderTrack) {
            console.log("Elemento '.slider-3' não encontrado");
            return;
        }
        const originalSlides = Array.from(sliderTrack.children);
        originalSlides.forEach(slide => {
            sliderTrack.appendChild(slide.cloneNode(true));
        });
        sliderTrack.style.display = 'flex';
        setTimeout(() => {
            const totalWidth = sliderTrack.scrollWidth / 2;
            const slideWidth = originalSlides[0].offsetWidth;
            const speed = 50; // pixels por segundo
            const fullDuration = totalWidth / speed;
            let continuousTween = gsap.to(sliderTrack, {
                duration: fullDuration,
                x: "-=" + totalWidth,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.wrap(-totalWidth, 0)
                }
            });
            let touchStartX = null;
            let touchDelta = 0;
            mobileSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            mobileSlider.addEventListener('touchmove', (e) => {
                if (touchStartX === null) return;
                let currentX = e.touches[0].clientX;
                touchDelta = currentX - touchStartX;
            });
            mobileSlider.addEventListener('touchend', () => {
                if (touchStartX === null) return;
                const threshold = 50;
                if (Math.abs(touchDelta) > threshold) {
                    let currentTweenX = gsap.getProperty(sliderTrack, "x");
                    currentTweenX += (touchDelta < 0 ? -slideWidth : slideWidth);
                    currentTweenX = gsap.utils.wrap(-totalWidth, 0, currentTweenX);
                    if (continuousTween) continuousTween.kill();
                    gsap.set(sliderTrack, {
                        x: currentTweenX
                    });
                    const remainingDistance = totalWidth - Math.abs(currentTweenX);
                    const remainingDuration = remainingDistance / speed;
                    continuousTween = gsap.to(sliderTrack, {
                        duration: remainingDuration,
                        x: "-=" + remainingDistance,
                        ease: "none",
                        repeat: -1,
                        modifiers: {
                            x: gsap.utils.wrap(-totalWidth, 0)
                        }
                    });
                }
                touchStartX = null;
                touchDelta = 0;
            });
        }, 500);
    })();
});

/* Código p5.js para a animação de pontos no canvas */
const dotSize = 3;
const spacing = dotSize * 8;
const areaOfEffect = 64;
let dots = [];

function setup() {
    const cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');
    for (let i = 0; i < width; i += spacing) {
        for (let j = 0; j < height; j += spacing) {
            dots.push(new Dot(i + spacing / 2, j + spacing / 2, dotSize));
        }
    }
    noStroke();
}

function draw() {
    background(255);
    dots.forEach(dot => {
        dot.update();
        dot.render();
    });
}
let mouseIsMoving = false;

function mouseMoved() {
    mouseIsMoving = true;
    setTimeout(() => mouseIsMoving = false, 100);
}
class Dot {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.transparency = 40;
    }
    update() {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (mouseIsMoving && distance < areaOfEffect) {
            this.transparency = 255;
        } else {
            this.transparency = max(40, this.transparency - 10);
        }
    }
    render() {
        fill(200, 200, 200, this.transparency);
        ellipse(this.x, this.y, this.size);
    }
}
