import { useVideoContext } from "context/VideoProvider";
import { useEffect, useState } from "react";
import { RemoteParticipant } from "twilio-video";

/**
 * This hook returns an array of the video room's participants.
 */

export default function useParticipants() {
  const { room } = useVideoContext();
  const [participants, setParticipants] = useState(
    Array.from(room?.participants.values() ?? [])
  );

  useEffect(() => {
    if (room) {
      const participantConnected = (participant: RemoteParticipant) => {
        console.log("participantConnected", participant);

        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);

        const participantDisconnected = (participant: RemoteParticipant) =>
          setParticipants((prevParticipants) =>
            prevParticipants.filter((p) => p !== participant)
          );

        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        return () => {
          room.off("participantConnected", participantConnected);
          room.off("participantDisconnected", participantDisconnected);
        };
      };
    }
  }, [room]);

  return participants;
}
