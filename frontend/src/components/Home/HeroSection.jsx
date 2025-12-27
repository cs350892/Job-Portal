import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "500++",
      subTitle: "Live Alumni Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "50++",
      subTitle: "Alumni Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "500++",
      subTitle: "HBTU Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "100++",
      subTitle: "HBTU Alumni",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Explore Alumni-Posted Jobs</h1>
            <h1>for HBTU Students</h1>
            <p>
              Connect with HBTU alumni to discover job opportunities tailored for students. 
              Build your career through the HBTU Campus Connect network.
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;