import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const {
    imgPath,
    title,
    description,
    ghLink,
    demoLink,
    isBlog = false,
    topics = [], // optional: ["Python", "Security", "Flask"]
  } = props;

  // Fallback image if GitHub OG or custom image fails to load
  const handleImgError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = "true";
      e.target.src = "/assets/project-fallback.png"; // put a PNG here
    }
  };

  return (
    <Card className="project-card-view h-100">
      <Card.Img
        variant="top"
        src={imgPath}
        alt={title ? `${title} preview` : "project preview"}
        onError={handleImgError}
        loading="lazy"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>

        {!!topics.length && (
          <div className="mb-2">
            {topics.slice(0, 6).map((t) => (
              <Badge key={t} bg="secondary" className="me-1 mb-1">
                {t}
              </Badge>
            ))}
          </div>
        )}

        <Card.Text style={{ textAlign: "justify" }}>{description}</Card.Text>

        <div className="mt-auto">
          <Button
            variant="primary"
            href={ghLink || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub repository"
            disabled={!ghLink}
          >
            <BsGithub /> &nbsp;{isBlog ? "Blog" : "GitHub"}
          </Button>

          {!isBlog && demoLink && (
            <Button
              variant="primary"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open live demo"
              style={{ marginLeft: "10px" }}
            >
              <CgWebsite /> &nbsp;Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
