import ReviewItem from "./ReviewItem";

const ReviewItemsQuestioned = ({ review }) => {
  return (
    <ul className="my-5">
      {review.map((review, index) => {
        return <ReviewItem key={index} review={review} />;
      })}
    </ul>
  );
};
export default ReviewItemsQuestioned;
