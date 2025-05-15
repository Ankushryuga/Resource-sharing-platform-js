import { useParams } from "react-router-dom";
import { SiTask } from "react-icons/si";
import {motion, AnimatePresence} from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";



const taskName="This is dummy task for just for testing purpose and later on will be fetching from backend server, so for now just use this dummy task please, and thank you for cordinating."
const dummyDescription=taskName;

export default function TaskDetails() {
  const [detailExpand, setDetailExpand]=useState(true);
  const [descriptionExpand, setDescriptionExpand]=useState(true);
  const [attachmentExpand, setAttachmentExpand]=useState(true);
  const [activityExpand, setActivityExpand]=useState(true);
  const [peopleExpand, setPeopleExpand]=useState(true);
  const [dateExpand, setDateExpand]=useState(true);

  const {taskId}=useParams();
  return (
    <div className="flex">
      <div className="w-3/4 flex-none">
    <motion.div initial={{x:-100, opacity:0, rotateY:-10}}
    animate={{x:0, opacity:1, rotateY:0}}
    transition={{type:"spring", stiffness:100, damping:15}}
    className="grid grid-cols-1 gap-4 h-full"
    >
      <div className="flex-1 overflow-y-auto space-y-1 p-4 hide-scrollbar bg-transparent">
        <span className="text-xs font-bold text-gray-700 flex gap-5">
          <SiTask className="text-2xl transition"/>#{taskId}</span>
          <h3 className="text-sm pl-10 font-semibold text-gray-800 truncate" title={taskName}>{taskName}
          </h3>
          <motion.div
            style={{ backgroundColor: "#EEF0F8" }} // Correct way to set background color inline
           whileHover={{scale:1.05, backgroundColor:"#EEF0F8"}}
          whileTap={{scale:0.95}}
          onClick={()=>{
            console.log("Edit button clicked")
          }}
          
          className="flex mt-5 items-center gap-2 px-3 py-2 bg-white/10 rounded-md cursor-pointer border border-white/20 backdrop-blur-sm sm:w-20 md:w-22 lg:w-24"
          >
            <CiEdit className="text-2xl bg-white/10 shadow-none" />
            <p className="text-xs text-black font-medium pt-0.5">Edit</p>
          </motion.div>

          <div onClick={()=>setDetailExpand(!detailExpand)} className="flex items-center
           gap-2 pt-5 cursor-pointer hover:opacity-80 transition">
            {detailExpand ?(
              <MdKeyboardArrowDown className="text-xl text-gray-700" />
            ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium"/>}
            <p className="text-sm text-gray-800 font-medium">Details</p>
          </div>

          {/* Contents */}
            {detailExpand && (
              <AnimatePresence>
                <motion.div initial={{opacity:0, y:-5}}
                  animate={{opacity:1, y:0}}
                  exit={{opacity:0, y:-5}}
                  transition={{duration:0.2}}
                  className="pl-6 pt-4 space-y-4"
                >
                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 w-40">Type:</p>
                    <div className="flex items-center gap-2 text-sm text-black">
                  <MdCheckBox className="text-xl text-gray-700"/>
                  <span>Task</span>
                    </div>
                    <div className="pl-50 items-center gap-4 flex">
                    <p className="text-sm text-gray-500 w-40">Status:</p>
                    <motion.span className="inline-flex items-center justify-center px-10 py-2 rounded-md text-white font-semibold text-xs shadow-md"
                      style={{backgroundColor:"#7F899E"}}
                      initial={{opacity:0, scale:0.95}}
                      animate={{opacity:1, scale:1}}
                      whileHover={{
                        scale:1.05,
                      boxShadow:"0 0 10px rgba(127, 137, 158, 0.6)"
                      }}
                      transition={{type:"spring", stiffness:200, damping:12}}
                    >  In Progress
                    </motion.span>
                    </div>
                  </div>
                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 w-40">Priority:</p>
                    <div className="flex items-center gap-2 text-sm text-black">
                      <motion.div
                        whileHover={{
                          y: [0, -5, 0], // Bouncing effect
                          transition: {
                            repeat: Infinity,
                            duration: 0.6,
                            ease: "easeInOut"
                          }
                        }}
                        className="text-xl text-red-500"
                      >
                      <MdKeyboardDoubleArrowUp className="text-xl text-red-500"/>
                      </motion.div>
                      <span>Immediate</span>
                    </div>
                    <div className="pl-40 items-center gap-4 flex">
                    <p className="text-sm text-gray-500 w-40">Resolution:</p>
                    <motion.span 
                    className="inline-flex items-center justify-center py-2 text-black font-semibold text-xs">Unresolved
                    </motion.span>
                  </div>
                  </div>

                </motion.div>
              </AnimatePresence>
          )}
              <div onClick={()=>setDescriptionExpand(!descriptionExpand)} className="flex items-center gap-2 pt-5 cursor-pointer hover:opacity-80 transition">
            {descriptionExpand ? (
              <MdKeyboardArrowDown className="text-xl text-gray-700" />
            ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium" />}
          <p className="text-sm text-gray-800 font-medium">Description</p>
          </div>
          {/* Description Expand: */}
          {descriptionExpand && (
            <AnimatePresence>
              <motion.div initial={{opacity:0, y:-5}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-5}}
              transition={{duration:0.2}}
              className="pl-6 pt-4 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 w-full">{dummyDescription}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          <div onClick={()=>setAttachmentExpand(!attachmentExpand)} className="flex items-center gap-2 pt-5 cursor-pointer hover:opacity-80 transition">
            {attachmentExpand ?(
              <MdKeyboardArrowDown className="text-xl text-gray-700" />
            ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium"/>
          }
          <p className="text-sm text-gray-800 font-medium">Attachments</p>
          </div>
          {attachmentExpand && (
            <AnimatePresence>
              <motion.div initial={{opacity:0, y:-5}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-5}}
              transition={{duration:0.2}}
              className="pl-6 pt-4 space-y-4">
                {/* <div className="relative w-full bg-white shadow-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-md"></div>
                 <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-md"></div>
                  <p className="truncate text-gray-800">
    This is a very long text that will be trimmed and won't wrap to the next line.
                  </p>
                </div> */}
                <div className="flex justify-center items-center w-full p-4 bg-white border border-gray-300 rounded-md shadow-sm gap-2">
                  <IoCloudUpload className="text-2xl"/>
  <p className="truncate text-sm text-gray-800">This box has a subtle trim using border.</p>
</div>
              </motion.div>
            </AnimatePresence>
          )}
          <div onClick={()=>setActivityExpand(!activityExpand)} className="flex items-center gap-2 pt-5 cursor-pointer hover:opacity-80 transition">
            {activityExpand ?(
              <MdKeyboardArrowDown className="text-xl text-gray-700" />
            ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium" />}
            <p className="text-sm text-gray-800 font-medium">Activity</p>
          </div>
          {/* Activity Expand: */}
          {activityExpand && (
            <AnimatePresence>
              <motion.div initial={{opacity:0, y:-5}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-5}}
              transition={{duration:0.2}}
              className="pl-6 pt-4 space-y-2"
              >
                <div className="flex items-center gap-10">
                  <button className="text-sm text-gray-700 font-medium bg-white border-none">History</button>
                  <button className="text-sm text-gray-700 font-medium bg-white border-none">Attachments</button>
                {/* <p className="text-sm text-gray-500 w-full"></p> */}
                </div>
              <hr className="w-full h-0.5 mx-auto bg-gray-400 border-0 rounded-sm dark:bg-gray-700" />
              </motion.div>
            </AnimatePresence>
          )}
      </div>
    </motion.div>
    </div>
    <div className="w-1/4">
          <div onClick={()=>setPeopleExpand(!peopleExpand)}
        className="pt-40 flex items-center  gap-2 cursor-pointer hover:opacity-80 transition"
        > {peopleExpand?(
          <MdKeyboardArrowDown className="text-xl text-gray-700" />
        ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium"/>}
      <p className="text-sm text-gray-800 font-medium">People</p>
        </div>
        {/* People: */}
        {peopleExpand && (
          <AnimatePresence>
            <motion.div initial={{opacity:0, y:-5}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-5}}
            transition={{duration:0.2}}
            className="pl-6 pt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 w-30">Assignee: </p>
                <div className="flex items-center gap-2 text-sm text-black">
                  <IoPersonCircleSharp  className="text-xl text-gray-700" />
                    <span>Ankush raj <span className="text-blue-600">(me)</span></span>
                </div>
              </div>
                <div className="flex items-center gap-2 pt-5">
                <p className="text-sm text-gray-500 w-30">Reporter: </p>
                <div className="flex items-center gap-2 text-sm text-black">
                  <IoPersonCircleSharp className="text-xl text-gray-700"/>
                  <span>Banti</span>
                </div>
                </div>
                <div className="flex items-center gap-2 pt-5">
                    <p className="text-sm text-gray-500 w-30">Watchers: </p>
                    <div className="flex items-center gap-2 text-sm text-black">
                      {3}
                    </div>
                </div>
            </motion.div>
          </AnimatePresence>
        )}
        <div onClick={()=>setDateExpand(!dateExpand)}
        className="pt-5 flex gap-2 cursor-pointer hover:opacity-80 transition items-center"
          > {dateExpand?(
            <MdKeyboardArrowDown className="text-xl text-gray-700" />
          ):<MdKeyboardArrowRight className="text-xl text-gray-800 font-medium" />}
          <p className="text-sm text-gray-800 font-medium">Dates</p>
        </div>
        {dateExpand && (
          <AnimatePresence>
            <motion.div initial={{opacity:0, y:-5}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-5}}
            transition={{duration:0.2}}
            className="pl-6 pt-4"
            >
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 w-30">Due:</p>
                    <span className="text-sm text-black">06/May/2025</span>
                </div>
                {/* <div className="flex items-center gap-2 pt-4"> */}
                  <div className="flex items-center gap-2 pt-4">
                      <p className="text-sm text-gray-500 w-30">CreatedAt: </p>
                      <span className="text-sm text-black">06/May/2025</span>
                  </div>
                {/* </div> */}
                <div className="flex items-center gap-2 pt-4">
                  <p className="text-sm text-gray-500 w-30">Last UpdatedAt: </p>
                  <span className="text-sm text-black">04/May/2025</span>
                </div>
            </motion.div>
            

          </AnimatePresence>
        )}
    </div>
    </div>
  );
}
