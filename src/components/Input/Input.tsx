interface InputProps {
      refe ?:any,
      placeholder ?: string,
      value ?:string
}

export function Input(props : InputProps) {
    const { placeholder , refe, value} = props
      return <div>
         <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-3"  ref = {refe} defaultValue={value}></input>
      </div>
 }