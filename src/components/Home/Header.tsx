import React from 'react'
import NavBar from './NavBar'
import MaxWidthWrapper from '../../utils/MaxWidthWraper';
import { FaGooglePlay } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import  Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
      <div className="bg-zinc-900 w-full text-zinc-100 max-h-screen relative z-[2] ">
          <Image src="/images/Header.png" alt="header Image" fill className='z-[-1] ' />
      <NavBar />
      <MaxWidthWrapper>
        <main className="w-full text-center h-max">
          <h1 className="flex flex-col gap-5 text-7xl font-normal mb-10">
            <span>Because mental</span>
            <span>health matters</span>
          </h1>
          <ul className="flex gap-4 justify-center">
            <li>
              <Link
                className="rounded-full px-6 py-2 grid place-content-center text-xl ring-1 ring-zinc-100 text-zinc-100"
                href="/login"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                className="rounded-full px-12 py-2 grid place-content-center text-xl bg-zinc-100 text-zinc-900"
                href="/signup"
              >
                Join us
              </Link>
            </li>
          </ul>

          <section className="flex justify-between ">
            <article>
              <h2 className="text-2xl font-normal text-left mb-5 max-w-sm">
                A mental healthcare system founded on monetizing altruism
              </h2>
              <div className="w-[200px] h-[1px] border-t-2 border-zinc-500 mb-5" />
              <div className="flex gap-5">
                <Link href="#" className="flex gap-1 items-center">
                  <FaGooglePlay className="w-12 h-12" />
                  <div className="text-left">
                    <p className="font-light text-sm text-zinc-400">Available on</p>
                    <p className="text-xl font-bold">Google Play</p>
                  </div>
                </Link>
                <Link href="#" className="flex gap-1 items-center">
                  <FaApple className="w-12 h-12" />
                  <div className="text-left">
                    <p className="font-light text-sm text-zinc-400">Download on the</p>
                    <p className="text-xl font-bold">App Store</p>
                  </div>
                </Link>
              </div>
            </article>
            <article className="border-l-2 border-zinc-500 pl-4">
              <h2 className="text-2xl font-normal text-left mb-5 max-w-xs">
                We are here to help you get through the hardest times
              </h2>
              <p className="text-lg text-zinc-500 font-normal text-left max-w-xs">
                <Link href="/signup" className="text-zinc-100 hover:underline">
                  Join now{" "}
                </Link>
                and match with a professional of choice
              </p>
            </article>
          </section>
        </main>
      </MaxWidthWrapper>
    </div>
  )
}

export default Header