"use client"

import React from "react"

interface FilterButtonsProps {
  filter: "all" | "active" | "completed"
  setFilter: React.Dispatch<React.SetStateAction<"all" | "active" | "completed">>
}

const FilterButtons = ({ filter, setFilter } : FilterButtonsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button 
        className={filter === "all" ? "bg-blue-600 text-white px-2 py-1 rounded" : "bg-gray-200 px-2 py-1 rounded"}
        onClick={() => setFilter("all")}      
      >All</button>
      <button 
        className={filter === "active" ? "bg-blue-600 text-white px-2 py-1 rounded" : "bg-gray-200 px-2 py-1 rounded"}
        onClick={() => setFilter("active")}      
      >Active</button>
      <button 
        className={filter === "completed" ? "bg-blue-600 text-white px-2 py-1 rounded" : "bg-gray-200 px-2 py-1 rounded"}
        onClick={() => setFilter("completed")}      
      >Completed</button>
    </div>
  )
}

export default FilterButtons