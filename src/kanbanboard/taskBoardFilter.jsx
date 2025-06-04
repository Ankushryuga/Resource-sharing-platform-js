import { useState, useRef, useEffect } from "react";
import { FaCheck, FaTasks, FaUsers } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion"; // optional for better animation
import Configuration from "../config/config";

const TaskActivity = ({ task, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-all duration-200 ${
        selected
          ? "bg-white/50 text-blue-500"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {task}
      {selected && <FaCheck style={{ color: "#050c38" }} />}
    </div>
  );
};

const TaskBoardFilter = () => {
  const dropDownRef = useRef(null);

  const [filterSelected, setFilterSelected] = useState([]); //array for selecting multiple activity.
  const [userSelected, setUserSelected] = useState([]);
  const [filterDropDownOpen, setFilterDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setFilterDropDownOpen((prev) => !prev);
  };
  const toggleActivitySelection = (id) => {
    setFilterSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setFilterDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div
      className="relative flex items-center justify-between pl-5 pr-5 pb-4 rounded-md bg-white transition-all duration-300 "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Activity Type */}
      <div className="relative" ref={dropDownRef}>
        <div
          className="flex items-center gap-2 text-gray-800 font-medium cursor-pointer hover:text-black relative"
          onClick={toggleDropdown}
        >
          <FaTasks className="text-xl" />
          <span className="text=[#050c38]">Filter Activities</span>
        </div>
        <AnimatePresence>
          {filterDropDownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 left-full ml-2 top-1 w-40 bg-white border border-gray-200 rounded-md shadow-md"
            >
              {Configuration.taskActivityType.map((actvity) => (
                <TaskActivity
                  key={actvity.id}
                  task={actvity.name}
                  selected={filterSelected.includes(actvity.id)}
                  onClick={() => toggleActivitySelection(actvity.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Team Members */}
      <div className="flex items-center gap-2 text-gray-700 transition-colors duration-300 cursor-pointer">
        <FaUsers className="text-xl" />
        <span className="font-medium">Team Members</span>
      </div>
    </motion.div>
  );
};

export default TaskBoardFilter;
