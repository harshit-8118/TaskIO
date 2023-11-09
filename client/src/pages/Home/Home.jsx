import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskComp from "../../components/TaskComp";

function Home() {
  return (
    <div>
      <Navbar />
      <TaskComp />

    </div>
  );
}

export default Home;
