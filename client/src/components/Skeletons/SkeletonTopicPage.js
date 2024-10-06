import Skeleton from "react-loading-skeleton";

const SkeletonTopicPage = () => {
  return (
    <article className="topic-item thread">
      <div className="thread-content">
        <div className="topic-vote d-flex flex-column align-items-center">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={20} />
          <span className="votes">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={15} />
          </span>
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={20} />
        </div>
        <div className="topic-item-content">
          <h4 className="topic-title">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   />
          </h4>
          <div className="topic-meta d-flex align-items-center">
            <div className="topic-writer d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   circle width={50} height={50} />
              <h5>
                <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={120} />
              </h5>
              <h5>
                <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={70} />
              </h5>
            </div>
          </div>
          <p className="topic-summary">
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   count={4} />
          </p>
          <div className="tags-container d-flex align-items-center">
            <span className="d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={70} />
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
            </span>
          </div>
          <div className="tags-container d-flex align-items-center">
            <span className="d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
            </span>
          </div>
        </div>

        <div className="add-comment d-flex pt-5 pr-5 pl-5">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   circle width={50} height={50} />
          <span style={{ height: `100%`, width: `100%`, marginLeft: `1rem` }}>
            <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   height={110} />
          </span>
        </div>
        <div className="comments-container">
          <div className="answers d-flex align-items-center">
            <span className="stats d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={100} height={5} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SkeletonTopicPage;
