import { useVideoContext } from "context/VideoProvider";
import useParticipants from "hooks/video/use-participants";
import Participant from "./Participant";

export default function ParticipantList() {
  const { room } = useVideoContext();
  const participants = useParticipants();

  return (
    <Container>
      {/* <Participant participant={room!.localParticipant} /> */}
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <aside className="absolute inset-0 p-4">{children}</aside>;
}
