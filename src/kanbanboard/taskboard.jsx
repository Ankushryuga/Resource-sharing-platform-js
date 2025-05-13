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
import { SortableItem } from "./SortableItem"; // a simple sortable wrapper
import { DroppableColumn } from "./DroppableColumn"; // a droppable wrapper per column
import taskDataRaw from "../dummyResponseData/getAllTasks.json";
import configurations from "../config/config";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleDragStart = (event) => {
    const { active } = event;
    for (const key in tasks) {
      const task = tasks[key].find((t) => t.taskId === active.id);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    let sourceCol, destCol;
    for (let key of Object.keys(tasks)) {
      if (tasks[key].some((t) => t.taskId === active.id)) {
        sourceCol = key;
      }
      if (key === over.id || tasks[key].some((t) => t.taskId === over.id)) {
        destCol = key;
      }
    }

    if (!sourceCol || !destCol) return;

    const activeTaskObj = tasks[sourceCol].find((t) => t.taskId === active.id);
    const newSourceTasks = tasks[sourceCol].filter(
      (t) => t.taskId !== active.id
    );
    const newDestTasks =
      over.id === destCol
        ? [activeTaskObj, ...tasks[destCol]]
        : (() => {
            const index = tasks[destCol].findIndex((t) => t.taskId === over.id);
            const newList = [...tasks[destCol]];
            newList.splice(index, 0, activeTaskObj);
            return newList;
          })();

    setTasks({
      ...tasks,
      [sourceCol]: newSourceTasks,
      [destCol]: newDestTasks,
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
          <DroppableColumn
            id={status.key}
            key={status.key}
            label={status.label}
          >
            <SortableContext
              items={tasks[status.key].map((task) => task.taskId)}
              strategy={verticalListSortingStrategy}
            >
              {tasks[status.key].map((task) => (
                <SortableItem key={task.taskId} id={task.taskId}>
                  <div
                    className="bg-white rounded-xl p-4 shadow transition-transform duration-300 ease-in-out hover:scale-[1.02] relative"
                    style={{
                      borderLeft: `5px solid ${getColorByPriority(
                        task.priority
                      )}`,
                    }}
                    // onClick={() =>

                    //   navigate(`/taskdetails/${task.taskId}`, {
                    //     state: { task },
                    //   })
                    // }
                  >
                    <h3
                      className="text-sm font-semibold text-gray-800 cursor-grab truncate"
                      title={task.taskName}
                    >
                      {task.taskName}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">
                        Priority:
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                        style={{
                          backgroundColor: getColorByPriority(task.priority),
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-[#EEF0F8] px-2 py-1 rounded-md">
                      <span className="text-xs text-gray-600">
                        #{task.taskId}
                      </span>
                      <div
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold leading-none"
                        title={`Assigned to ${task.assignedTo}`}
                        style={{
                          backgroundColor: getColorByPriority(task.priority),
                        }}
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
            className="bg-white rounded-xl p-4 shadow-2xl scale-105 opacity-90 relative"
            style={{
              borderLeft: `5px solid ${getColorByPriority(
                activeTask.priority
              )}`,
            }}
          >
            <h3
              className="text-sm font-semibold text-gray-800 truncate"
              title={activeTask.taskName}
            >
              {activeTask.taskName}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">Priority:</span>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                style={{
                  backgroundColor: getColorByPriority(activeTask.priority),
                }}
              >
                {activeTask.priority}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Due: {new Date(activeTask.dueDate).toLocaleDateString()}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
