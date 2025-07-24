"use client"

import { useState } from "react"

interface TodoInputProps {
  onAdd: (text: string) => void
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    const trimmed = input.trim()
    if(trimmed.length === 0) return;
    onAdd(trimmed)
    setInput("")
  }

  return (
    <div className="flex items-center">
      <input 
        type="text" 
        placeholder="Add new task"      
        className="flex-1 px-3 py-2 border rounded-md rounded-r-none focus:border-blue-600 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit()
        }}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white border border-blue-600 px-4 py-2 rounded-md rounded-l-none hover:bg-blue-700 hover:border-blue-700">Add</button>
    </div>
  )
}

export default TodoInput