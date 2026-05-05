import { Composition } from "remotion";
import { VibecodingVideo } from "./Composition";

// 20 seconds at 30fps
// Total = sum(seqs) - sum(transitions) = 660 - 60 = 600 frames
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VibecodingVideo"
        component={VibecodingVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
