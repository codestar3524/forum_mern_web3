
import { Link } from "react-router-dom";
import { RiBallPenFill } from "react-icons/ri";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../redux/slices/topicSlice";

const Topbar = () => {
    const dispatch = useDispatch();
    return (
        <div className="topbar">
            <Row>
                <Col md={8}>
                </Col>
                <Col md={4} sm={12}>
                    <div className="d-flex align-items-center filter">
                        <Form.Label className="mx-3">
                            Filter:
                        </Form.Label>
                        <Form.Select
                            name="topicsSort"
                            className="custom-select"
                            onChange={(e) => dispatch(setSortOption(e.target.value))}
                        >
                            <option value="latest">Latest topics</option>
                            <option value="popular">Most popular topics</option>
                            <option value="most_replied">Most replied topics</option>
                            <option value="most_upvoted">Most upvoted topics</option>
                        </Form.Select>

                        <Link className="new-topic" to="/topic/new">
                            <Button className="d-flex align-items-center" style={{width:200}}>
                                <RiBallPenFill />
                                Write a New Topic
                            </Button>
                        </Link>

                    </div>
                </Col>
            </Row>
        </div>

    );
}

export default Topbar;