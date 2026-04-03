import Button from "../../components/common/Button";
import colors from "../../styles/colors";

function ReviewModerationTable({ reviewList }) {
  const pendingReviews = reviewList.filter((r) => r.status === "pending");

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: colors.dark }}>
        <h2 className="text-white font-semibold text-base">Отзывы на модерации</h2>
      </div>

      <div className="flex flex-col">
        {pendingReviews.map((review, index) => {
          const isLast = index === pendingReviews.length - 1;
          return (
            <div
              key={review.id}
              className="px-5 py-4 flex flex-col gap-2"
              style={isLast ? {} : { borderBottom: `1px solid ${colors.dark}` }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{review.author}</span>
                  <span className="text-xs" style={{ color: colors.gray }}>→ {review.barbershop}</span>
                </div>
                <span style={{ color: colors.gold }} className="text-sm">
                  {(() => {
                    const r = Math.min(5, Math.max(0, Math.round(review.rating || 0)));
                    return "★".repeat(r) + "☆".repeat(5 - r);
                  })()}
                </span>
              </div>

              <p className="text-sm" style={{ color: colors.gray }}>{review.text}</p>

              <div className="flex gap-2 pt-1">
                <Button label="Одобрить" variant="success" />
                <Button label="Отклонить" variant="danger" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewModerationTable;
