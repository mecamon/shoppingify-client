import React from "react"

export function OldListItemCard({item}: {item: any}) {
  return (
    <div>
      <div 
        className="item-card"
        data-testid="item">
        <span data-testid="name" className="block text-base text-bubble-label">{item.name}</span>
        <span className="text-accent-2 text">{item.quantity + 'pcs'}</span>
      </div> 
    </div>
  )
}