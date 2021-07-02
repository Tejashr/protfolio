import React from "react";
import Tejas from './images/IMG_1188.JPG';

function Nav() {

  return (
    <>
      <div>
        <div>
          <nav href="#navbar" className="js-colorlib-nav-toggle colorlib-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i /></nav>
          <aside id="colorlib-aside" className="border js-fullheight">
            <div className="text-center">
              <div className="author-img" style={{ backgroundImage: `url(${Tejas})` }} />
              <h1 id="colorlib-logo"><a href="index.html">Tejas HR</a></h1>
              <span className="email"><i className="icon-mail"></i>tejasteju11@gmail.com</span>
            </div>
            <nav id="colorlib-main-menu" role="navigation" className="navbar">
              <div id="navbar" className="collapse">
                <ul>
                  <li className="active"><a href="#intro" data-nav-section="home">Introduction</a></li>
                  <li><a href="#about" data-nav-section="about">About</a></li>
                  <li><a href="#projects" data-nav-section="projects">Projects</a></li>
                  <li><a href="#timeline" data-nav-section="timeline">Education</a></li>
                  <li><a href="#skills" data-nav-section="skill">Skills</a></li>
                  <li><a href="#tools" data-nav-section="tools">Tools</a></li>
                </ul>
              </div>
            </nav>
            <nav id="colorlib-main-menu">
              <ul>
              <li><a href="https://drive.google.com/file/d/1Vd_Y46ioU9GABc5GgkRjeop-2_7q20Jk/view?usp=sharing" target="_blank" rel="noopener noreferrer">resume</a></li>
                <li><a href="https://www.linkedin.com/in/tejas-hr-700743128/" target="_blank" rel="noopener noreferrer"><i className="icon-linkedin2" /></a></li>
                <li><a href="https://github.com/Tejashr" target="_blank" rel="noopener noreferrer"><i className="icon-github"></i></a></li>
              </ul>
            </nav>
            <div className="colorlib-footer">
              <p><small>
                Dream Without Fear !!
              </small></p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Nav;