import { motion } from "framer-motion";
const Sprints = () => {
  return (
    <motion.div
      className="relative flex items-center justify-between pl-5 pr-5 pb-4 rounded-md bg-white transition-all duration-300 "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Span>Sprints Plans</Span>
      <div className="flex h-full">
        <div className="flex-1 overflow-y-auto pt-3">
          <div className="grid gap-4 px-2 lg:px-4 py-4">
            {/* Sprint data and animations. */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sprints;
