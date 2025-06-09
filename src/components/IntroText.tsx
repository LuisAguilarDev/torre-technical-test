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
      stagger: 0.08,
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
      Conoce con datos las habilidades que te abrirán puertas.
      <br />
      <br />
      En <span className="text-brand font-semibold">Torre</span> puedes comparar
      tu perfil con miles de profesionales en el mercado. Conoce tus Skill Gaps
      más importantes y toma decisiones informadas sobre tu carrera.
      <br />
      <br />
      Compara tu perfil con el mercado
    </p>
  );
};

export default IntroText;
