import { logoData } from "./logo";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  return (
    <section>
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
