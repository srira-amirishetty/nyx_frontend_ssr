import { motion } from "framer-motion";
import SearchSVGIcon from "@nyx-frontend/main/components/Icons/SearchSVGIcon";
import { useSearch,useExpand } from "../store/store";

export const SearchBar = ({ allData, data, setFilterData }) => {
  
  const expand = useExpand((state)=>state.expand);
  const setExpand = useExpand ((state)=>state.setExpand);

  const setSearch = useSearch((state)=>state.setSearch)

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    if (searchValue !== "") {
      const filteredData = allData.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchValue) ||
          item.created_by.toLowerCase().includes(searchValue) ||
          item.size.toString().toLowerCase().includes(searchValue)
        );
      });
      setFilterData(filteredData);
    } else {
      setFilterData(data.data);
    }
  };

  return (
    <motion.div
      initial={{ width: 40 }}
      animate={{ width: expand ? 320 : 40 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div
        className={`flex items-center justify-end h-11 rounded-md border border-[#8297BD] bg-inherit overflow-hidden`}
      >
        <motion.input
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: expand ? 1 : 0, width: expand ? 260 : 0 }}
          transition={{ duration: 0.3 }}
          type="text"
          placeholder="Enter the asset name here"
          onChange={handleSearch}
          className={`px-2 py-2 text-sm bg-inherit outline-none appearance-none ${expand ? "" : "hidden"} mr-2`}
        />
        <button
          onClick={() => setExpand(expand)}
          className="flex items-center justify-center w-10 h-10"
        >
          <SearchSVGIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};
