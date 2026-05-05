import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  phase: number;
}

const PARTICLE_COUNT = 80;

export const ParticleField: React.FC<{
  color?: string;
  speed?: number;
  density?: number;
}> = ({ color = "#8B5CF6", speed = 1, density = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: Math.floor(PARTICLE_COUNT * density) }, (_, i) => ({
      x: (Math.sin(i * 137.5) * 0.5 + 0.5) * width,
      y: (Math.cos(i * 137.5) * 0.5 + 0.5) * height,
      size: 1.5 + Math.random() * 3,
      speed: 0.3 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [width, height, density]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p, i) => {
        const floatY = Math.sin(frame * 0.02 * p.speed * speed + p.phase) * 30;
        const floatX = Math.cos(frame * 0.015 * p.speed * speed + p.phase) * 20;
        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.03 * speed + p.phase);
        const currentOpacity = p.opacity * (0.6 + 0.4 * pulse);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + floatX,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: currentOpacity,
              boxShadow: `0 0 ${p.size * 4}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
