import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col className="text-center">
      Docs originally created by <a href="https://github.com/reactstrap/reactstrap" target="_blank">reactstrap</a>, licensed under <a href="https://github.com/reactstrap/reactstrap/blob/master/LICENSE" target="_blank">MIT</a> and were modified by <a href="https://ui1.io" target="_blank">UI1</a> UI Kit Generator.

          </Col>
        </Row>
      </Container>
    </div>
  );
};
