import { memo, type ReactElement } from "react";

 type Variants = "primary" | "secondary"

 export interface ButtonProps {
     variant : Variants;
     size : "sm"|"md"|"lg";
     text : string;
     startIcon?: ReactElement;
     endIcon?: ReactElement;
     fullWidth ?: boolean;
     loading ?: boolean;
     onClick ?: () => void;
 }


 const variantStyles = {
     "primary":"bg-purple-600 text-white",
     "secondary":"bg-purple-300 text-purple-600 "
 }

 const sizeStyles = {
     "sm":"py-1 px-2 text-sm rounded-xl",
     "md":"py-2 px-4 text-md rounded-md",
     "lg":"py-4 px-6 text-xl rounded-sm"
 }
 const defaultStyles = "rounded-md font-light flex hover:opacity-60"
 
 export const Button = memo((props : ButtonProps) => {
  const {fullWidth,variant,size,startIcon,text,endIcon,loading,onClick} = props

    return <button 
            disabled={loading}
            onClick={onClick}
            className={`${loading ? "opacity-45 " : "" } ${fullWidth ? " w-full flex justify-center items-center ":"" } ${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]}`}>  
              <div className="flex justify-center items-center">
                {startIcon}
                 <div className="pl-2 pr-2">
                    {text}
                 </div>
                {endIcon}
              </div>
           </button>
 })

 


