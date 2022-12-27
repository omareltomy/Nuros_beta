import { useVideoContext } from "context/VideoProvider";
import useDominantSpeaker from "./use-dominant-speaker";
import useParticipants from "./use-participants";

export default function useMainSpeaker() {
  const { room } = useVideoContext();
  const participants = useParticipants();
  const dominantSpeaker = useDominantSpeaker();

  return dominantSpeaker || participants[0] || room?.localParticipant;
}
