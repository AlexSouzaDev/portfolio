import { useState, useEffect, useRef, useCallback } from 'react';
import './LandingPage.css';
import { GooeyText } from '@/components/ui/gooey-text-morphing';

const CHARS = '0123456789!@#$%^&*-+=/\\|<>{}.,;:~`';
const PORTFOLIO = 'PORTFOLIO';
const FONT_SIZE = 14;
const CELL_W = 10;
const CELL_H = 18;
const SPOTLIGHT_RADIUS = 110;

interface Particle {
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  alpha: number;
}

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

// ─── Follow Cursor ────────────────────────────────────────────────────────────

function FollowCursor({ mouseRef }: { mouseRef: React.RefObject<MouseState> }) {
  const labelRef = useRef<HTMLDivElement>(null);
  const displayPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const loop = () => {
      const m = mouseRef.current;
      if (m) {
        // Lerp display position toward actual mouse
        displayPos.current.x += (m.x - displayPos.current.x) * 0.12;
        displayPos.current.y += (m.y - displayPos.current.y) * 0.12;

        label.style.transform = `translate(${displayPos.current.x + 14}px, ${displayPos.current.y - 22}px)`;
        label.style.opacity = m.active ? '1' : '0';
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [mouseRef]);

  return (
    <div
      ref={labelRef}
      className="follow-cursor"
      style={{ opacity: 0 }}
    >
      CLICK
    </div>
  );
}

// ─── ASCII Vortex ────────────────────────────────────────────────────────────

function AsciiVortex({
  onExplode,
  mouseRef,
}: {
  onExplode: (x: number, y: number) => void;
  mouseRef: React.RefObject<MouseState>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d')!;
    const startTime = performance.now();

    const draw = (now: number) => {
      const t = now - startTime;
      const cols = Math.floor(canvas.width / CELL_W);
      const rows = Math.floor(canvas.height / CELL_H);

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "Space Mono", "Courier New", monospace`;

      const centerCol = cols / 2;
      const centerRow = rows / 2;
      const portStart = Math.floor(centerCol - PORTFOLIO.length / 2);
      const portRow = Math.floor(centerRow);

      const mx = mouseRef.current?.x ?? -9999;
      const my = mouseRef.current?.y ?? -9999;
      const mouseActive = mouseRef.current?.active ?? false;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dx = col - centerCol;
          const dy = row - centerRow;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Swirling vortex field
          const vortexAngle = angle - dist * 0.08 + t * 0.0007;
          const radialPhase = dist * 0.35 - t * 0.0012;
          const wave1 = Math.sin(vortexAngle * 3) * 0.5 + 0.5;
          const wave2 = Math.sin(radialPhase) * 0.5 + 0.5;
          const combined = wave1 * 0.6 + wave2 * 0.4;

          // Spotlight: smooth quadratic falloff from cursor
          const cellPx = col * CELL_W + CELL_W / 2;
          const cellPy = row * CELL_H + CELL_H / 2;
          const mdx = cellPx - mx;
          const mdy = cellPy - my;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const raw = 1 - mouseDist / SPOTLIGHT_RADIUS;
          const spotlight = mouseActive ? Math.max(0, raw * raw) * 0.75 : 0;

          const isPortfolio =
            row === portRow &&
            col >= portStart &&
            col < portStart + PORTFOLIO.length;

          if (isPortfolio) {
            const pulse = Math.sin(t * 0.002 + dist * 0.08) * 0.4 + 0.6;
            const alpha = Math.min(1, pulse + spotlight * 0.3);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillText(PORTFOLIO[col - portStart], col * CELL_W, (row + 1) * CELL_H);
          } else {
            const ci = Math.abs(
              Math.floor(combined * 20 + t * 0.04 + dist * 0.3)
            ) % CHARS.length;
            const alpha = Math.min(1, combined * 0.5 + 0.05 + spotlight);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillText(CHARS[ci], col * CELL_W, (row + 1) * CELL_H);
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mouseRef]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      cancelAnimationFrame(animRef.current);
      const rect = canvasRef.current!.getBoundingClientRect();
      onExplode(e.clientX - rect.left, e.clientY - rect.top);
    },
    [onExplode]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      if (mouseRef.current) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    },
    [mouseRef]
  );

  const handleMouseEnter = useCallback(() => {
    if (mouseRef.current) mouseRef.current.active = true;
  }, [mouseRef]);

  const handleMouseLeave = useCallback(() => {
    if (mouseRef.current) mouseRef.current.active = false;
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'absolute', inset: 0, display: 'block', cursor: 'none' }}
    />
  );
}

// ─── Explosion Canvas ─────────────────────────────────────────────────────────

function ExplosionCanvas({
  clickX,
  clickY,
  onDone,
}: {
  clickX: number;
  clickY: number;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d')!;
    const cols = Math.floor(canvas.width / CELL_W);
    const rows = Math.floor(canvas.height / CELL_H);

    const particles: Particle[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * CELL_W;
        const y = row * CELL_H;
        const dx = x - clickX;
        const dy = y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const speed = Math.min(18, 280 / dist) * (0.6 + Math.random() * 0.8);

        particles.push({
          x,
          y,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          alpha: 1,
        });
      }
    }

    ctx.font = `${FONT_SIZE}px "Space Mono", "Courier New", monospace`;
    const startTime = performance.now();
    const duration = 800;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = elapsed / duration;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha = Math.max(0, 1 - t * t * 1.4);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillText(p.char, p.x, p.y + CELL_H);
      }

      if (elapsed < duration) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        onDone();
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [clickX, clickY, onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, display: 'block' }}
    />
  );
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────

function WelcomeScreen() {
  return (
    <div className="welcome-container">
      <GooeyText
        texts={[
          "Welcome to my Portfolio",
          "Hi! I'm Alexandre Souza, Full-stack Developer currently studying Systems and Network in University of Aveiro and working at the ImpulsoLead.AI",
        ]}
        morphTime={1.5}
        cooldownTime={3}
        className="h-48 w-full max-w-4xl px-8"
        textClassName="font-heming text-2xl md:text-4xl"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  const [phase, setPhase] = useState<'vortex' | 'explosion' | 'welcome'>('vortex');
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, active: false });

  const handleExplode = useCallback((x: number, y: number) => {
    if (mouseRef.current) mouseRef.current.active = false;
    setClickPos({ x, y });
    setPhase('explosion');
  }, []);

  const handleExplosionDone = useCallback(() => {
    setPhase('welcome');
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a' }}>
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '20px 24px',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", "Courier New", monospace',
            color: '#fff',
            fontSize: '13px',
            letterSpacing: '3px',
          }}
        >
          PORTFOLIO
        </span>
      </nav>

      {phase === 'vortex' && (
        <>
          <AsciiVortex onExplode={handleExplode} mouseRef={mouseRef} />
          <FollowCursor mouseRef={mouseRef} />
          <div className="click-hint">CLICK ANYWHERE TO ENTER</div>
        </>
      )}

      {phase === 'explosion' && (
        <ExplosionCanvas
          clickX={clickPos.x}
          clickY={clickPos.y}
          onDone={handleExplosionDone}
        />
      )}

      {phase === 'welcome' && <WelcomeScreen />}
    </div>
  );
}
