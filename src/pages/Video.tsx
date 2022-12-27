import Controls from "components/video/Controls";
import LocalVideoPreview from "components/video/LocalVideoPreview";
import Menu from "components/video/Menu";
import Room from "components/video/Room";
import useRoomState from "hooks/video/use-room-state";

export default function Video() {
  const roomState = useRoomState();

  return (
    <div className="flex flex-col h-screen">
      <Menu />
      <main className="h-full relative">
        {roomState === "disconnected" ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </main>
    </div>
  );
}
