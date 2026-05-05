import React, { useState, useEffect, useRef } from "react";
import { staticFile, useDelayRender } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { Caption } from "@remotion/captions";
import { SceneTitle } from "./components/SceneTitle";
import { SceneIntro } from "./components/SceneIntro";
import { SceneCodeGen } from "./components/SceneCodeGen";
import { SceneCreation } from "./components/SceneCreation";
import { SceneFlow } from "./components/SceneFlow";
import { CaptionOverlay } from "./components/CaptionOverlay";

const TRANSITION_DURATION = 15;

export const VibecodingVideo: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const handleRef = useRef<number | null>(null);

  useEffect(() => {
    handleRef.current = delayRender();
    const loadCaptions = async () => {
      try {
        const response = await fetch(staticFile("captions.json"));
        const data: Caption[] = await response.json();
        setCaptions(data);
        continueRender(handleRef.current!);
      } catch (e) {
        cancelRender(e);
      }
    };
    loadCaptions();
  }, []);

  if (!captions) return null;

  return (
    <TransitionSeries>
      {/* Scene 1: Title Card (0-120, 4s) */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneTitle />
      </TransitionSeries.Sequence>

      {/* Transition: fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 2: Ambient Intro (120-300, 6s) — captions start at ~5s */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneIntro />
        <CaptionOverlay captions={captions} />
      </TransitionSeries.Sequence>

      {/* Transition: fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 3: Code Generation (300-480, 6s) */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneCodeGen />
      </TransitionSeries.Sequence>

      {/* Transition: fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Pure Creation (480-600, 4s) */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneCreation />
      </TransitionSeries.Sequence>

      {/* Transition: fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: Flow Finale (600-660, 2s) */}
      <TransitionSeries.Sequence durationInFrames={60}>
        <SceneFlow />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
