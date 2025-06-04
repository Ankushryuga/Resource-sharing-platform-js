import { useDroppable } from "@dnd-kit/core";

export function DroppableColumn({ id, label, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-xl shadow-sm max-h-[85vh] w-full sm:min-w-[250px] sm:w-auto flex flex-col shrink-0"
    >
      <h2 className="text-center text-md font-semibold text-gray-700 py-3 sticky top-0 bg-gray-100 z-10">
        {label}
      </h2>
      <div className="space-y-4 p-2 overflow-y-auto pr-2 rounded-md custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
