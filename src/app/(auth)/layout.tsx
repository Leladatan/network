import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Banner from "@/app/(auth)/_components/banner";
import type {Metadata} from "next";
import {RandomBanner} from "@/utils/functions/randomBanner";
import {Banners} from "@/utils/constants/banners";

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