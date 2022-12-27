import { LocalParticipant, RemoteParticipant } from "twilio-video";

import usePublications from "hooks/video/use-publications";
import usePublicationIsTrackEnabled from "hooks/video/use-publication-track-enabled";

interface ParticipantInfoProps {
  participant: LocalParticipant | RemoteParticipant;
  children: React.ReactNode;
}

export default function ParticipantInfo({
  participant,
  children,
}: ParticipantInfoProps) {
  const publications = usePublications(participant);
  const isAudioEnabled = usePublicationIsTrackEnabled(
    publications.find((p) => p.trackName === "microphone")
  );
  const isVideoEnabled = usePublicationIsTrackEnabled(
    publications.find((p) => p.trackName === "camera")
  );

  return (
    <div className="relative">
      <InfoContainer hideVideo={!isVideoEnabled}>
        <div className="flex justify-between">
          <h4 className="bg-red-700">{participant.identity}</h4>
        </div>
        {!isAudioEnabled && "muted"}
      </InfoContainer>
      {children}
    </div>
  );
}

function InfoContainer ({children, hideVideo}: {children: React.ReactNode, hideVideo?: boolean}) {
  return (
    <div className={`absolute z-[1] flex flex-col justify-between h-full p-2 w-full ${hideVideo ? "bg-black" : "bg-transparent"}`}>
      {children}
    </div>
  )
}
