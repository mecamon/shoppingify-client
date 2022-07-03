import React from "react"
import { useList } from "../../../providers/ListProvider"

export default function ToggleEditCompleteButton() {
  const { isCompleting, setIsCompleting } = useList()
  return (
    <div>
      { !isCompleting 
        ? <button 
            className="rounded-full bg-traslucid h-10 w-10 mx-2"
            onClick={() => setIsCompleting(prev => !prev)}
            >
            <span className="material-icons text-labels text-2xl">edit</span>
          </button>
        : <button 
            className="rounded-full bg-traslucid h-10 w-10 mx-2"
            onClick={() => setIsCompleting(prev => !prev)}
          >
            <span className="material-icons text-labels text-2xl">done</span>
          </button>
      }
    </div> 
  )
}