import NavBar from 'components/Home/NavBar'
import { ComponentProps } from 'react'
import Image from 'next/image';

const LandingLayout = ({ children }: ComponentProps<"div">) => {
	return (
		<div className="w-full text-zinc-100 h-screen flex flex-col justify-between pb-10">
			<Image src="/images/Header.png" alt="header Image" fill className='z-[-1] ' />
			<NavBar />
			{children}
		</div>
	)
}

export default LandingLayout
