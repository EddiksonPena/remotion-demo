import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ParticleField } from "./ParticleField";

const CREATION_WORDS = [
  "No syntax errors.",
  "No boilerplate.",
  "No context switching.",
  "No waiting for CI.",
  "Just pure creation.",
];

export const SceneCreation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050510" }}>
      {CREATION_WORDS.map((word, i) => {
        const stagger = i * 0.45 * fps;
        const localFrame = Math.max(0, frame - stagger);

        const x = interpolate(localFrame, [0, fps * 1.5], [-200, width * 0.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(localFrame, [0, fps * 0.3, fps * 3, fps * 4], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const blur = interpolate(localFrame, [0, fps * 0.5], [12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const isPositive = word.startsWith("Just") || word.startsWith("Pure");

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: height * 0.15 + i * 70,
              transform: "translateX(-50%)",
              fontSize: 32,
              fontWeight: 600,
              color: isPositive ? "#A78BFA" : "#787890",
              opacity,
              filter: `blur(${blur}px)`,
              textShadow: isPositive ? "0 0 20px rgba(167,139,250,0.4)" : "none",
            }}
          />
        );
      })}
      <ParticleField color="#8B5CF6" speed={1.5} density={0.9} />
    </AbsoluteFill>
  );
};
