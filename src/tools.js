import React from "react";

function Tools() {
    return (
        <>
            <div>
                < section className="colorlib-experience" data-section="tools">
                    <div className="colorlib-narrow-content">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                                <h2 className="colorlib-heading animate-box">Tools</h2>
                            </div>
                        </div>
                        <div>
                        <img src="images/vscode.png" className="sk animate-box" data-animate-effect="fadeInLeft" alt="img"></img>
                        <img src="images/netbeans.png" className="sk animate-box" data-animate-effect="fadeInRight" alt="img"></img>
                        <img src="images/postman.png" className="sk animate-box" data-animate-effect="fadeInLeft" alt="img"></img>
                        <img src="images/xammp.png" className="sk animate-box" data-animate-effect="fadeInRight" alt="img"></img>
                        <img src="images/github.png" className="sk animate-box" data-animate-effect="fadeInLeft" alt="img"></img>
                        </div>
                    </div>
                </ section>
            </div>
        </>
    );
}

export default Tools;