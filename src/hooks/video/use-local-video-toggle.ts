import { useVideoContext } from "context/VideoProvider";
import { useCallback } from "react";
import { LocalVideoTrack } from "twilio-video";
import useIsTrackEnabled from "./use-track-enabled";

export default function useLocalVideoToggle() {
  const { localTracks } = useVideoContext();
  const videoTrack = localTracks.find(
    (track) => track.name === "camera"
  ) as LocalVideoTrack;
  const isEnabled = useIsTrackEnabled(videoTrack);

  const toggleVideoEnabled = useCallback(() => {
    if (videoTrack) {
      videoTrack.isEnabled ? videoTrack.disable() : videoTrack.enable();
    }
  }, [videoTrack]);

  return [isEnabled, toggleVideoEnabled] as const;
}
