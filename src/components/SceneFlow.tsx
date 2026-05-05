import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const RING_COUNT = 5;
const RING_COLORS = ["#8B5CF6", "#7C3AED", "#A78BFA", "#6D28D9", "#C4B5FD"];

export const SceneFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const cx = width / 2;
  const cy = height / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: "#060610" }}>
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const delay = i * 0.3 * fps;
        const localFrame = Math.max(0, frame - delay);
        const radius = interpolate(localFrame, [0, fps * 3], [30, height * 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(localFrame, [0, fps * 0.5, fps * 2, fps * 3], [0, 0.25, 0.12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const thickness = interpolate(localFrame, [0, fps * 3], [4, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - radius,
              top: cy - radius,
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: `${thickness}px solid ${RING_COLORS[i]}`,
              opacity,
              boxShadow: `0 0 ${radius * 0.3}px ${RING_COLORS[i]}, inset 0 0 ${radius * 0.15}px ${RING_COLORS[i]}`,
            }}
          />
        );
      })}
      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          left: cx - 60,
          top: cy - 60,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 60%)",
          opacity: 0.5 + 0.5 * Math.sin(frame * 0.05),
        }}
      />
    </AbsoluteFill>
  );
};
