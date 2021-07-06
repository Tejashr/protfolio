import React from "react";
import url from './images/url.jpg';
import bms from './images/bookmyshow.jpg';
import swipe from './images/swipe.png';
import hire from './images/hiring.jpg';

function Projects() {
    return (
        <>
            <div>
                <section className="colorlib-work" data-section="projects">
                    <div className="colorlib-narrow-content">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                <span className="heading-meta">My Work</span>
                                <h2 className="colorlib-heading animate-box">Recent Projects</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 animate-box" data-animate-effect="fadeInLeft">
                                <div className="project" style={{ backgroundImage: `url(${bms})` }}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a>BookMyShow Clone</a></h3>
                                            <span>A Full Stack Website for booking a movie ticket.<br/>Here the user will book a movie ticket after logging into his account and he can view his tickets.</span>
                                            <h3 className="mt-2"><a>Tech used</a></h3>
                                            <span>ReactJs<br/>MongoDB<br/>NodeJs</span>
                                            <p className="icon">
                                                <span><a href="https://bookmyshowtejas.netlify.app/" target="_blank">Website</a></span>
                                                <span className="float-right"><a href="https://github.com/Tejashr/bookmyshowreact" target="_blank">View Code</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box" data-animate-effect="fadeInRight">
                                <div className="project" style={{ backgroundImage: `url(${url})`}}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a>URL Shortner</a></h3>
                                            <span>A Full Stack Website for Shortning the given long URL.<br/>Here user will enter the long url after logging in and user will get his short url.<br/></span>
                                            <h3 className="mt-2"><a>Tech used</a></h3>
                                            <span>ReactJs<br/>MongoDB<br/>NodeJs</span>
                                            <p className="icon">
                                                <span><a href="https://urlfront.herokuapp.com/" target="_blank">Website</a></span>
                                                <span className="float-right"><a href="https://github.com/Tejashr/url" target="_blank">View Code</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box" data-animate-effect="fadeInLeft">
                                <div className="project" style={{ backgroundImage: `url(${swipe})` }}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a>Swiping Cards</a></h3>
                                            <span>A Full Stack Website for Swiping the cards.<br/>Here the user will accept or reject the images.</span>
                                            <h3 className="mt-2"><a>Tech used</a></h3>
                                            <span>ReactJs<br/>MongoDB<br/>NodeJs</span>
                                            <p className="icon">
                                                <span><a href="https://swiping-cards.netlify.app/" target="_blank">Website</a></span>
                                                <span className="float-right"><a href="https://github.com/Tejashr/swiping-cards-fe" target="_blank">View Code</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box"  data-animate-effect="fadeInRight">
                                <div className="project" style={{ backgroundImage: `url(${hire})` }}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a>Hiring</a></h3>
                                            <span>A Full Stack Website for appling job.<br/>Here the user will finds the job for applying.<br/>Recruiter will post the job and he can see the list of candidates applied for his jobs.</span>
                                            <h3 className="mt-2"><a>Tech used</a></h3>
                                            <span>ReactJs<br/>MongoDB<br/>NodeJs</span>
                                            <p className="icon">
                                                <span><a href="https://hiring-fe.netlify.app/" target="_blank">Website</a></span>
                                                <span className="float-right"><a href="https://github.com/Tejashr/Hiring-fe" target="_blank">View Code</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Projects;