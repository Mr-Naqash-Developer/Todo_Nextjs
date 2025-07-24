"use client";

import { Trash2, Pencil, Save, SaveOff } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (editedText.trim() !== "") {
      onEdit(todo.id, editedText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      className="bg-white rounded p-3 shadow flex justify-between items-center mt-2"
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.input
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-1 flex-1 mr-2 outline-none"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-2"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => onToggle(todo.id)}
            >
              {todo.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={handleSave}
                    className="text-green-500 p-1 border border-green-500 rounded-full hover:bg-green-500 hover:text-white"
                  >
                    <Save size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded shadow-md animate-fade-in z-50"
                    sideOffset={5}
                  >
                    Save Edit
                    <Tooltip.Arrow className="fill-green-500" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={handleCancel}
                    className="text-red-500 border p-1 border-red-500 rounded-full hover:bg-red-500 hover:text-white"
                  >
                    <SaveOff size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md animate-fade-in z-50"
                    sideOffset={5}
                  >
                    Cancel Edit
                    <Tooltip.Arrow className="fill-red-500" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </>
        ) : (
          <>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={handleEdit}
                    className="text-blue-500 border border-blue-500 p-1 rounded-full hover:bg-blue-500 hover:text-white transition"
                  >
                    <Pencil size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md animate-fade-in z-50"
                    sideOffset={5}
                  >
                    Edit Todo
                    <Tooltip.Arrow className="fill-blue-500" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="text-red-500 border border-red-500 p-1 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md animate-fade-in z-50"
                    sideOffset={5}
                  >
                    Delete
                    <Tooltip.Arrow className="fill-red-500" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
