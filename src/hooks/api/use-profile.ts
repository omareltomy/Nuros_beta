import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProfileDto, IProfileFormData } from "interfaces/profile";
import { toast } from "react-hot-toast";
import { client } from "utils/client";

/**
 * Fetches a user's profile
 */
const useFetchProfile = (userId?: string, token?: string) => {
	const result = useQuery({
    queryKey: ["profile", { userId }],
    queryFn: ({signal}) => client(`profile/${userId}`, { token, signal }),
  });

	return { ...result, profile: result.data};
}

const useCreateProfile = (token?: string) => {
	const queryClient = useQueryClient();

	const {mutate, ...rest} = useMutation<IProfileDto, Error, IProfileFormData>((data) => client(`profile`, { token, data }), {
		onSettled: (data, error, variables, context) => {
			if (error){
				toast.error(error.message)
			}

			if (data) {
				const profile = data.profile;
				toast.success("Profile created successfully!")
				queryClient.setQueryData(["profile", { userId: profile.uid }], { profile });
			}
		}
	});

	return { ...rest, createProfile: mutate};
}

export { useFetchProfile, useCreateProfile };
