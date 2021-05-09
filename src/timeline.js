import React from "react";

function Timeline() {
    return (
        <>
            <div>
                <section className="colorlib-experience" data-section="timeline">
                    <div className="colorlib-narrow-content">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                <span className="heading-meta">highlights</span>
                                <h2 className="colorlib-heading animate-box">Education</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="timeline-centered">
                                    <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                                        <div className="timeline-entry-inner">
                                            <div className="timeline-icon color-3">
                                                <i className="icon-pen2" />
                                            </div>
                                            <div className="timeline-label">
                                                <h2>Full Stack Web development course at GUVI <span>2021-present</span></h2>
                                                <p>I recently have joined the GUVI as a Full stack web development-student. My major part of the work has been into the field of creating sustainable and flexible Full Stack Websites using Reactjs as frontend and mongodb as backend and express as server.and some basic knowledge of AWS and also some Basics of DS and Algorithms.</p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="timeline-entry animate-box" data-animate-effect="fadeInTop">
                                        <div className="timeline-entry-inner">
                                            <div className="timeline-icon color-4">
                                                <i className="icon-pen2" />
                                            </div>
                                            <div className="timeline-label">
                                                <h2>Undergraduation at ATME college of Engineering<span>2015-2019</span></h2>
                                                <p>I pursued my under-graduation studies with major in C.S.E.(Computer Science Engineering) with 7.3 cgpa. I have attended IOT workshop in college,I have also been part of Smart India Hackathon in 2018</p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                                        <div className="timeline-entry-inner">
                                            <div className="timeline-icon color-5">
                                                <i className="icon-pen2" />
                                            </div>
                                            <div className="timeline-label">
                                                <h2>Higher Education <span>2013-2015</span></h2>
                                                <p>I have completed my higher secondary education with major subjects as Physics,Chemistry,Maths & Computer Science with 78% in Sri Chaitanya PU College. During my time at College, I have developed interest in solving complex problems of the fundamental physics which helped me to improve my understanding of any problem and also my mathematical skills to actually solve the problems.</p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="timeline-entry begin animate-box" data-animate-effect="fadeInBottom">
                                        <div className="timeline-entry-inner">
                                            <div className="timeline-icon color-none">
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Timeline;