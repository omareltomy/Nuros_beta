import { useMutation } from "@tanstack/react-query";
import { useFirebase } from "context/firebase";
import { client } from "utils/client";

export const useCall = () => {
  const { token } = useFirebase();

  const {
    mutate: getAccessToken,
    data,
    isLoading,
    isError,
  } = useMutation<
    { accessToken: string },
    Error,
    { roomName: string; identity: string }
  >((data) => client("call/token", { token, data }));

	return { isLoading, isError, accessToken: data?.accessToken, getAccessToken };
};
