import CreateProfile from "components/Profile/CreateProfile";
import ProfileView from "components/Profile/ProfileView";

import { useFirebase } from "context/firebase";
import { useFetchProfile } from "hooks/api/use-profile";

const Profile = () => {
	const { user, token } = useFirebase()
  const { data, isLoading, error } = useFetchProfile(user?.uid, token)

  if (isLoading) return <p>Loading profile ...</p>
  if ((error as any)?.code === 404 || !data?.profile) return <CreateProfile />

	return <ProfileView profile={data.profile} />;
}

export default Profile
