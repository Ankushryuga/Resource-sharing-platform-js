const configurations = {
  baseURL: "http://192.168.1.5:5001/",

  headerTaskPriorityInformations: [
    { name: "Immediate", colorCode: "FF0000" },
    { name: "High", colorCode: "FF5E00" },
    { name: "Medium", colorCode: "F18F45" },
    { name: "low", colorCode: "31AE15" },
  ],
  taskActivityType: [
    { name: "Story", id: 1 },
    { name: "Feature", id: 2 },
    { name: "Task", id: 3 },
    { name: "Bug", id: 4 },
  ],
};

export default configurations;
