"use client";

import { useEffect, useRef } from "react";

const IDLE_DELAY = 4800;
const FLIGHT_FRAMES = [
  "/assets/phoenix-cursor-up.png",
  "/assets/phoenix-cursor.png",
  "/assets/phoenix-cursor-down.png",
  "/assets/phoenix-cursor.png",
  "/assets/phoenix-cursor-glide.png",
  "/assets/phoenix-cursor.png",
] as const;
const CURSOR_FRAMES = FLIGHT_FRAMES.slice(0, 4);
const BANK_FRAME = "/assets/phoenix-cursor-bank.png";
const FLIGHT_PATH = [
  { x: 0.08, y: 0.58 },
  { x: 0.2, y: 0.2 },
  { x: 0.56, y: 0.08 },
  { x: 0.9, y: 0.26 },
  { x: 0.84, y: 0.68 },
  { x: 0.56, y: 0.88 },
  { x: 0.2, y: 0.78 },
  { x: 0.06, y: 0.42 },
] as const;

function flightPoint(progress: number) {
  const count = FLIGHT_PATH.length;
  const wrapped = ((progress % count) + count) % count;
  const index = Math.floor(wrapped);
  const t = wrapped - index;
  const p0 = FLIGHT_PATH[(index - 1 + count) % count];
  const p1 = FLIGHT_PATH[index];
  const p2 = FLIGHT_PATH[(index + 1) % count];
  const p3 = FLIGHT_PATH[(index + 2) % count];
  const interpolate = (a: number, b: number, c: number, d: number) =>
    0.5 *
    ((2 * b) +
      (-a + c) * t +
      (2 * a - 5 * b + 4 * c - d) * t * t +
      (-a + 3 * b - 3 * c + d) * t * t * t);

  return {
    x: interpolate(p0.x, p1.x, p2.x, p3.x),
    y: interpolate(p0.y, p1.y, p2.y, p3.y),
  };
}

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
    [...FLIGHT_FRAMES, BANK_FRAME].forEach((source) => {
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
    let facing: "right" | "left" = "right";
    let turningUntil = 0;

    const setMode = (nextMode: "guardian" | "cursor") => {
      if (mode === nextMode) return;
      mode = nextMode;
      phoenix.dataset.mode = nextMode;
      phoenix.classList.toggle("is-action", false);
      if (nextMode === "cursor") {
        facing = "right";
        phoenix.dataset.facing = "right";
        phoenix.dataset.turning = "false";
      }
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
        const horizontalMargin = Math.min(window.innerWidth * 0.32, birdSize + 20);
        const verticalSpace = Math.max(1, window.innerHeight - birdSize - 30);
        const horizontalSpace = Math.max(1, window.innerWidth - horizontalMargin * 2);
        const progress = time * 0.00018;
        const position = flightPoint(progress);
        const future = flightPoint(progress + 0.012);
        const directionX = future.x - position.x;
        const directionY = future.y - position.y;
        const nextFacing = directionX >= 0 ? "right" : "left";

        targetX = horizontalMargin + position.x * horizontalSpace;
        targetY = 14 + position.y * verticalSpace;
        roll = Math.max(-16, Math.min(16, directionY * 390));

        if (nextFacing !== facing && Math.abs(directionX) > 0.0012) {
          facing = nextFacing;
          phoenix.dataset.facing = facing;
          turningUntil = time + 900;
        }
      }

      const turning = mode === "guardian" && time < turningUntil;
      phoenix.dataset.turning = String(turning);
      const activeFrames = mode === "guardian" ? FLIGHT_FRAMES : CURSOR_FRAMES;
      const flapStep = mode === "guardian" ? 112 : 155;
      const flightFrame = Math.floor(time / flapStep) % activeFrames.length;
      const frameSource = turning ? BANK_FRAME : activeFrames[flightFrame];
      const renderedKey = turning ? -2 : flightFrame;

      if (renderedKey !== renderedFlightFrame || phoenixImage.src !== new URL(frameSource, window.location.href).href) {
        phoenixImage.src = frameSource;
        phoenix.dataset.flightFrame = turning ? "bank" : String(flightFrame);
        renderedFlightFrame = renderedKey;
      }

      const easing = mode === "cursor" ? 0.34 : 0.085;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      phoenix.style.setProperty("--phoenix-x", `${currentX}px`);
      phoenix.style.setProperty("--phoenix-y", `${currentY}px`);
      phoenix.style.setProperty("--phoenix-roll", `${roll}deg`);
      animationFrame = requestAnimationFrame(animate);
    };

    phoenix.dataset.mode = "guardian";
    phoenix.dataset.facing = "right";
    phoenix.dataset.turning = "false";
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
