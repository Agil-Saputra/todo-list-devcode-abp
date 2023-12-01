// External Libaries
import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";
import { FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactNode;
  icon?: ReactNode;
  disabledButton?: boolean;
  data? : string
}

const Button: FC<ButtonProps> = ({ text, icon, disabledButton, data, ...props }) => {
  return (
    <button
	 {...props}
      data-cy={data}
      className={
        (disabledButton ? "opacity-50 pointer-events-none" : "pointer-events-auto") +
        " w-[150px] bg-primary flex items-center gap-2 text-white font-[700] py-[12px] px-[15px] rounded-[2.9rem] text-[1rem] text-center leading-[1.5rem] mt-[1.4rem]"
      }
    >
      {icon}
      <div className="w-full text-center">{text}</div>
    </button>
  );
};
export default Button;
