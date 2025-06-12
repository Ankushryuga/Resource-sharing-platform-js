import { ClipboardDocumentListIcon, UserIcon, CalendarDaysIcon, FlagIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const SprintsHeader = () => {
    return (
        <div className="flex p-3 bg-gray-100 text-gray-800 font-semibold rounded-md shadow-sm divide-x divide-gray-300">
            <div className="flex items-center w-1/2 pl-2 gap-2">
                <ClipboardDocumentListIcon className="w-5 h-5 text-blue-500" />
                <span>Sprint Name</span>
            </div>
            <div className="flex items-center w-1/4 pl-2 gap-2">
                <UserIcon className="w-5 h-5 text-green-500" />
                <span>Created By</span>
            </div>
            <div className="flex items-center w-1/4 pl-2 gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-orange-500" />
                <span>Due Date</span>
            </div>
            <div className="flex items-center w-1/6 pl-2 gap-2">
                <FlagIcon className="w-5 h-5 text-purple-500" />
                <span>Sprint Status</span>
            </div>
            <div className="flex items-center w-1/6 pl-2 gap-2">
                <EllipsisVerticalIcon className="w-5 h-5 text-green-500" />
                <span>Action</span>
            </div>
        </div>
    );
};

export default SprintsHeader;
