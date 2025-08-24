import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg"; 
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am <b className="purple">Saketh Reddy Poreddy</b>, an aspiring{" "}
              <b className="purple">Cybersecurity Engineer</b> passionate about{" "}
              <b className="purple">SOC operations, network defense, and cloud security.</b>
              <br />
              <br />
              Currently pursuing{" "}
              <b className="purple">
                MSc in Cybersecurity at Deakin University (Graduated July 2025)
              </b>{" "}
              and working as a{" "}
              <b className="purple">Security Engineer (Apprentice) @ Hardhat Enterprises</b>.
              <br />
              <br />
              My interests include{" "}
              <i>
                <b className="purple">threat detection, incident response, penetration testing, and automation of security policies.</b>
              </i>
              <br />
              <br />
              I’m also experienced with{" "}
              <b className="purple">Python, Linux, Cloud Platforms (GCP & Azure), SOC tools (Splunk, Wireshark, Nmap), and DevOps basics (Docker, Kubernetes, Terraform).</b>
              <br />
              <br />
              Outside of tech, I love exploring{" "}
              <b className="purple">new security projects, content creation, and learning through hands-on labs.</b>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Let’s <span className="purple">connect</span> and collaborate!
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/tillu6"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/saketh-poreddy-145a7315b/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.youtube.com/@SakethReddyPoreddy-c9c"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillYoutube />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/tillu230" 
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/saketh_reddy_183" 
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
