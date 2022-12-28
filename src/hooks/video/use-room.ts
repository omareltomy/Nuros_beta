import Video, { ConnectOptions, LocalTrack, Room } from "twilio-video";
import { useCallback, useEffect, useRef, useState } from "react";

// @ts-ignore
// window.TwilioVideo = Video;

export default function useRoom(
  localTracks: LocalTrack[],
  options?: ConnectOptions
) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(
    (token: string, name: string) => {
      setIsConnecting(true);
      return Video.connect(token, {
        ...optionsRef.current,
        tracks: localTracks,
        name
      }).then(
        (newRoom) => {
          setRoom(newRoom);
          const disconnect = () => newRoom.disconnect();

          newRoom.once("disconnected", () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            setTimeout(() => setRoom(null));
            window.removeEventListener("beforeunload", disconnect);
          });

          // @ts-ignore
          // window.twilioRoom = newRoom;

          setIsConnecting(false);

          // Add a listener to disconnect from the room when a user closes their browser
          window.addEventListener("beforeunload", disconnect);
        },
        (error) => {
          console.log("error in use-room:", error)
          setIsConnecting(false);
        }
      );
    },
    [localTracks]
  );

  const disconnect = useCallback(() => {
    if (!room) return;
    console.log("disconnecting from room")
    room?.disconnect();
  }, [room])

  return { room, isConnecting, connect, disconnect };
}
