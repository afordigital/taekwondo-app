import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaPlayButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
} from "media-chrome/react";
import type { MediaController as MediaControllerElement } from "media-chrome";
import { useRef, useState } from "react";

const SimplePlayer = () => {
  const mediaControllerRef = useRef<MediaControllerElement>(null);

  const movementTimestamps = [0, 2.4, 4, 6.5, 9, 12, 15]; // cambiar por el json
  const [currentMovement, setCurrentMovement] = useState(0);

  const goToMovement = (direction: "next" | "prev") => {
    if (!mediaControllerRef.current) return;

    const videoElement = mediaControllerRef.current.querySelector(
      "video"
    ) as HTMLVideoElement;
    if (!videoElement) return;

    let newMovement = currentMovement;
    if (direction === "next") {
      newMovement = Math.min(
        currentMovement + 1,
        movementTimestamps.length - 1
      );
    } else {
      newMovement = Math.max(currentMovement - 1, 0);
    }

    setCurrentMovement(newMovement);
    videoElement.currentTime = movementTimestamps[newMovement];
  };

  return (
    <>
      <MediaController
        ref={mediaControllerRef as unknown as React.Ref<MediaControllerElement>}
      >
       {/* biome-ignore lint/a11y/useMediaCaption: no language */}
       <video slot="media" src="/videos/won-hyo.mp4" preload="auto">
          <track default label="Capítulos" kind="chapters" srcLang="es" src="/chapters/won-hyo.vtt" />
        </video>
        <MediaControlBar>
          <MediaPlayButton/>
          <MediaTimeRange/>
          <MediaTimeDisplay showDuration/>
          <MediaPlaybackRateButton/>
          <MediaMuteButton/>
        </MediaControlBar>
      </MediaController>
      <button type="button" onClick={() => goToMovement("prev")}>Anterior movimiento</button>
      <p>Won hyo - Movimiento {currentMovement + 1}</p>
      <button type="button" onClick={() => goToMovement("next")}>Siguiente movimiento</button>
    </>
  );
};

export default SimplePlayer;
