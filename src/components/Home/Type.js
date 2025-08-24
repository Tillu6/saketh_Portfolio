import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Aspiring Cybersecurity Engineer",
          "SOC Analyst",
          "IT Help Desk Specialist",
          "Network & Cloud Security Enthusiast",
          "Penetration Tester",
          "Incident Response & Threat Detection",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
