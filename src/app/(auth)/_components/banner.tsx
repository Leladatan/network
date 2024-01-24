import Image from "next/image";

const Banner = ({url}: {url: string}) => {
  return (
    <div className="relative">
      <Image src={url} alt={"Banner"} fill priority />
    </div>
  );
};

export default Banner;