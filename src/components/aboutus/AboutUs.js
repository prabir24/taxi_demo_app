import React from "react";

function AboutUs() {
  return (
    <div style={{ marginTop: "60px", marginLeft: "50px", textAlign: "center" }}>
      <h2 style={{ textalign: "center" }}>Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="container">
              <h2>Alice Ericsson</h2>
              <p className="title">Documentor & Project Manager.</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="container">
              <h2>Md Rezaul Hasan</h2>
              <p className="title">Architect,Developer & Database.</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="container">
              <h2>Prabir Kumar</h2>
              <p className="title">Designer,Developer & System tester.</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="container">
              <h2>Kung Sun Jacky</h2>
              <p className="title">Developer.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <h2 style={{ textAlign: "center", marginTop: "60px" }}>Our Team</h2>
      <div className="section group">
        <div className="col span_1_of_3">
          <div className="card">
            <div className="container">
              <h2>Alice Ericsson</h2>
              <p className="title">Documentor & Project Manager.</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="container">
              <h2>Md Rezaul Hasan</h2>
              <p className="title">
                Project Architect, Database managment & Logic builder.
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="container">
              <h2>Prabir Kumar Choudhury</h2>
              <p className="title">Designer & System tester.</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card">
            <div className="container">
              <h2>Kung Sun Jacky Leung</h2>
              <p className="title">Developer.</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AboutUs;
