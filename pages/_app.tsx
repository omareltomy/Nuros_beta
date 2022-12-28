import "../src/styles/tailwind.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { RootProvider } from "../src/context/rootProviders"
import { FirebaseProvider } from "context/firebase";
import AuthGuard from "components/AuthGuard";
import NoAuthGuard from "components/NoAuthGuard";
import { VideoProvider } from "context/VideoProvider";

export default function App({ Component, pageProps }: AppProps) {
  if (Component?.auth) {
    return (
      <FirebaseProvider>
        <RootProvider>
          <Toaster />
          <AuthGuard>
            <VideoProvider>
              <Component {...pageProps} />
            </VideoProvider>
          </AuthGuard>
        </RootProvider>
      </FirebaseProvider>
    )
  }

  if (Component?.noAuth) {
    return (
      <FirebaseProvider>
        <Toaster />
        <NoAuthGuard>
          <Component {...pageProps} />
        </NoAuthGuard>
      </FirebaseProvider>
    )
  }

  return (
    <Component {...pageProps} />
  );
}
