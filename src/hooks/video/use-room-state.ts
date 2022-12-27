import { useEffect, useState } from "react";
import { useVideoContext } from "context/VideoProvider";

type RoomStateType = "disconnected" | "connected" | "reconnecting";

export default function useRoomState() {
  const { room } = useVideoContext();
  const [state, setState] = useState<RoomStateType>("disconnected");

  useEffect(() => {
    if (room) {
      const setRoomState = () => {
        console.log("new room state:", room.state)
        setState(room.state as RoomStateType)
      };
      setRoomState();
      room
        .on("disconnected", setRoomState)
        .on("reconnected", setRoomState)
        .on("reconnecting", setRoomState);
      return () => {
        room
          .off("disconnected", setRoomState)
          .off("reconnected", setRoomState)
          .off("reconnecting", setRoomState);
      };
    }
  }, [room]);

  return state;
}
