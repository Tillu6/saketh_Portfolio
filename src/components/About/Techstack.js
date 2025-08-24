import React from "react";
import { Col, Row } from "react-bootstrap";

// Guaranteed-available brand icons
import {
  SiWireshark,
  SiKalilinux,
  SiLinux,
  SiWindows,
  SiGooglecloud,
  SiMicrosoftazure,
  SiTryhackme,
  SiHackthebox,
  SiGithub,
  SiDocker,
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";

// Generic icons to stand in for tools without brand icons (e.g., Nmap)
import { FaNetworkWired } from "react-icons/fa";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Programming & Frontend */}
      <Col xs={4} md={2} className="tech-icons">
        <SiJavascript title="JavaScript" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiReact title="React" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNodedotjs title="Node.js" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPython title="Python" />
      </Col>

      {/* Sec / Net */}
      <Col xs={4} md={2} className="tech-icons">
        <SiWireshark title="Wireshark" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaNetworkWired title="Nmap (alt icon)" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKalilinux title="Kali Linux" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTryhackme title="TryHackMe" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiHackthebox title="Hack The Box" />
      </Col>

      {/* Cloud */}
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecloud title="Google Cloud" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftazure title="Microsoft Azure" />
      </Col>

      {/* OS / DevOps */}
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux title="Linux" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiWindows title="Windows" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker title="Docker" />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub title="GitHub" />
      </Col>
    </Row>
  );
}

export default Techstack;
