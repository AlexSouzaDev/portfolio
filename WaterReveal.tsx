import React, { useRef, useEffect, useCallback } from "react";

interface Drop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  phase: "expand" | "hold" | "done";
  birth: number;
  expandDuration: number;
  holdDuration: number;
  scaleX: number;
  scaleY: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  birth: number;
  duration: number;
}

const SPAWN_DISTANCE = 30;
const LERP_FACTOR = 0.16;
const REFILL_ALPHA = 0.022;
const RIPPLE_CHANCE = 0.35;
const JITTER = 6;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const WaterReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const mouseRaw = useRef({ x: -9999, y: -9999 });
  const mouseLerped = useRef({ x: -9999, y: -9999 });
  const lastSpawn = useRef({ x: -9999, y: -9999 });
  const drops = useRef<Drop[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const hasMoved = useRef(false);
  const rafId = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRaw.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!hasMoved.current) {
      hasMoved.current = true;
      mouseLerped.current = { ...mouseRaw.current };
      lastSpawn.current = { ...mouseRaw.current };
      if (hintRef.current) hintRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false })!;
    let width = 0;
    let height = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-fill white after resize
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Initial white fill
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    window.addEventListener("mousemove", handleMouseMove);

    function spawnDrop(x: number, y: number) {
      const jx = x + (Math.random() - 0.5) * JITTER * 2;
      const jy = y + (Math.random() - 0.5) * JITTER * 2;
      const maxR = 28 + Math.random() * 22;
      drops.current.push({
        x: jx,
        y: jy,
        radius: 0,
        maxRadius: maxR,
        phase: "expand",
        birth: performance.now(),
        expandDuration: 180 + Math.random() * 80,
        holdDuration: 60 + Math.random() * 40,
        scaleX: 0.85 + Math.random() * 0.3,
        scaleY: 0.85 + Math.random() * 0.3,
      });

      if (Math.random() < RIPPLE_CHANCE) {
        ripples.current.push({
          x: jx,
          y: jy,
          radius: maxR * 0.3,
          maxRadius: maxR * 1.6 + Math.random() * 20,
          alpha: 0.25 + Math.random() * 0.1,
          birth: performance.now(),
          duration: 500 + Math.random() * 300,
        });
      }
    }

    function tick() {
      const now = performance.now();

      // Lerp cursor
      if (hasMoved.current) {
        mouseLerped.current.x = lerp(mouseLerped.current.x, mouseRaw.current.x, LERP_FACTOR);
        mouseLerped.current.y = lerp(mouseLerped.current.y, mouseRaw.current.y, LERP_FACTOR);
      }

      // Spawn drops based on lerped position travel
      if (hasMoved.current) {
        const d = distance(
          lastSpawn.current.x,
          lastSpawn.current.y,
          mouseLerped.current.x,
          mouseLerped.current.y
        );
        if (d >= SPAWN_DISTANCE) {
          spawnDrop(mouseLerped.current.x, mouseLerped.current.y);
          lastSpawn.current = { x: mouseLerped.current.x, y: mouseLerped.current.y };
        }
      }

      // --- Slow refill: paint faint white over entire canvas ---
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(255,255,255,${REFILL_ALPHA})`;
      ctx.fillRect(0, 0, width, height);

      // --- Draw drops (destination-out to erase white) ---
      const activeDrop: Drop[] = [];
      for (const drop of drops.current) {
        const elapsed = now - drop.birth;

        if (drop.phase === "expand") {
          const t = Math.min(elapsed / drop.expandDuration, 1);
          drop.radius = drop.maxRadius * easeOutCubic(t);
          if (t >= 1) {
            drop.phase = "hold";
            drop.birth = now;
          }
        } else if (drop.phase === "hold") {
          const holdElapsed = now - drop.birth;
          if (holdElapsed >= drop.holdDuration) {
            drop.phase = "done";
          }
        }

        if (drop.phase !== "done") {
          // Erase with destination-out
          ctx.globalCompositeOperation = "destination-out";
          const r = Math.max(drop.radius, 0.1);

          ctx.save();
          ctx.setTransform(
            drop.scaleX * (window.devicePixelRatio || 1),
            0,
            0,
            drop.scaleY * (window.devicePixelRatio || 1),
            drop.x * (window.devicePixelRatio || 1),
            drop.y * (window.devicePixelRatio || 1)
          );

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          grad.addColorStop(0, "rgba(0,0,0,1)");
          grad.addColorStop(0.3, "rgba(0,0,0,0.8)");
          grad.addColorStop(0.7, "rgba(0,0,0,0.3)");
          grad.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Reset transform back to dpr
          const dpr = window.devicePixelRatio || 1;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          // Distortion layer: faint secondary elliptical gradient (source-over)
          if (drop.phase === "expand") {
            ctx.globalCompositeOperation = "destination-out";
            ctx.save();
            const distScaleX = 0.85 + Math.random() * 0.3;
            const distScaleY = 0.85 + Math.random() * 0.3;
            ctx.setTransform(
              distScaleX * dpr,
              0,
              0,
              distScaleY * dpr,
              drop.x * dpr,
              drop.y * dpr
            );
            const distR = r * 1.15;
            const distGrad = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, distR);
            distGrad.addColorStop(0, "rgba(0,0,0,0)");
            distGrad.addColorStop(0.5, "rgba(0,0,0,0.06)");
            distGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = distGrad;
            ctx.beginPath();
            ctx.arc(0, 0, distR, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }

          activeDrop.push(drop);
        }
      }
      drops.current = activeDrop;

      // --- Draw ripples ---
      const activeRipples: Ripple[] = [];
      for (const ripple of ripples.current) {
        const elapsed = now - ripple.birth;
        const t = Math.min(elapsed / ripple.duration, 1);
        if (t >= 1) continue;

        const currentR = lerp(ripple.radius, ripple.maxRadius, easeOutCubic(t));
        const alpha = ripple.alpha * (1 - t);
        const ringWidth = 4 + (1 - t) * 3;

        ctx.globalCompositeOperation = "destination-out";
        const inner = Math.max(currentR - ringWidth, 0.1);
        const outer = currentR + ringWidth;

        const rGrad = ctx.createRadialGradient(
          ripple.x, ripple.y, inner,
          ripple.x, ripple.y, outer
        );
        rGrad.addColorStop(0, "rgba(0,0,0,0)");
        rGrad.addColorStop(0.35, `rgba(0,0,0,${alpha * 0.5})`);
        rGrad.addColorStop(0.5, `rgba(0,0,0,${alpha})`);
        rGrad.addColorStop(0.65, `rgba(0,0,0,${alpha * 0.5})`);
        rGrad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = rGrad;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, outer, 0, Math.PI * 2);
        ctx.fill();

        activeRipples.push(ripple);
      }
      ripples.current = activeRipples;

      // --- Custom cursor ---
      if (hasMoved.current && mouseLerped.current.x > 0) {
        ctx.globalCompositeOperation = "source-over";
        const cx = mouseLerped.current.x;
        const cy = mouseLerped.current.y;

        // Glow ring
        const pulseR = Math.sin(Date.now() / 400) * 1.5 + 7;
        const glowGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulseR);
        glowGrad.addColorStop(0, "rgba(0,0,0,0.25)");
        glowGrad.addColorStop(0.5, "rgba(0,0,0,0.08)");
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
        ctx.fill();

        // Solid center dot
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        cursor: "none",
        overflow: "hidden",
      }}
    >
      {/* WIP text on the black layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.07)",
            fontSize: "min(20vw, 260px)",
            fontWeight: 800,
            letterSpacing: "0.05em",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          WIP
        </span>
      </div>

      {/* White canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Restore hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 13,
          color: "rgba(0,0,0,0.35)",
          pointerEvents: "none",
          userSelect: "none",
          transition: "opacity 0.9s",
          zIndex: 10,
        }}
      >
        move cursor to reveal
      </div>
    </div>
  );
};

export default WaterReveal;
