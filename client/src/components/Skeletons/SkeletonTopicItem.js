import Skeleton from "react-loading-skeleton";

const SkeletonTopicItem = () => {
  return (
    <article className="topic-item">
      <div className="topic-vote d-flex flex-column align-items-center">
        <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={20} />
        <span className="votes">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={15} />
        </span>
        <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={20} />
      </div>
      <div className="topic-item-content">
        <div className="d-flex justify-content-around">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={150} />
        </div>
        <h4 className="mt-3 topic-title">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   />
        </h4>
        <p className="topic-summary">
          <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   count={4} />
        </p>
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
          <div className="topic-stats d-flex">
            <span className="answers d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={25} />
            </span>
            <span className="views d-flex align-items-center">
              <Skeleton highlightColor="#e6f7ff" baseColor="#21114d"   width={25} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SkeletonTopicItem;
