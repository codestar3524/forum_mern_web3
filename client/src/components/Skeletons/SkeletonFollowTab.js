import { Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SkeletonFollowTab = () => {
  return (
    <Col lg={12}>
      <div className="follow-brief d-flex align-items-center">
        <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   circle width={80} height={80} />
        <div className="user-meta d-flex flex-column">
          <h5 className="user-name">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={200} />
          </h5>
          <span className="username">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
          </span>
          <span className="user-bio">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={250} />
          </span>
        </div>
        <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={120} height={40} />
      </div>
    </Col>
  );
};

export default SkeletonFollowTab;
