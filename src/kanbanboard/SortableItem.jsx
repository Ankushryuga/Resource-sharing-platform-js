import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

export function SortableItem({ id, task, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isClick, setIsClick] = useState(true); // New state to track click vs drag
  const navigate = useNavigate();

  useEffect(() => {
    // If the item is being dragged, don't register click
    if (isDragging) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  }, [isDragging]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => {
    if (isClick) {
      console.log("Task clicked", task.taskId); // Debugging log
      navigate(`/taskdetails/${task.taskId}`);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick} // Attach the click handler here
    >
      {children}
    </div>
  );
}
