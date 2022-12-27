import { LocalParticipant, RemoteParticipant } from "twilio-video";

import { useVideoContext } from "context/VideoProvider";
import usePublications from "hooks/video/use-publications";
import Publication from "./Publication";

interface ParticipantTracksProps {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
}

export default function ParticipantTracks({
  participant,
  disableAudio,
}: ParticipantTracksProps) {
  const { room } = useVideoContext();
  const publications = usePublications(participant);
  const isLocal = participant === room!.localParticipant;

  return (
    <div className="w-[500px] h-[500px]">
      {publications.map((publication) => (
        <Publication
          key={publication.trackSid}
          publication={publication}
          participant={participant}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ))}
    </div>
  );
}
