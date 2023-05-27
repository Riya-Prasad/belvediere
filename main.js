// faq
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.config({ trialWarn: false });

// nav bg change
ScrollTrigger.create({
  trigger: ".hero-subhead",
  start: "top 40%",
  endTrigger: ".footer",
  end: "top 70%",
  // markers: true,
  toggleClass: {
    targets: ".primary-header",
    className: "primary-header-active",
  },
});

// nav-link animation
ScrollTrigger.create({
  animation: gsap.from(".nav-list li", {
    yPercent: -250,
    // delay: 1,
    stagger: 0.252,
    duration: 1.3,
  }),
  trigger: ".primary-header",
  start: "top 30%",
  ease: "power3.easeInOut",
  // markers: true,
});

// main-heading animation
ScrollTrigger.create({
  animation: gsap.from(".hero-heading", {
    y: "45vh",
    scale: 3,
    yPercent: -200,
  }),
  scrub: true,
  trigger: ".hero-img",
  start: "top bottom",
  endTrigger: ".hero-text",
  end: "top left",
  markers: false,
  pin: false,
  pinSpacing: false,
});

// hero-img
ScrollTrigger.create({
  animation: gsap.from(".hero-img img", {
    y: "60vh",
    yPercent: -80,
  }),
  scrub: true,
  trigger: ".primary-header",
  start: "top bottom",
  endTrigger: ".hero-text",
  end: "top left",
  markers: false,
  pin: false,
  pinSpacing: false,
});

// footer-link animation
ScrollTrigger.create({
  animation: gsap.from(".footer-nav-list li", {
    xPercent: 150,
    stagger: 0.252,
    duration: 1.3,
    opacity: 0,
  }),
  trigger: ".cta",
  start: "bottom 90%",
  ease: "power3.easeInOut",
  // markers: true,
});

// about-number
ScrollTrigger.create({
  animation: gsap.from(".number", {
    stagger: 0.152,
    duration: 1,
    scale: 0,
  }),
  trigger: ".about-head",
  start: "top 80%",
  ease: "power3.easeInOut",
  // markers: true,
});

// projects
ScrollTrigger.create({
  animation: gsap.from(".project", {
    stagger: 0.52,
    duration: 1,
    yPercent: -10,
    opacity: 0,
  }),
  trigger: ".projects-heading",
  start: "top 50%",
  ease: "power3.easeInOut",
  // markers: true,
});

// faq
ScrollTrigger.create({
  animation: gsap.from(".faq", {
    stagger: 0.152,
    duration: 1,
    yPercent: -100,
    opacity: 0,
  }),
  trigger: ".faq-heading",
  start: "top 70%",
  ease: "power3.easeInOut",
  // markers: true,
});

// split text animation
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
      },
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 270,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2,
    });
  });
});

jQuery(document).ready(function () {
  let splitLines = jQuery("[data-line]");
  splitLines.each(function (i, j) {
    let x = new SplitText(j, {
      type: j.getAttribute("data-line"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
    let delay = j.getAttribute("data-delay");

    x.chars.forEach((ele, index) => {
      if (delay) {
        gsap.to(ele, { "--delay": index + parseInt(delay) + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
  let splitLines2 = jQuery("[data-line-no-animation]");
  splitLines2.each(function (i, j) {
    new SplitText(j, {
      type: j.getAttribute("data-line-no-animation"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
  });

  let splitLines3 = jQuery("[data-line-within-line]");
  splitLines3.each(function (i, j) {
    let x = new SplitText(j, { type: "lines", linesClass: "line-inner" });
    new SplitText(jQuery(j).find(".line-inner"), {
      type: "lines",
      linesClass: "line-mask",
    });
    let delay = j.getAttribute("data-delay");

    x.lines.forEach((ele, index) => {
      if (delay) {
        let delaytamp = index + parseInt(delay);
        gsap.to(ele, { "--delay": delaytamp + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
});

jQuery(window).on("load", function () {
  document.body.classList.add("loaded");
});
