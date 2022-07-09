import { useItems } from "../../providers/ItemsProvider";

export default function Pagination() {
  const { pages, currentPage, changePage } = useItems()

  return (
    <div className="flex items-center">
      <button 
        className="flex items-center hover:bg-white rounded-full"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        >
        <span className="material-icons text-labels text-4xl">chevron_left</span>
      </button>
      { pages.map(p => 
        <button 
          key={p} 
          onClick={() => changePage(p)}
          className={ currentPage === p 
            ? "rounded-full w-8 h-8 mx-1 text-white bg-accent-2 shadow-card" 
            : "rounded-full w-8 h-8 mx-1 text-labels bg-white shadow-card"}>
          {p}
        </button> ) }
      <button 
        className="flex items-center hover:bg-white rounded-full"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pages.length}
        >
        <span className="material-icons text-labels text-4xl">chevron_right</span>
      </button>
    </div>
  )
}