import 'styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { RootProvider } from "context/rootProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <RootProvider>
        <Component {...pageProps} />
      </RootProvider>
    </>
  )
}
