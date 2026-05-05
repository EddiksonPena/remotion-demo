import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, spring } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Tagline bounce
  const taglineSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Feature cards stagger
  const card1 = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 80 } });
  const card2 = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 12, stiffness: 80 } });
  const card3 = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 80 } });

  // CTA
  const ctaOpacity = interpolate(frame, [65, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const ctaScale = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 8, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", fontFamily: "system-ui, sans-serif" }}>
      {/* Background gradient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1 style={{ fontSize: 64, color: "#ffffff", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
          Hermes Agent
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#818cf8",
            margin: "16px 0 0 0",
            opacity: taglineSpring,
            transform: `scale(${0.9 + taglineSpring * 0.1})`,
          }}
        >
          Your AI-Powered Command Center
        </p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        <FeatureCard
          emoji="🧠"
          title="Multi-Model"
          desc="DeepSeek, Claude, GPT — one interface"
          scale={card1}
        />
        <FeatureCard
          emoji="⚡"
          title="Fast Tools"
          desc="Browser, terminal, code — at your command"
          scale={card2}
        />
        <FeatureCard
          emoji="🔗"
          title="Every Platform"
          desc="Telegram, Discord, Slack — connected"
          scale={card3}
        />
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: ctaOpacity,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "16px 48px",
            borderRadius: 12,
            backgroundColor: "#6366f1",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
            transform: `scale(${ctaScale})`,
          }}
        >
          npm create hermes@latest
        </span>
      </div>
    </AbsoluteFill>
  );
};

const FeatureCard = ({
  emoji,
  title,
  desc,
  scale,
}: {
  emoji: string;
  title: string;
  desc: string;
  scale: number;
}) => (
  <div
    style={{
      flex: 1,
      maxWidth: 320,
      padding: "28px 24px",
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      textAlign: "center",
      transform: `scale(${scale})`,
      opacity: scale,
    }}
  >
    <div style={{ fontSize: 36 }}>{emoji}</div>
    <h3 style={{ color: "#ffffff", fontSize: 20, fontWeight: 600, margin: "12px 0 8px" }}>{title}</h3>
    <p style={{ color: "#94a3b8", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{desc}</p>
  </div>
);
