import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ParticleField } from "./ParticleField";

export const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Title reveal
  const titleScale = interpolate(frame, [0, fps * 0.6], [1.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t: number) => {
      // Custom cubic-bezier ease-out
      return 1 - Math.pow(1 - t, 4);
    },
  });
  const titleOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [fps * 0.4, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [fps * 0.4, fps * 1.2], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final lens flare
  const flareOpacity = interpolate(frame, [fps * 0.5, fps * 1, fps * 3, fps * 4], [0, 0.6, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flareSize = interpolate(frame, [fps * 0.5, fps * 3], [100, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#04040c" }}>
      {/* Ambient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, #1a1040 0%, #04040c 60%)",
          opacity: 0.5,
        }}
      />
      {/* Lens flare */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - flareSize / 2,
          top: height * 0.3 - flareSize / 2,
          width: flareSize,
          height: flareSize,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(124,58,237,0.1) 30%, transparent 60%)",
          opacity: flareOpacity,
        }}
      />
      {/* Title */}
      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.34,
          transform: `translate(-50%, -50%) scale(${titleScale})`,
          fontSize: 96,
          fontWeight: 900,
          color: "#E8E0F0",
          opacity: titleOpacity,
          letterSpacing: "-0.02em",
          textShadow: "0 0 80px rgba(139,92,246,0.5), 0 4px 8px rgba(0,0,0,0.5)",
        }}
      >
        Vibe Coding
      </div>
      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height * 0.34 + 100 + subtitleY,
          transform: "translateX(-50%)",
          fontSize: 28,
          fontWeight: 400,
          color: "rgba(200,190,220,0.8)",
          opacity: subtitleOpacity,
          letterSpacing: "0.12em",
        }}
      >
        DESCRIBE. CREATE. DEPLOY.
      </div>
      <ParticleField color="#A78BFA" speed={0.5} density={1.2} />
    </AbsoluteFill>
  );
};
