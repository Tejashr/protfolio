import React, { useState } from "react";
import data from "./data.json";

function Experience() {
  const [experience, setExperience] = useState(data.experience);
  return (
    <>
      <div>
        <section className="colorlib-experience" data-section="timeline">
          <div className="colorlib-narrow-content">
            <div className="row">
              <div
                className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box"
                data-animate-effect="fadeInLeft"
              >
                <span className="heading-meta">highlights</span>
                <h2 className="colorlib-heading animate-box">Experience</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="timeline-centered">
                  {experience
                    .sort((a, b) => b.id - a.id)
                    .map((item, index) => {
                      return (
                        <article
                          className="timeline-entry animate-box"
                          data-animate-effect="fadeInLeft"
                          key={index}
                        >
                          <div className="timeline-entry-inner">
                            <div className={`timeline-icon color-${item.id}`}>
                              <i className="icon-pen2" />
                            </div>
                            <div className="timeline-label">
                              <h2>
                                {item.heading} <span>{item.duration}</span>
                              </h2>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  <article
                    className="timeline-entry begin animate-box"
                    data-animate-effect="fadeInBottom"
                  >
                    <div className="timeline-entry-inner">
                      <div className="timeline-icon color-none"></div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Experience;
