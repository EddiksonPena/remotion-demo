import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ParticleField } from "./ParticleField";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps], [0.1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 0.6 + 0.4 * Math.sin(frame * 0.04);
  const glowRadius = 280 + 40 * glowPulse;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0f" }}>
      {/* Ambient gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          background: "radial-gradient(ellipse at 50% 50%, #1a1040 0%, #0a0a0f 70%)",
        }}
      />
      {/* Central glow orb */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - glowRadius,
          top: height / 2 - glowRadius,
          width: glowRadius * 2,
          height: glowRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139,92,246,${0.15 * glowPulse}) 0%, transparent 60%)`,
        }}
      />
      <ParticleField color="#8B5CF6" speed={0.7} density={0.6} />
    </AbsoluteFill>
  );
};
