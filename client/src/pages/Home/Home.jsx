import React from "react";
import TaskComp from "../../components/AddTask/TaskComp";
import Featured from "../../components/FeaturedNotes/Featured";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div>
      <TaskComp />
      <h2 style={{ margin: "0px auto", padding: '0px 20px', width: "max-content", color: "#00a5ec" }}>
        Newly Added Tasks...
      </h2>
      <Featured />
      <Footer />
    </div>
  );
}

export default Home;
