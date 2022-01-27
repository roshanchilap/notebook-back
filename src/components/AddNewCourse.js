import React from "react";
import Notes from "./Notes";

function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <Notes showAlert={showAlert} className="my-3" />
    </>
  );
}

export default Home;
