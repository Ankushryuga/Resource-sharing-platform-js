import { useNavigate } from "react-router-dom";

//dummy data:
import { IoDocumentTextOutline } from "react-icons/io5"; // Optional icon for empty state
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useSelectedTask } from "../../context/selectedTaskContext";
import configurations from "../../config/config";
import { useEffect, useState } from "react";
import getTaskDashBoard from "../../dummyResponseData/getTaskDashboard.json";
const baseURL = configurations.baseURL;

const WorkStreamDashBoard = ({ active }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cacheWorkStream, setCacheWorkStream] = useState([]);
  const [cacheInActiveWorkStream, setCacheInActiveWorkStream] = useState([]);

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  // const tasks = getTaskDashBoard?.data;    //this is for dummy data
  const { setSelectedTaskName, setSelectedWorkstream } = useSelectedTask();
  const value = "ankushraj";
  const fetchWorkStreamData = async () => {
    if (cacheWorkStream.length > 0) {
      setTasks(cacheWorkStream);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseURL}workstreams/getAllWorkstreams?owner=${value}`
        // baseURL + "/workstreams/getAllWorkstreams?owner=" + value
      );
      if (!response.ok) {
        throw new Error("Failed to fetch workstreams");
      }
      const json = await response.json();
      setTasks(json);
      setCacheWorkStream(json);
    } catch (error) {
      console.log("Error occured whiled fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInActiveWorkStreamData = async () => {
    if (cacheInActiveWorkStream.length > 0) {
      setTasks(cacheInActiveWorkStream);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseURL}workstreams/getAllInActiveWorkstreams?owner=${value}`
      );
      if (!response.ok) {
        throw new Error("Faied to fetch workstreams");
      }
      const json = await response.json();
      setTasks(json);
      setCacheInActiveWorkStream(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setTasks([]);
      if (active === true) {
        await fetchWorkStreamData();
      } else {
        await fetchInActiveWorkStreamData();
      }
    };
    fetchData();
  }, [active]);

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-4 py-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.workStreamId}
                onClick={() => {
                  setSelectedWorkstream(task.workStreamId);
                  setSelectedTaskName(task.contentName); //Set name globally..
                  navigate(`/dashboard/workstreams/${task.workStreamId}`);
                }}
                className="bg-white rounded-xl p-4 shadow transition-transform duration-300 ease-in-out hover:scale-[1.02] relative cursor-pointer"
                style={{ borderLeft: `5px solid #3b4ca3` }}
              >
                <div className="flex items-center justify-between w-full">
                  <h3
                    className="text-md font-semibold text-gray-800 truncate"
                    title={task.contentName}
                  >
                    <span className="text-gray-500">Project Name: </span>
                    {task.contentName}
                  </h3>
                  <BiDotsHorizontalRounded className="text-lg hover:transition-all" />
                </div>
                <p className="text-sm font-semibold text-gray-500 truncate pt-2">
                  Info: {task.contentDescription}
                </p>

                {/* Managers list:: */}
                {/*                 
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-gray-700 font-medium pr-2">
                    Managers:
                  </span>
                  <div className="flex gap-1">
                    {task.managers.map((manager, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0 ml-1"
                        style={{ backgroundColor: "#3b4ca3" }}
                        title={manager.username}
                      >
                        {manager.username[0]?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-gray-700 font-medium pr-2">
                    Reporters:
                  </span>
                  <div className="flex gap-1">
                    {task.reporters.map((reporter, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0 ml-1"
                        style={{ backgroundColor: "#3b4ca3" }}
                        title={reporter.username}
                      >
                        {reporter.username[0]?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-gray-700 font-medium pr-2">
                    Testers:
                  </span>
                  <div className="flex gap-1">
                    {task.testers.map((tester, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-black shrink-0 ml-1"
                        style={{ backgroundColor: "#3b4ca3" }}
                        title={tester.username}
                      >
                        {tester.username[0]?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-gray-700 font-medium pr-2">
                    Members:
                  </span>
                  <div className="flex gap-1">
                    {task.contributers.map((members, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0 ml-1"
                        style={{ backgroundColor: "#3b4ca3" }}
                        title={members.username}
                      >
                        {members.username[0]?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="flex items-center justify-between pt-5">
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
              <h2 className="text-lg font-semibold text-gray-600">
                No Workstreams Available
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You haven’t created any workstreams yet. Once available, they’ll
                appear here.
              </p>
            </div>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkStreamDashBoard;
