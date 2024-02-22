import {SkewLoader} from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <SkewLoader size={40} color={"purple"}/>
    </div>
  );
};

export default Loading;