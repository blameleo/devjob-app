import Header from "./components/Header";
import Jobs from "./components/Jobs";


function App() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Jobs/>
      <div className=" flex justify-center ">
      <button className=' bg-primary p-3 rounded-lg font-semibold text-white '>Load more</button>

      </div>

    </div>
  );
}

export default App;
