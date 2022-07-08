import React from "react"
import { TopCategory, TopItem } from "../../../models/models"

export default function ItemPercentage({topItem, barColor}: Props) {
  return (
    <>
      <div className="flex justify-between mb-2 mt-7">
        <span className="text-sm" data-testid="name">{topItem.name}</span>
        <span className="text-lg">{topItem.percentage+'%'}</span>
      </div>
      
      <div className="w-full h-2 bg-percentage-line rounded-lg">
        <div 
          data-testid="percentage"
          style={{
          width: `${topItem.percentage}%`,
          height: '100%',
          backgroundColor: barColor,
          borderRadius: '0.5rem'
        }}>
        </div>
      </div>
    </>
  )
}

interface Props {
  topItem: TopCategory | TopItem
  barColor: string
}