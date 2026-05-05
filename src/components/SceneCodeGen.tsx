import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ParticleField } from "./ParticleField";

const CODE_LINES = [
  "const agent = await createAgent({",
  '  model: "claude-sonnet-4",',
  '  tools: ["fs", "web", "terminal"],',
  "});",
  "",
  "// Describe what you want...",
  "const app = await agent.run(`",
  "  Build a real-time dashboard",
  "  with live WebSocket updates",
  "  and dark mode support",
  "`);",
  "",
  "// It just works.",
  "await app.deploy();",
];

export const SceneCodeGen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const scrollOffset = interpolate(frame, [0, fps * 3], [0, CODE_LINES.length * 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vignette = interpolate(frame, [0, fps], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scanlineY = (frame * 2) % height;

  return (
    <AbsoluteFill style={{ backgroundColor: "#06060c" }}>
      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: scanlineY,
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)",
          opacity: 0.6,
        }}
      />
      {/* Code display */}
      <div
        style={{
          position: "absolute",
          left: width * 0.18,
          top: height * 0.2 - scrollOffset,
          opacity: vignette,
        }}
      >
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: 18,
              lineHeight: "28px",
              color: line.startsWith("//") ? "#666680" : "#c4b5fd",
              paddingLeft: line.startsWith("  ") ? 24 : 0,
            }}
          >
            {line || "\u00A0"}
          </div>
        ))}
      </div>
      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: width * 0.18 + 290,
          top: height * 0.2 + CODE_LINES.length * 28 - scrollOffset,
          width: 10,
          height: 20,
          backgroundColor: "#a78bfa",
          opacity: 0.6 + 0.4 * Math.sin(frame * 0.3),
        }}
      />
      <ParticleField color="#7C3AED" speed={1.2} density={0.8} />
    </AbsoluteFill>
  );
};
