import { useRef, useEffect } from "react";
import { VideoTrack as IVideoTrack } from "twilio-video";

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
}

export default function VideoTrack({ track, isLocal }: VideoTrackProps) {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const el = ref.current;
    track.attach(el);
    return () => {
      track.detach(el);
    };
  }, [track]);

  const style = isLocal ? { transform: "rotateY(180deg)" } : {};

  return <video className="w-full max-h-full object-contain" ref={ref} style={style} />;
}
