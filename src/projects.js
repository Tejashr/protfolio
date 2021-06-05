import React from "react";
import url from './images/url.jpg';
import bms from './images/bookmyshow.jpg';
import swipe from './images/swipe.png';

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
                                            <h3><a href="https://bookmyshowtejas.netlify.app/" target="_blank">BookMyShow Clone</a></h3>
                                            <span>A Full Stack Website for booking a movie ticket.<br/>Here the user will book a movie ticket after logging into his account and he can view his tickets.</span>
                                            <p className="icon">
                                            <span><a className="bg-secondary text-light">Tech used</a></span>
                                                <span><a>ReactJs</a></span>
                                                <span><a>MongoDB</a></span>
                                                <span><a>NodeJs</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box" data-animate-effect="fadeInRight">
                                <div className="project" style={{ backgroundImage: `url(${url})`}}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a href="https://urlfront.herokuapp.com/" target="_blank">URL Shortner</a></h3>
                                            <span>A Full Stack Website for Shortning the given long URL.<br/>Here user will enter the long url after logging in and user will get his short url.</span>
                                            <p className="icon">
                                            <span><a className="bg-secondary text-light">Tech used</a></span>
                                                <span><a>ReactJs</a></span>
                                                <span><a>MongoDB</a></span>
                                                <span><a>NodeJs</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box" data-animate-effect="fadeInLeft">
                                <div className="project" style={{ backgroundImage: `url(${swipe})` }}>
                                    <div className="desc">
                                        <div className="con">
                                            <h3><a href="https://swiping-cards.netlify.app/" target="_blank">Swiping Cards</a></h3>
                                            <span>A Full Stack Website for Swiping the cards.<br/>Here the user will accept or reject the images</span>
                                            <p className="icon">
                                            <span><a className="bg-secondary text-light">Tech used</a></span>
                                                <span><a>ReactJs</a></span>
                                                <span><a>MongoDB</a></span>
                                                <span><a>NodeJs</a></span>
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