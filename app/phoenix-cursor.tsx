"use client";

import { useEffect, useRef } from "react";

const IDLE_DELAY = 4800;
const FLIGHT_FRAMES = [
  "/assets/phoenix-cursor-up.png",
  "/assets/phoenix-cursor.png",
  "/assets/phoenix-cursor-down.png",
  "/assets/phoenix-cursor.png",
] as const;

export function PhoenixCursor() {
  const phoenixRef = useRef<HTMLDivElement>(null);
  const phoenixImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const phoenix = phoenixRef.current;
    const phoenixImage = phoenixImageRef.current;
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!phoenix || !phoenixImage || !finePointer.matches || reducedMotion.matches) return;

    document.documentElement.classList.add("phoenix-cursor-enabled");
    phoenix.dataset.visible = "true";
    FLIGHT_FRAMES.forEach((source) => {
      const preload = new Image();
      preload.src = source;
    });

    let animationFrame = 0;
    let mode: "guardian" | "cursor" = "guardian";
    let lastActivity = performance.now();
    let pointerKnown = false;
    let pointerX = window.innerWidth * 0.7;
    let pointerY = window.innerHeight * 0.28;
    let currentX = pointerX;
    let currentY = pointerY;
    let clickTimer = 0;
    let renderedFlightFrame = -1;
    let previousFlightTargetX = pointerX;
    let previousFlightTargetY = pointerY;

    const setMode = (nextMode: "guardian" | "cursor") => {
      if (mode === nextMode) return;
      mode = nextMode;
      phoenix.dataset.mode = nextMode;
      phoenix.classList.toggle("is-action", false);
    };

    const wakeCursor = () => {
      lastActivity = performance.now();
      setMode("cursor");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerKnown = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      wakeCursor();

      const target = event.target;
      const actionable =
        target instanceof Element &&
        Boolean(target.closest("a, button, input, textarea, select, label, [role='button']"));
      phoenix.classList.toggle("is-action", actionable);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      wakeCursor();
      phoenix.classList.add("is-pressing");
    };

    const handlePointerUp = () => {
      phoenix.classList.remove("is-pressing");
      phoenix.classList.remove("did-click");
      void phoenix.offsetWidth;
      phoenix.classList.add("did-click");
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => phoenix.classList.remove("did-click"), 420);
    };

    const handleKeyboard = () => {
      if (!pointerKnown) {
        pointerX = window.innerWidth * 0.72;
        pointerY = window.innerHeight * 0.32;
      }
      wakeCursor();
    };

    const handleWindowLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) setMode("guardian");
    };

    const animate = (time: number) => {
      if (mode === "cursor" && time - lastActivity > IDLE_DELAY) setMode("guardian");

      let targetX = pointerX;
      let targetY = pointerY;
      let roll = 0;

      if (mode === "guardian") {
        const birdSize = Math.min(235, Math.max(185, window.innerWidth * 0.15));
        const minX = Math.min(window.innerWidth * 0.45, birdSize + 18);
        const maxX = Math.max(minX + 1, window.innerWidth - 18);
        const minY = 12;
        const maxY = Math.max(minY + 1, window.innerHeight - birdSize - 16);
        const flightTime = time * 0.00028;
        const horizontal = 0.5 + Math.sin(flightTime) * 0.48;
        const vertical =
          0.5 +
          Math.sin(flightTime * 2 + 0.72) * 0.34 +
          Math.sin(flightTime * 0.53 + 1.8) * 0.1;
        targetX = minX + (maxX - minX) * horizontal;
        targetY = minY + (maxY - minY) * vertical;
        const verticalVelocity = targetY - previousFlightTargetY;
        const horizontalVelocity = targetX - previousFlightTargetX;
        roll = Math.max(-11, Math.min(11, verticalVelocity * 1.7 + horizontalVelocity * 0.12));
        previousFlightTargetX = targetX;
        previousFlightTargetY = targetY;
      }

      const flapStep = mode === "guardian" ? 108 : 124;
      const flightFrame = Math.floor(time / flapStep) % FLIGHT_FRAMES.length;
      if (flightFrame !== renderedFlightFrame) {
        phoenixImage.src = FLIGHT_FRAMES[flightFrame];
        phoenix.dataset.flightFrame = String(flightFrame);
        renderedFlightFrame = flightFrame;
      }

      const easing = mode === "cursor" ? 0.34 : 0.042;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      phoenix.style.setProperty("--phoenix-x", `${currentX}px`);
      phoenix.style.setProperty("--phoenix-y", `${currentY}px`);
      phoenix.style.setProperty("--phoenix-roll", `${roll}deg`);
      animationFrame = requestAnimationFrame(animate);
    };

    phoenix.dataset.mode = "guardian";
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("keydown", handleKeyboard, { passive: true });
    document.documentElement.addEventListener("mouseout", handleWindowLeave);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("phoenix-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleKeyboard);
      document.documentElement.removeEventListener("mouseout", handleWindowLeave);
      window.clearTimeout(clickTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="phoenix-cursor" ref={phoenixRef} aria-hidden="true">
      <span className="phoenix-aura" />
      <span className="phoenix-flight-line" />
      <img ref={phoenixImageRef} src="/assets/phoenix-cursor-up.png" alt="" draggable="false" />
      <span className="phoenix-click-ring" />
      <span className="phoenix-spark spark-a" />
      <span className="phoenix-spark spark-b" />
      <span className="phoenix-spark spark-c" />
    </div>
  );
}
