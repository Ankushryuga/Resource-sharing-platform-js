import { useNavigate } from "react-router-dom";
import getTaskDashBoard from "../../dummyResponseData/getTaskDashboard.json";
import { IoDocumentTextOutline } from "react-icons/io5"; // Optional icon for empty state
import { useSelectedTask } from "../../context/selectedTaskContext";

const TaskDashBoard = () => {
  const navigate = useNavigate();
  const tasks = getTaskDashBoard?.data;
  const {setSelectedTaskName}=useSelectedTask();

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-2 lg:px-4 py-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.contentId}
                onClick={() => {
                    setSelectedTaskName(task.contentName);  //Set name globally..
                    navigate(`/task/${task.contentId}`)}}
                className="bg-white rounded-xl p-4 shadow transition-transform duration-300 ease-in-out hover:scale-[1.02] relative cursor-pointer"
                style={{ borderLeft: `5px solid #3b4ca3` }}
              >
                <h3
                  className="text-md font-semibold text-gray-800 truncate"
                  title={task.contentName}
                >
                  {task.contentName}
                </h3>
                <div className="flex items-center justify-between mt-1 pt-5">
                  <p className="text-sm text-gray-500 truncate">
                    Owner: {task.owner}
                  </p>
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#3b4ca3" }}
                  >
                    {task.owner[0]?.toUpperCase()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // <div className="col-span-full flex items-center justify-center h-[60vh]">
            <div className="col-span-full flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-300 p-10 rounded-xl h-[80vh]">
              <IoDocumentTextOutline className="text-4xl text-gray-400 mb-2" />
              <h2 className="text-lg font-semibold text-gray-600">No Tasks Available</h2>
              <p className="text-sm text-gray-500 mt-1">
                You haven’t created any tasks yet. Once available, they’ll appear here.
              </p>
            </div>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDashBoard;
