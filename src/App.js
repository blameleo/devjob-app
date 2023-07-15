import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecruiterDashboard from "./admin/pages/RecruiterDashboard";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { getJobs } from "./redux/JobSlice";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
const jobsCollectionRef = collection(db, "jobs");

function App() {
  const dispatch = useDispatch();
  const getJobsList = async () => {
    try {
      const data = await getDocs(jobsCollectionRef);

      const filteredJobs = data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          // logourl: imageUrl,
        };
      });

      dispatch(getJobs(filteredJobs));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobsList();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recruiterhome//*" element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
