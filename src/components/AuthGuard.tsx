import { useFirebase } from 'context/firebase';
import { useRouter } from 'next/router';
import { ComponentProps, useEffect } from 'react';
import toast from 'react-hot-toast';
import isServer from 'utils/IsServer';

const AuthGuard = ({ children }: ComponentProps<"div">) => {
	const { user, isFetchingUser, error, setError } = useFirebase();
	const router = useRouter()

	useEffect(() => {
		if (error) {
			toast.error(error);
			setError(null);
		}
	}, [error]);

	useEffect(() => {
		if (!user){
			router.push(`/login?next=${router.asPath}`)
		}
	}, [user])


	if (isServer() || isFetchingUser) return <p>loading user ...</p>

	if (user){
		return (
			<>{children}</>
		)
	}

	return null
}

export default AuthGuard
