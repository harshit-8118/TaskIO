import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskComp from "../../components/TaskComp";
import Featured from "../../components/Featured";

function Home() {
  return (
    <div>
      <Navbar />
      <TaskComp />
      <Featured />
    </div>
  );
}

export default Home;
