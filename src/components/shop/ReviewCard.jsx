import colors from "../../styles/colors";

function ReviewCard({ review }) {
  return (
    <div
      className="px-4 py-3 rounded-xl flex flex-col gap-1"
      style={{ backgroundColor: colors.dark }}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{review.author}</span>
        <span className="text-xs" style={{ color: colors.gray }}>{review.date}</span>
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-xs"
            style={{ color: star <= review.rating ? colors.gold : colors.light }}>
            ★
          </span>
        ))}
      </div>
      <p className="text-sm" style={{ color: colors.gray }}>{review.comment}</p>
    </div>
  );
}

export default ReviewCard;
