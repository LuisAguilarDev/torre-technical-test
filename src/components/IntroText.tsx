import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const IntroText = () => {
  useEffect(() => {
    const el = document.querySelector(".text");
    if (!el) return;

    const split = new SplitText(el, { type: "words" });

    gsap.from(split.words, {
      y: 5,
      duration: 1,
      stagger: 0.1,
      autoAlpha: 0,
      filter: "blur(10px)",
    });

    return () => {
      try {
        split.revert();
      } catch (e) {
        console.warn("SplitText revert error:", e);
      }
    };
  }, []);

  return (
    <p className="text text-3xl w-[65ch]">
      El mundo laboral ahora es global, y en{" "}
      <span className="text-brand font-semibold">Torre</span>,<br />
      lo hacemos personal. Tu{" "}
      <span className="font-semibold">network profesional</span> empieza aquí.
      <br />
      <br />
      Escribe un nombre y{" "}
      <span className="text-brand font-semibold">re-conecta</span>.
    </p>
  );
};

export default IntroText;
