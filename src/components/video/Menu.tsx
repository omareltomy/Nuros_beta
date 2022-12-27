import { useVideoContext } from "context/VideoProvider";
import useRoomState from "hooks/video/use-room-state";
import { useFirebase } from "context/firebase";
import { useCall } from "hooks/api/use-call";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Menu() {
	const { user } = useFirebase();
	const { getAccessToken, accessToken, isLoading, isError } = useCall();

  const roomState = useRoomState();
  const { isConnecting, connect } = useVideoContext();

	const { query } = useRouter();
	const recepientId = query.user;

	const roomName = `${user?.uid}-${recepientId}`

	const handleCallUser = () => {
		getAccessToken({ roomName, identity: user!.uid });
	};

	if (isError) {
		toast.error("Could not start call, please try again.");
	}

	useEffect(() => {
		if (accessToken) {
			connect(accessToken, roomName);
		}
	}, [accessToken]);

  return (
    <>
      {roomState === "disconnected" ? (
        <div>
          <button onClick={() => handleCallUser()} className="btn" disabled={isConnecting || isLoading || !user || !roomName}
          >
          	{isConnecting ? "connecting ..." : "Join room"}
          </button>
        </div>
      ) : null}
    </>
  );
}
