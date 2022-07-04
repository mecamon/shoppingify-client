import React from "react";

export default function DisplayErrors({errs}: Props) {
  
  function formatOutput() {
    if (errs instanceof Object) {
      return  Object.values(errs).map((value, i) => 
        <span key={i} data-testid="err-message" className="block">{value as string}</span> )
    } else {
     return <span data-testid="err-message" className="block">{errs as string}</span>
    }
  }

  return (
    <div className="flex flex-col">
      { formatOutput() }
    </div>
  )
}

interface Props {
  errs: any
}