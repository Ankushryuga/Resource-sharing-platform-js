import { Link, useLocation } from "react-router-dom";
import { useSelectedTask } from "../context/selectedTaskContext";

const SideMenuData = ({ item }) => {
  const location = useLocation();
  const { setRootFolder } = useSelectedTask();

  const isActive =
    location.pathname === item.path ||
    (item.children &&
      item.children.some((child) => location.pathname.startsWith(child.path)));

  const handleClick = (e) => {
    if (!item.path) {
      e.preventDefault();
    }
    if (item.title) {
      setRootFolder(item.title);
    }
  };
  return (
    <div className="flex flex-col justify-center gap-1">
      {/* Parent item */}
      <Link
        to={item.path || "#"}
        onClick={handleClick}
        className={`flex items-center space-x-3 px-4 py-2 hover:bg-white/10 rounded cursor-pointer transition-all ${
          isActive ? "bg-white/20 font-semibold" : ""
        }`}
        title={item.label} // 👈 Tooltip for full label on hover
      >
        <div className="text-xl shrink-0 ">{item.icon}</div>
        <div className="text-sm pl-2 font-medium truncate overflow-hidden whitespace-nowrap w-full">
          {item.label}
        </div>
      </Link>

      {/* Children */}
      {item.children && (
        <div className="pl-6 gap-1">
          {item.children.map((child, idx) => (
            <SideMenuData key={idx} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenuData;
