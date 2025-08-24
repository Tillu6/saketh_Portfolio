import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiWireshark,
  SiSplunk,
  SiVmware,
  SiWindows,
  SiLinux,
  SiGooglecloud,
  SiMicrosoftazure,
  SiTryhackme,
  SiHackthebox,
} from "react-icons/si";
import { FaServer, FaTicketAlt, FaShieldAlt, FaBug } from "react-icons/fa";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* IDE */}
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>

      {/* Cybersecurity */}
      <Col xs={4} md={2} className="tech-icons">
        <SiWireshark />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaBug /> {/* Replaces Nmap */}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSplunk />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaShieldAlt /> {/* Generic Security */}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTryhackme />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiHackthebox />
      </Col>

      {/* Virtualization & Infra */}
      <Col xs={4} md={2} className="tech-icons">
        <SiVmware />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaServer />
      </Col>

      {/* Cloud */}
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecloud />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftazure />
      </Col>

      {/* Operating Systems */}
      <Col xs={4} md={2} className="tech-icons">
        <SiWindows />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux />
      </Col>

      {/* Ticketing */}
      <Col xs={4} md={2} className="tech-icons">
        <FaTicketAlt />
      </Col>
    </Row>
  );
}

export default Toolstack;
