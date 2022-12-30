import NavBar from 'components/Home/NavBar'
import { ComponentProps } from 'react'

const AppLayout = ({ children }: ComponentProps<"div">) => {
	return (
		<div className="w-full bg-zinc-100 text-zinc-900 h-screen flex flex-col pb-10">
			<NavBar landing={false} className='bg-zinc-200 border-b-2 border-zinc-400' />
			{children}
		</div>
	)
}

export default AppLayout
