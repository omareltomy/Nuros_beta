import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
  VideoTrack as IVideoTrack
} from "twilio-video";

import useTrack from "hooks/video/use-track";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
  isLocal: boolean;
  disableAudio?: boolean;
}

export default function Publication({
  publication,
  isLocal,
  disableAudio,
}: PublicationProps) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case "video":
      return <VideoTrack track={track as IVideoTrack} isLocal={isLocal} />;
    case "audio":
      return disableAudio ? null : <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
}
