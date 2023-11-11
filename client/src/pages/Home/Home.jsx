import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskComp from "../../components/AddTask/TaskComp";
import Featured from "../../components/FeaturedNotes/Featured";

function Home() {
  return (
    <div>
      <TaskComp />
      <h2 style={{margin: "auto", width: "max-content", color: "#00a5ec"}}>Newly Added Tasks...</h2>
      <Featured />
    </div>
  );
}

export default Home;
