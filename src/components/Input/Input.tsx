interface InputProps {
      ref ?:any,
      placeholder ?: string
}

export function Input(props : InputProps) {
    const { placeholder , ref} = props
      return <div>
         <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-3"  ref = {ref}></input>
      </div>
 }