export function DroppableColumn({ id, label, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm max-h-[85vh] flex flex-col">
      <h2 className="text-center text-md font-semibold text-gray-700 py-3 sticky top-0 bg-gray-100 z-10">
        {label}
      </h2>
      <div className="space-y-4 p-2 overflow-y-auto pr-2 rounded-md custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
