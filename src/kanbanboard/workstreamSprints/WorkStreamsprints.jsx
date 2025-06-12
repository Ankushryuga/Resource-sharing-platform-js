import SprintsHeader from "./sprintsHeader";
import { useSelectedTask } from "../../context/selectedTaskContext";
import SprintsDashboard from "./sprintsDashboard";


const WorkStreamsprints=()=>{
    const {selectedTaskName}=useSelectedTask();
    return (
        <div className="flex h-full">
            <div className="flex-1 overflow-y-auto pt-3">
  <div className="pb-4 px-2">
  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
    <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
    Sprint Plan for <span className="text-indigo-600">{selectedTaskName}</span>
  </h2>
  <p className="text-sm text-gray-500 mt-1">Track and manage sprints effectively for this task.</p>
</div>

            <SprintsHeader />
            <div>
                <SprintsDashboard />
            </div>
            </div>
        </div>
    )
}


export default WorkStreamsprints;