import React from "react";

function Timeline() {
    return (
        <>
            <div>
                <section className="colorlib-experience" data-section="timeline">
                    <div className="colorlib-narrow-content">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                {/* <span className="heading-meta">highlights</span> */}
                                <h2 className="colorlib-heading animate-box">Education</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="timeline-centered">
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
                                                <h2>Higher Education at Sri Chaitanya PU College<span>2013-2015</span></h2>
                                                <p>I have completed my higher secondary education with major subjects as Physics,Chemistry,Maths & Computer Science with 78% in Sri Chaitanya PU College Bengaluru. During my time at College, I have developed interest in solving complex problems of the fundamental physics which helped me to improve my understanding of any problem and also my mathematical skills to actually solve the problems.</p>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                                        <div className="timeline-entry-inner">
                                            <div className="timeline-icon color-2">
                                                <i className="icon-pen2" />
                                            </div>
                                            <div className="timeline-label">
                                                <h2>SSLC at The Presidency Public School<span>2012-2013</span></h2>
                                                <p>I have completed my SSLC in The Presidency public school ,Sira with 84.16%</p>
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

