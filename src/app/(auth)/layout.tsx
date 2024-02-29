import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Banner from "@/app/(auth)/_components/banner";
import type {Metadata} from "next";
import {RandomBanner} from "@/utils/functions/random-banner";
import {Banners} from "@/utils/constants/banners";
import {authOptions} from "@/utils/constants/auth";

export const metadata: Metadata = {
  title: "Sociality auth",
  description: "Sociality auth desc",
};

const Layout = async ({children}: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const bannerUrl: string = RandomBanner(Banners);

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-2 w-screen h-screen">
      <Banner url={bannerUrl}/>
      {children}
    </div>
  );
};

export default Layout;