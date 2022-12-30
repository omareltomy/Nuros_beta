import { Inter } from "@next/font/google";
import HeroSection from "components/Home/HeroSection";
import LandingLayout from "components/layout/LandingLayout";
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <LandingLayout>
      <HeroSection />
    </LandingLayout>
  );
};


Home.noAuth = true

export default Home;
