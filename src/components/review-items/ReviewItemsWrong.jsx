import ReviewItem from "./ReviewItem";

const ReviewItemsWrong = ({ review }) => {
  return (
    <ul className="my-5">
      {review.map((review, index) => {
        return <ReviewItem key={index} review={review} />;
      })}
    </ul>
  );
};
export default ReviewItemsWrong;
