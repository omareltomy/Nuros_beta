import useLocalTracks from "hooks/video/use-local-tracks";
import useRoom from "hooks/video/use-room";

import { createContext, ReactNode, useContext } from "react";
import { ConnectOptions, LocalTrack, Room } from "twilio-video";

export interface IVideoContext {
  room: Room | null;
  localTracks: LocalTrack[];
  isConnecting: boolean;
  connect: (token: string, name: string) => Promise<void>;
  disconnect: () => void;
}

export const VideoContext = createContext<IVideoContext>(null!);

interface VideoProviderProps {
  options?: ConnectOptions;
  children: ReactNode;
}

export function VideoProvider({
  options,
  children,
}: VideoProviderProps) {
  const localTracks = useLocalTracks();
  const { room, isConnecting, connect, disconnect } = useRoom(localTracks, options);

  return (
    <VideoContext.Provider value={{ room, localTracks, isConnecting, connect, disconnect }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  };
  return context;
}
