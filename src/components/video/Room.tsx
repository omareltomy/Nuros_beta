import Participant from "./Participant";
import ParticipantList from "./ParticipantList";
import useMainSpeaker from "hooks/video/use-main-speaker";

export default function Room() {
  const mainParticipant = useMainSpeaker();
  return (
    <Container>
      <ParticipantList />
      <MainParticipantContainer>
        {/* audio is disabled for this participant component because this participant's audio
            is already being rendered in the <ParticipantList /> component.  */}
        <Participant participant={mainParticipant} disableAudio />
      </MainParticipantContainer>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full">{children}</div>;
}

function MainParticipantContainer({ children }: { children: React.ReactNode }) {
  return <div className="absolute inset-0">{children}</div>;
}
