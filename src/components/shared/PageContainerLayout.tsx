import React from "react";

export function PageContainerLayout({children}: Props) {
  return (
    <>
    
        {children}

    </>
    
  )
}

interface Props {
  children: React.ReactNode
}