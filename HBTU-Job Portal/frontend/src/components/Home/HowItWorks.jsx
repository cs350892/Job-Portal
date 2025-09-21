import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How HBTU Campus Connect Works!</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Join the Community</p>
              <p>
                Sign up as an HBTU student or alumnus to engage with the Campus Connect platform.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Explore or Post Jobs</p>
              <p>
                Students can browse jobs posted by HBTU alumni; alumni can share opportunities.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply or Recruit</p>
              <p>
                Students apply to alumni-posted jobs; alumni recruit talented HBTU students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;