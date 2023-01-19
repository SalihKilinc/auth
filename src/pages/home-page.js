import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="warning">-</Button>
        <Button variant="secondary" disabled>Middle</Button>
        <Button variant="info">+</Button>
      </ButtonGroup>
    </div>
  );
};

export default HomePage;