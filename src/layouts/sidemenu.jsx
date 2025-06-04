// import { useState } from "react";
// import { motion } from "framer-motion";
// import SideMenuData from "../navigation/sideMenuData";
// import MenuItems from "../config/sideMenuConfig";
// const SideMenu = () => {
//   const [folderNameInput, setFolderNameInput] = useState("");
//   const [createNewClicked, setCreateNewClicked] = useState("false");
//   // Extract fixed top and bottom items
//   const topItem = MenuItems[0];
//   const bottomItem = MenuItems[MenuItems.length - 1];
//   const middleItems = MenuItems.slice(1, MenuItems.length - 1);
//   const createNewButton = MenuItems[1].label;

//   const handleInputBlur = () => {
//     setCreateNewClicked(false);
//     setFolderNameInput("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleInputBlur();
//     }
//   };

//   return (
//     <motion.div
//       initial={{ x: -100, opacity: 0, rotateY: -10 }}
//       animate={{ x: 0, opacity: 1, rotateY: 0 }}
//       transition={{ type: "spring", stiffness: 100, damping: 15 }}
//       className="flex flex-col h-full"
//     >
//       {/* Top Fixed */}
//       <div className="pt-2 pb-2 pr-4 pl-4 border-b border-white/20">
//         <SideMenuData item={topItem} />
//       </div>

//       {/* Scrollable Middle */}
//       {/* <div className="flex-1 overflow-y-auto space-y-1 p-4 hide-scrollbar bg-transparent">
//         {middleItems.map((item, idx) => (
//           <div
//             key={idx}
//             className={
//               item.label === createNewButton ? "bg-white/10 rounded" : ""
//             }
//           >
//             <SideMenuData item={item} />
//           </div>
//         ))}
//       </div> */}

//       <div className="flex-1 overflow-y-auto space-y-1 p-4 hide-scrollbar bg-transparent">
//         {middleItems.map((item, idx) => (
//           <div
//             key={idx}
//             className={
//               item.label === createNewButton ? "bg-white/10 rounded" : ""
//             }
//           >
//             {item.label === createNewButton && createNewClicked ? (
//               <input
//                 autoFocus
//                 type="text"
//                 value={folderNameInput}
//                 onChange={(e) => setFolderNameInput(e.target.value)}
//                 onBlur={handleInputBlur}
//                 onKeyDown={handleKeyDown}
//                 className="w-full px-2 py-1 rounded text-black"
//               />
//             ) : (
//               <div
//                 onClick={() =>
//                   item.label === createNewButton && setCreateNewClicked(true)
//                 }
//               ></div>
//             )}
//           </div>
//         ))}
//       </div>
//       {/* Bottom Fixed */}
//       <div className="pt-2 pb-2 pr-4 pl-4 border-t border-white/20">
//         <SideMenuData item={bottomItem} />
//       </div>
//     </motion.div>
//   );
// };

// export default SideMenu;

import { useState } from "react";
import { motion } from "framer-motion";
import SideMenuData from "../navigation/sideMenuData";
import MenuItems from "../config/sideMenuConfig";
import { FaFolderPlus } from "react-icons/fa";

const SideMenu = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const topItem = MenuItems[0];
  const bottomItem = MenuItems[MenuItems.length - 1];
  const middleItems = MenuItems.slice(1, MenuItems.length - 1);
  const createNewLabel = "Create New";

  const handleInputBlur = () => {
    setIsEditing(false);
    setInputValue("");
    // You can trigger logic here like saving to state or backend
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0, rotateY: -10 }}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="flex flex-col h-full"
    >
      {/* Top Fixed */}
      <div className="pt-2 pb-2 pr-4 pl-4 border-b border-white/20">
        <SideMenuData item={topItem} />
      </div>

      {/* Scrollable Middle */}
      <div className="flex-1 overflow-y-auto space-y-1 p-4 hide-scrollbar bg-transparent">
        {middleItems.map((item, idx) => (
          <div
            key={idx}
            className={
              item.label === createNewLabel ? "bg-white/10 rounded" : ""
            }
          >
            {item.label === createNewLabel && isEditing ? (
              <div className="bg-white/10 rounded">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-3 px-4 py-2 hover:bg-white/10 rounded cursor-pointer transition-all">
                    <FaFolderPlus className="text-white shrink-0" />
                    <input
                      id="create-new-menu-input"
                      name="createNewMenu"
                      autoFocus
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={handleKeyDown}
                      className="text-sm font-medium truncate overflow-hidden whitespace-nowrap w-full bg-transparent text-white outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  item.label === createNewLabel && setIsEditing(true)
                }
              >
                <SideMenuData item={item} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Fixed */}
      <div className="pt-2 pb-2 pr-4 pl-4 border-t border-white/20">
        <SideMenuData item={bottomItem} />
      </div>
    </motion.div>
  );
};

export default SideMenu;
