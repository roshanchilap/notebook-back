import React from "react";
import img from "../images/learn.svg";
import Notes from "./Notes";
import "../home.css";

function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <h4 className="head">Learning Management System</h4>
      <div className="quote">
        <img src={img} alt="img" className="img" />
        <article className="article">
          The students of the future will demand the learning support that is
          appropriate for their situation or context. Nothing more, nothing
          less. And they want it at the moment the need arises. Not sooner, not
          later. Mobile devices will be a key technology for providing that
          learning support.
        </article>
      </div>
      {/* <Notes showAlert={showAlert} className="my-3" /> */}
    </>
  );
}

export default Home;
