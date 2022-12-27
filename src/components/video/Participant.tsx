import { LocalParticipant, RemoteParticipant } from "twilio-video";
import ParticipantInfo from "./ParticipantInfo";
import ParticipantTracks from "./ParticipantTracks";

interface ParticipantProps {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
}

export default function Participant({
  participant,
  disableAudio,
}: ParticipantProps) {
  return (
    <ParticipantInfo participant={participant}>
      <ParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
      />
    </ParticipantInfo>
  );
}
