import Header from "./components/Header";
import Jobs from "./components/Jobs";
import { useState } from "react";

import { ThemeToggler } from "./context/ThemeContext";

function App() {
  const [jobs,setJobs] =useState([])
  const [searchResults, setSearchResults] = useState([])
  


  const {darkMode} = ThemeToggler()

  return (
    <div className={darkMode ? "bg-midnight ":"bg-gray-100 "}>

      <Header  setSearchResults={setSearchResults} jobs={jobs}/>
      <Jobs setSearchResults={setSearchResults} setJobs={setJobs} jobs={jobs} searchResults={searchResults}/>
      <div className=" flex justify-center ">
      <button className='hover:bg-light_primary bg-primary p-3 rounded-lg font-semibold text-white '>Load more</button>

      </div>
        
   
 

    </div>
  );
}

export default App;
