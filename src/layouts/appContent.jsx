import TaskBoard from "../kanbanboard/taskboard";
const AppContent= () => (
  <main className="flex-1 overflow-y-auto pt-4 pr-4 pl-4 pb-4 bg-gray-50" style={{backgroundColor:"#e9edf7"}}>
    <TaskBoard />
    {/* <p>Main content goes here...</p> */}
  </main>
);

export default AppContent;
