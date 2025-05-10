import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { DroppableColumn } from "./DroppableColumn";
import taskDataRaw from "../dummyResponseData/getAllTasks.json";
import configurations from "../config/config";

const statusOrder = [
  { key: "todo", label: "TO DO" },
  { key: "inprogress", label: "In Progress" },
  { key: "inreview", label: "In Review" },
  { key: "reopened", label: "Re-Opened" },
  { key: "closed", label: "Closed" },
];

const getColorByPriority = (priority) => {
  const match = configurations.headerTaskPriorityInformations.find(
    (p) => p.name.toLowerCase() === priority.toLowerCase()
  );
  return match ? `#${match.colorCode}` : "#999999";
};

const initialData = () => {
  const data = {};
  statusOrder.forEach((status) => {
    data[status.key] = taskDataRaw[status.key] || [];
  });
  return data;
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialData);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    const { active } = event;
    const taskId = active.id;
    for (let key of Object.keys(tasks)) {
      const found = tasks[key].find((t) => t.taskId === taskId);
      if (found) {
        setActiveTask(found);
        break;
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    let sourceCol, destCol;
    for (let key of Object.keys(tasks)) {
      if (tasks[key].some((t) => t.taskId === activeId)) {
        sourceCol = key;
      }
      if (key === overId || tasks[key].some((t) => t.taskId === overId)) {
        destCol = key;
      }
    }

    if (!sourceCol || !destCol) return;

    const taskItem = tasks[sourceCol].find((t) => t.taskId === activeId);
    const newSource = tasks[sourceCol].filter((t) => t.taskId !== activeId);
    const newDest = overId === destCol
      ? [taskItem, ...tasks[destCol]]
      : (() => {
          const index = tasks[destCol].findIndex((t) => t.taskId === overId);
          const list = [...tasks[destCol]];
          list.splice(index, 0, taskItem);
          return list;
        })();

    setTasks({
      ...tasks,
      [sourceCol]: newSource,
      [destCol]: newDest,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-2 lg:px-4 h-full">
        {statusOrder.map((status) => (
          <DroppableColumn id={status.key} key={status.key} label={status.label}>
            <SortableContext
              items={tasks[status.key].map((task) => task.taskId)}
              strategy={verticalListSortingStrategy}
            >
              {tasks[status.key].map((task) => (
                <SortableItem key={task.taskId} id={task.taskId}>
                  <div
                    className="bg-white rounded-xl p-4 shadow transition-transform duration-200 ease-in-out hover:scale-[1.02] cursor-grab active:scale-95"
                    style={{ borderLeft: `5px solid ${getColorByPriority(task.priority)}` }}
                  >
                    <h3
                      className="text-sm font-semibold text-gray-800 truncate"
                      title={task.taskName}
                    >
                      {task.taskName}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Priority:</span>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getColorByPriority(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-[#EEF0F8] px-2 py-1 rounded-md">
                      <span className="text-xs text-gray-600">#{task.taskId}</span>
                      <div
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold leading-none"
                        title={`Assigned to ${task.assignedTo}`}
                        style={{ backgroundColor: getColorByPriority(task.priority) }}
                      >
                        {task.assignedTo[0]?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div
            className="bg-white rounded-xl p-4 shadow-lg scale-105 border-l-4"
            style={{ borderLeftColor: getColorByPriority(activeTask.priority) }}
          >
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {activeTask.taskName}
            </h3>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
