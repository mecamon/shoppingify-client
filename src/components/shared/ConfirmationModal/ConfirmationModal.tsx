import React from "react"

export default function ConfirmationModal({children}: any) {
  return (
    <div className="absolute flex justify-center z-50 w-full h-full bg-modal">
      <div className="relative flex flex-col h-min justify-center items-center mt-52 p-10 bg-white shadow-card rounded-xl">
        {children}
      </div>
    </div>
  )
}