import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import sprintsData from "../../dummyResponseData/getAllSprints.json";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelectedTask } from "../../context/selectedTaskContext";
const SprintRow=({sprint})=>{
    const {selectedWorkstream, setSelectedSprintName, setSprintIndex}=useSelectedTask();
    const navigate=useNavigate();
    const handleNavigation=()=>{
        navigate(`/dashboard/workstreams/${selectedWorkstream}/sprint/${sprint.sprintId}`);
        // navigate(`/sprint/${sprint.sprintId}`)
        setSelectedSprintName(sprint.sprintName);
        setSprintIndex(sprint.sprintId);
    }
    return (
        <div onClick={handleNavigation} 
        className="flex p-3 text-sm text-gray-700 border-b border-gray-200 items-center divide-x divide-gray-300 cursor-pointer">
            <div className="w-1/2 truncate pr-4">{sprint.sprintName}</div>
            <div className="w-1/4 flex item-center pl-2 gap-2" >
            <div className="w-6 h-6 gap-2 flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0" style={{backgroundColor:"#3b4ca3"}}>{sprint.createdBy[0]?.toUpperCase()}</div>
            {sprint.createdBy}</div>
            <div className="w-1/4 gap-2 pl-2">{sprint.dueDate}</div>
            <div className="w-1/6 gap-2 pl-2">
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${sprint.sprintStatus==='Open'?'bg-green-100 text-green-700':'bg-gray-200 text-gray-700'}`}>
                {sprint.sprintStatus}</span>
            </div>
            <div className="w-1/6 flex gap-3 pr-2 pl-2">
                <button title="View" onClick={(e)=>{
                    e.stopPropagation();
                    console.log("View Clicked");
                }}className="text-blue-500 hover:text-blue-700">
                    <AiOutlineEye className="text-sm" />
                </button>
                <button title="Edit" onClick={(e)=>{e.stopPropagation();
                }}className="text-yellow-500 hover:text-yellow-600">
                    <AiOutlineEdit className="text-sm" />
                </button>
                <button title="Delete" onClick={(e)=>{
                    e.stopPropagation();
                    console.log("Delete clicked");
                }}className="text-red-500 hover:text-red-700">
                    <AiOutlineDelete className="text-sm"/>
                </button>
            </div>
        </div>
    )
}

const SprintsDashboard=()=>{
    const [currentSprintExpand, setCurrentSprintExpand]=useState(true);
    const [closeSprintExpand, setCloseSprintExpand]=useState(true);
    return (
        <div>
            <div onClick={()=>setCurrentSprintExpand((prev)=>!prev)}
                className="flex items-center gap-2 pt-5 cursor-pointer hover:opacity-80 transition">
                    {
                    currentSprintExpand ?
                    (<MdKeyboardArrowDown className="text-xl text-gray-700" />):(<MdKeyboardArrowUp className="text-xl text-gray-800 font-medium"/>)
                }
                <p className="text-sm text-gray-800 font-medium">Current Sprints</p>
            </div>
            {sprintsData.currentSprints?.length>0?currentSprintExpand && (
                <div>{sprintsData.currentSprints.map((sprint)=>(
                    <SprintRow key={sprint.sprintId} sprint={sprint}/>
                ))}
                    </div>
            ):(
                <div className="col-span-full flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-300 p-10 rounded-xl h-[30vh]">
                    <IoDocumentTextOutline className="text-4xl text-gray-400 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        No Active Sprints Available
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                            You don't have any active sprint right now, once created, they'll appear here.
                    </p>
                    </div>
            )}
            <div onClick={()=>setCloseSprintExpand((prev)=>!prev)}
                className="flex items-center gap-2 pt-2 cursor-pointer hover:opacity-80 transition">
                {
                    closeSprintExpand ?(
                        <MdKeyboardArrowDown className="text-xl text-gray-700" />
                    ):(<MdKeyboardArrowUp className="text-xl text-gray-700 font-medium"/>)
                }
                <p className="text-sm text-gray-800 font-medium">Close Sprints</p>
            </div>
            {closeSprintExpand && (
                <div> {sprintsData.closedSprints.length>0 ? (sprintsData.closedSprints.map((sprint)=>(
                    <SprintRow key={sprint.sprintId} sprint={sprint}/>
                ))):
                <div className="col-span-full flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-300 p-10 rounded-xl h-[30vh]">
                    <IoDocumentTextOutline className="text-4xl text-gray-400 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-600">
                        No Closed Sprints Available
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                            You don't have any closed sprint right now, once sprints are closed, they'll appear here.
                    </p>
                    </div>
                }
                    </div>
            )}
        </div>
    )
}

export default SprintsDashboard;