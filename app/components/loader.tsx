import { FC } from "react";

type LoaderProps = {
	color : "white" | "error" | "primary"
};

const Loader: FC<LoaderProps> = ({color}) => {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-r-transparent border-4 border-solid border-${color} align-middle motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
    </div>
  );
};
export default Loader;
