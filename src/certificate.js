import React from "react";
import toolkit from './images/toolkit.jpeg';
import js from './images/js.png';
import fullstack from './images/fullstack.jpeg';
import sih from './images/SIH.jpg';

function Certificate() {
    return (
        <>
            <div>
                < section className="colorlib-experience" data-section="certificate">
                    <div className="colorlib-narrow-content">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                <h2 className="colorlib-heading animate-box">Certificates</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 animate-box" data-animate-effect="fadeInRight" >
                                <div className="certificate" style={{ backgroundImage: `url(${fullstack})` }}>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box" data-animate-effect="fadeInRight" >
                                <div className="certificate" style={{ backgroundImage: `url(${js})` }}>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
                                <div className="certificate" style={{ backgroundImage: `url(${toolkit})` }}>
                                </div>
                            </div>
                            <div className="col-md-6 animate-box" data-animate-effect="fadeInRight">
                                <div className="certificate" style={{ backgroundImage: `url(${sih})` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </ section>
            </div>
        </>
    );
}

export default Certificate;