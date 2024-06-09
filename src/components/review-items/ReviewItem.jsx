const ReviewItem = ({ review }) => {
  return (
    <li className="flex items-start gap-2 text-zin bg-white bg-opacity-5 rounded-xl py-3 px-5 text-sm mt-2 hover:bg-opacity-10 duration-200 cursor-default">
      <span className="min-w-[5px] min-h-[5px] rounded-full bg-zinc-200 mt-2 mr-3"></span>
      <div>
        <div>
          <p>{review.title}</p>
        </div>
        {review.notes && (
          <p className="text-zinc-400 mt-3 bg-white bg-opacity-5 rounded-xl px-5 py-3">
            {review.notes}
          </p>
        )}
      </div>
    </li>
  );
};
export default ReviewItem;
