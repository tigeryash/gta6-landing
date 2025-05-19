import { logoData } from "./logo";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const initialOverlayScale = 350;

  const overlayCopy = document.getElementById("overlay-copy");

  useEffect(() => {
    const logoContainer = document.getElementById("logo-container");
    const logoMask = document.getElementById(
      "logoMask"
    ) as SVGPathElement | null;
    if (!logoContainer || !logoMask) return;

    logoMask.setAttribute("d", logoData);
    const logoDimensions = logoContainer.getBoundingClientRect();
    const logoBoundingBox = logoMask.getBBox();

    const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
    const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;

    const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

    const logoHorizontalPosition =
      logoDimensions.left +
      (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
      logoBoundingBox.x * logoScaleFactor;

    const logoVerticalPosition =
      logoDimensions.top +
      (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
      logoBoundingBox.y * logoScaleFactor;

    logoMask.setAttribute(
      "transform",
      `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
    );

    gsap.set(logoContainer, {
      scale: logoScaleFactor,
      transformOrigin: "center",
      y: logoVerticalPosition,
    });
  }, []);
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: `${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      if (!overlayCopy) return;
      const scrollProgress = self.progress;

      const fadeOpacity = 1 - scrollProgress * (1 / 0.15);

      if (scrollProgress <= 0.15) {
        gsap.set(["#hero-img-copy", "#hero-img-logo"], {
          opacity: fadeOpacity,
        });
      } else {
        gsap.set(["#hero-img-copy", "#hero-img-logo"], {
          opacity: 0,
        });
      }

      if (scrollProgress <= 0.85) {
        const normalizedProgress = scrollProgress * (1 / 0.85);
        const heroImgContinerScale = 1.5 - 0.5 * normalizedProgress;
        const overlayScale =
          initialOverlayScale *
          Math.pow(1 / initialOverlayScale, normalizedProgress);

        gsap.set("#hero-img-container", {
          scale: heroImgContinerScale,
        });
        gsap.set("#overlay", {
          scale: overlayScale,
        });
      }

      const fadeOverlayOpacity =
        scrollProgress >= 0.25
          ? Math.min(1, scrollProgress - 0.25) * (1 / 0.4)
          : 0;
      gsap.set("#fade-overlay", {
        opacity: fadeOverlayOpacity,
      });

      if (scrollProgress >= 0.6 && scrollProgress <= 0.85) {
        const overlayCopyRevealProgress = (scrollProgress - 0.6) * (1 / 0.25);

        const gradienSpread = 100;
        const gradientBottomPosition = 140 - overlayCopyRevealProgress * 280;
        const gradientTopPosition = gradientBottomPosition - gradienSpread;
        const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

        overlayCopy.style.background = `linear-gradient(to bottom, 
        #111117 0%, #111117 ${gradientTopPosition}%, #e66461 ${gradientBottomPosition}%, #e66461 100%)`;
        overlayCopy.style.backgroundClip = "text";

        gsap.set(overlayCopy, {
          scale: overlayCopyScale,
          opacity: overlayCopyRevealProgress,
        });
      } else if (scrollProgress < 0.6) {
        gsap.set(overlayCopy, {
          opacity: 0,
        });
      }
    },
  });

  return (
    <section ref={containerRef} id="hero">
      <div id="hero-img-container">
        <img src="/bg.webp" alt="" />

        <div id="hero-img-logo">
          <img src="/logo.png" alt="" />
        </div>

        <img src="/heli.webp" alt="" />

        <div
          id="hero-img-copy"
          className="absolute bottom-[5%] left-1/2
        -translate-x-1/2"
          style={{
            willChange: "opacity",
          }}
        >
          <p className="text-[.65rem]">Scroll down to reveal</p>
        </div>
      </div>

      <div
        id="fade-overlay"
        className="bg-white"
        style={{
          willChange: "opacity",
        }}
      ></div>
      <div
        id="overlay"
        className="absolute origin-[center_15%] top-0 left-0 w-full h-[200%] z-1"
      >
        <svg width="100%" height="100%">
          <defs>
            <mask id="logoRevealMask">
              <rect width="100%" height="100%" fill="white" />
              <path id="logoMask"></path>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#111117"
            mask="url(#logoRevealMask)"
          />
        </svg>
      </div>
      <div
        id="logo-container"
        className="fixed top-[25%] left-1/2 -translate-x-1/2 z-2 -translate-y-1/2
      w-[200px] h-[150px]"
      ></div>

      <div
        id="overlay-copy"
        className="absolute w-[100%] md:w-auto bottom-[25%] left-1/2 -translate-x-1/2 z-2"
      >
        <h1>
          GTA 6 <br />
          Website Animation <br />
          By Yash
        </h1>
      </div>
    </section>
  );
};

export default Section1;
