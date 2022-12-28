import { useFirebase } from 'context/firebase'
import { useRouter } from 'next/router'
import isServer from './IsServer'

const withoutAuth = (page: () => JSX.Element) => {
	const { user, isFetchingUser, error } = useFirebase()
	const router = useRouter()

	console.log("in without auth", user)

	if (isFetchingUser || isServer()) {
		return <h2>"loading ... "</h2>
	}

	if (!user) {
		return page()
	}

	router.replace(`/profile`)
}

export default withoutAuth
