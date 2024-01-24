import SettingsPage from "@/app/(root)/settings/_components";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings desc",
};

const Page = () => {
  return (
    <SettingsPage />
  );
};

export default Page;