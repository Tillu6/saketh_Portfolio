import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Saketh Reddy Poreddy</span>{" "}
            (He/Him) from
            <span className="purple"> Geelong, Victoria, Australia</span>.
            <br />
            I’m an <span className="purple">Aspiring Cyber Security Engineer</span> and{" "}
            <span className="purple">SOC Analyst</span> with interests in Network
            Security, SIEM, Threat Detection, and IT Support.
            <br />
            <br />
            I recently worked as <span className="purple">Security Engineer (Apprenticeship)</span> at
            <span className="purple"> Hardhat Enterprises</span>, where I’ve helped embed
            security into our cloud workflows—moving from manual checks to
            policy-as-code with Terraform and integrating security gates in CI/CD.
            <br />
            <br />
            I recently completed my <span className="purple">MSc in Cybersecurity</span> at{" "}
            <span className="purple">Deakin University</span> (July 2025).
            <br />
            <br />
            Apart from security engineering, here are a few things I love doing:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Building home-lab projects & SIEM dashboards (Linux, ELK, Wazuh)
            </li>
            <li className="about-activity">
              <ImPointRight /> Hands-on learning on TryHackMe / writing incident playbooks
            </li>
            <li className="about-activity">
              <ImPointRight /> Creating tools & dashboards (Python / JS) like{" "}
              <span className="purple">Vulnerability-Scan-Automation</span> and a{" "}
              3D Feedback Portal
            </li>
            <li className="about-activity">
              <ImPointRight /> Sharing knowledge on LinkedIn / YouTube & open to entry-level roles
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Secure by design, automate where possible, and always keep learning."
          </p>
          <footer className="blockquote-footer">Saketh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
