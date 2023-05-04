import { InputHTMLAttributes, Fragment } from "react";

interface SearchBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function SearchBox({onChange, ...rest} : SearchBoxProps){
  return (
    <Fragment>
      <input onChange={onChange}  className="border bg-indigo p-3 rounded-lg w-full" role="searchbox" {...rest} />
    </Fragment>
  )
}