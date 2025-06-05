import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices";
import {
  FaUserPlus,
  FaUserCheck,
  FaUserFriends,
  FaBug,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const owner = "ankushraj";

const RoleSelector = ({
  icon: Icon,
  label,
  selected,
  setSelected,
  userslist,
}) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredUsers = userslist.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(u.userId)
  );

  const handleSelect = (userId) => {
    setSelected((prev) => [...prev, userId]);
    setQuery("");
    setShowDropdown(false);
  };

  const handleRemove = (userId) => {
    setSelected((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <div className="w-full mb-4">
      <div className="flex items-start gap-4">
        <label className="flex items-center text-sm font-medium text-gray-700 min-w-[150px] mt-2">
          <Icon className="mr-2 text-gray-500" />
          {label}
        </label>
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              placeholder={`Search and add ${label.toLowerCase()}`}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
            />
            {showDropdown && query && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li
                      key={user.userId}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                      onClick={() => handleSelect(user.userId)}
                    >
                      {user.username}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No users found
                  </li>
                )}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {selected.map((id) => {
              const user = userslist.find((u) => u.userId === id);
              return (
                <span
                  key={id}
                  className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {user?.username}
                  <IoMdClose
                    className="ml-1 text-red-500 cursor-pointer"
                    onClick={() => handleRemove(id)}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateNewWorkStreamModel = () => {
  const dispatch = useDispatch();
  const {
    userslist = [],
    loading,
    error,
  } = useSelector((state) => state.users || {});

  const [workStreamNameInput, setWorkStreamNameInput] = useState("");
  const [workStreamContentDescription, setWorkStreamContentDescription] =
    useState("");
  const [managers, setManagers] = useState([]);
  const [reporters, setReporters] = useState([]);
  const [members, setMembers] = useState([]);
  const [testers, setTesters] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateWorkStream = (e) => {
    e.preventDefault();
    console.log("Creating workstream with:", {
      workStreamNameInput,
      workStreamContentDescription,
      managers,
      reporters,
      members,
      testers,
    });
    // onClose();
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-gray-700">
            Create New Workstream
          </h4>
          <motion.button
            // onClick={onClose}
            className="text-white px-4 py-1 rounded-md shadow"
            style={{ backgroundColor: "#7F899E" }}
            whileHover={{ scale: 1.1 }}
          >
            Close
          </motion.button>
        </div>
        <form onSubmit={handleCreateWorkStream} className="space-y-4">
          {/* Workstream Name */}
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm font-medium text-gray-700 min-w-[150px]">
              <FaFileAlt className="mr-2 text-gray-500" />
              Workstream Name
            </label>
            <input
              type="text"
              value={workStreamNameInput}
              onChange={(e) => setWorkStreamNameInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Description */}
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm font-medium text-gray-700 min-w-[150px]">
              <FaFileAlt className="mr-2 text-gray-500" />
              Description
            </label>
            <input
              type="text"
              value={workStreamContentDescription}
              onChange={(e) => setWorkStreamContentDescription(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Owner */}
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm font-medium text-gray-700 min-w-[150px]">
              <FaUserCheck className="mr-2 text-gray-500" />
              Owner
            </label>
            <input
              value={owner}
              disabled
              className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Role Selectors */}
          <RoleSelector
            icon={FaUserPlus}
            label="Managers"
            selected={managers}
            setSelected={setManagers}
            userslist={userslist}
          />
          <RoleSelector
            icon={FaClipboardList}
            label="Reporters"
            selected={reporters}
            setSelected={setReporters}
            userslist={userslist}
          />
          <RoleSelector
            icon={FaUserFriends}
            label="Members"
            selected={members}
            setSelected={setMembers}
            userslist={userslist}
          />
          <RoleSelector
            icon={FaBug}
            label="Testers"
            selected={testers}
            setSelected={setTesters}
            userslist={userslist}
          />

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-90vh py-2 rounded-md text-white font-semibold text-sm shadow-md"
            style={{ backgroundColor: "#7F899E" }}
            whileHover={{ scale: 1.1 }}
          >
            Create Workstream
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewWorkStreamModel;
