import { useVideoContext } from "context/VideoProvider";
import useLocalAudioToggle from "hooks/video/use-local-audio-toggle";
import useLocalVideoToggle from "hooks/video/use-local-video-toggle";
import useRoomState from "hooks/video/use-room-state";

export default function Controls() {
  const roomState = useRoomState();
	const {disconnect} = useVideoContext();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

  return (
    <div className="absolute right-[50%] translate-x-1/2 bottom-[50px] z-[1]">
			<button className="btn" onClick={toggleAudioEnabled}>
				{isAudioEnabled ? "mute aud" : "unmute aud"}
			</button>
			<button className="btn" onClick={toggleVideoEnabled}>
				{isVideoEnabled ? "mute vid" : "unmute vid"}
			</button>

      {roomState === "connected" && (
				<button className="btn btn-secondary" onClick={() => disconnect()}>
					end call
				</button>
      )}
    </div>
  );
}
