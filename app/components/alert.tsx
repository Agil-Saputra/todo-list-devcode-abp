// External Libaries
import { Dispatch, FC, SetStateAction } from "react";
import successAlert from "@/app/assets/static/alert.svg";
import Image from "next/image";

type AlertProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  kind : "Activity" | "List Item"
};

const Alert: FC<AlertProps> = ({ setSuccess, success, kind }) => {
  return (
    success && (
      <div onClick={() => setSuccess(false)} className="overlay">
        <div className="flex items-center gap-4 bg-white rounded-[12px] py-[17px] px-[27px] w-[490px]">
          <Image src={successAlert} alt="success alert" />
          <p>{kind} berhasil dihapus</p>
        </div>
      </div>
    )
  );
};
export default Alert;
