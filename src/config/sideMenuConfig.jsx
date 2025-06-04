import { FaDashcube, FaPlus, FaInbox, FaUsers } from "react-icons/fa";
import { FcBookmark } from "react-icons/fc";
import { PiNotebookFill } from "react-icons/pi";
import { GoFileSubmodule } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { MdDownloadForOffline, MdWorkspacesFilled } from "react-icons/md";
const name = "Ankush";

const MenuItems = [
  {
    label: name,
    path: `/${name.toLowerCase()}`,
    title: "",
    icon: <FaDashcube className="text-xl" />,
  },
  {
    label: "Create New",
    path: "",
    title: "",
    icon: (
      <FaPlus className="text-purple-800 text-base bg-white p-1 rounded-full border border-purple-800 shadow transition" />
    ),
  },
  {
    label: "Workstreams",
    path: "",
    title: "",
    icon: <MdWorkspacesFilled className="text-xl" />,
    children: [
      {
        label: "Active",
        path: "/dashboard/",
        title: "Active Workstreams",
        icon: <MdWorkspacesFilled className="text-xl text-green-600" />,
      },
      {
        label: "InActive",
        path: "/dashboard/inactiveworkstreams",
        title: "Inactive Workstreams",
        icon: <MdWorkspacesFilled className="text-xl text-gray-500" />,
      },
    ],
  },
  {
    label: "Notifications",
    path: "/notifications",
    title: "Notifications",
    icon: <FaInbox className="text-xl" />,
  },
  {
    label: "Offline",
    path: "/offline",
    title: "Offline",
    icon: <MdDownloadForOffline className="text-xl" />,
  },
  {
    label: "Recent history",
    path: "/recents",
    title: "Recents Activity",
    icon: <GiBackwardTime className="text-xl" />,
  },
  {
    label: "Favourites",
    path: "/favourites",
    title: "Favourites",
    icon: <FcBookmark className="text-xl" />,
    children: [
      // {
      //   label: "Tasks",
      //   path: "/mytasks",
      //   icon: <PiNotebookFill className="text-2xl" />,
      // },
    ],
  },
  {
    label: "My Files",
    path: "/myFiles",
    title: "",
    icon: <GoFileSubmodule className="text-xl" />,
    children: [
      // {
      //   label: "Course-Name-Value-Field-1",
      //   path: "/course1",
      //   icon: <PiNotebookFill className="text-xl" />,
      // },
      // ...Array.from({ length: 15 }, (_, i) => ({
      //   label: `Course-${i + 2}`,
      //   path: `/course${i + 2}`,
      //   icon: <PiNotebookFill className="text-xl" />,
      // })),
    ],
  },
  {
    label: "Users",
    path: "/users",
    title: "Users",
    icon: <FaUsers className="text-xl" />,
  },
  {
    label: "Logout",
    path: "/logout",
    title: "",
    icon: <IoMdLogOut className="text-xl text-red-600" />,
  },
];

export default MenuItems;
