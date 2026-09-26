"use client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// Carga diferida de las features de animación (domAnimation ≈ 6 KB) en vez del
// bundle completo de `motion` (~34 KB). Todos los componentes usan el componente
// liviano `m` en lugar de `motion`. `strict` obliga a que así sea (lanza si se
// usa `motion` completo), evitando regresiones de bundle.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
