import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useQueryClient } from "@tanstack/react-query";
import Header from "../src/components/Home/Header";
import { useFirebase } from "context/firebase";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Home = () => {
  const { logoutUserFromFirebase } = useFirebase();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logoutUserFromFirebase();
    queryClient.clear();
  };

  return (
    // <div className="bg-zinc-900 w-full text-zinc-100 min-h-full bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgg})` }}>
   <Header/>
  );
};




export default Home;
