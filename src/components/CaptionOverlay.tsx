import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";

const HIGHLIGHT_COLOR = "#A78BFA";
const SWITCH_CAPTIONS_EVERY_MS = 1000;

const CaptionPage: React.FC<{ page: TikTokPage; pageStartMs: number }> = ({
  page,
  pageStartMs,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteTimeMs = pageStartMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 80,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          whiteSpace: "pre",
          textAlign: "center",
          maxWidth: "85%",
          lineHeight: 1.3,
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}
      >
        {page.tokens.map((token, i) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          return (
            <span
              key={i}
              style={{
                color: isActive ? HIGHLIGHT_COLOR : "rgba(255,255,255,0.85)",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionOverlay: React.FC<{ captions: Caption[] }> = ({
  captions,
}) => {
  const { fps } = useVideoConfig();

  const pages = useMemo(() => {
    if (!captions || captions.length === 0) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  return (
    <>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = nextPage
          ? (nextPage.startMs / 1000) * fps
          : Infinity;
        const durationInFrames = endFrame - startFrame;
        if (durationInFrames <= 0) return null;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
            layout="none"
          >
            <CaptionPage page={page} pageStartMs={page.startMs} />
          </Sequence>
        );
      })}
    </>
  );
};
