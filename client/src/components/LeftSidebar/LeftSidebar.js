import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
// import SpacesCard from "./Cards/SpacesCard";

const LeftSidebar = (props) => {
  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("all")}>
          <BsFillQuestionCircleFill />
          all topics
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("my")}>
          <MdQuestionAnswer />
          my topics
        </Nav.Link>
        {/* <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("my answer")}>
          <MdReplyAll />
          my answers
        </Nav.Link> */}
      </Nav>

      {/* <SpacesCard /> */}
    </Col>
  );
};

export default LeftSidebar;
