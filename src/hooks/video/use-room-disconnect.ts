import { Room, TwilioError } from "twilio-video";
import { useEffect } from "react";

export default function useHandleRoomDisconnection(
  room: Room | null,
  removeLocalAudioTrack: () => void,
  removeLocalVideoTrack: () => void,
) {
  useEffect(() => {
    if (room) {
      const onDisconnected = (_: Room, error: TwilioError) => {
        if (error) {
          // do something
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();
      };

      room.on("disconnected", onDisconnected);
      return () => {
        room.off("disconnected", onDisconnected);
      };
    }
  }, [
    room,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
  ]);
}
