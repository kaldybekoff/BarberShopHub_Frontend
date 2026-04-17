import Button from "../../components/shared/Button";
import colors from "../../constants/colors";

const reviewStatusConfig = {
  pending: { label: "Ожидает", color: colors.warning },
  approved: { label: "Одобрено", color: colors.success },
  rejected: { label: "Отклонено", color: colors.accent },
};

function ReviewModerationTable({ reviewList }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: colors.dark }}>
        <h2 className="text-white font-semibold text-base">Отзывы</h2>
      </div>

      <div className="flex flex-col">
        {reviewList.map((review, index) => {
          const isLast = index === reviewList.length - 1;
          const isPending = review.status === "pending";
          const status = reviewStatusConfig[review.status] || reviewStatusConfig.pending;
          return (
            <div
              key={review.id}
              className="px-5 py-4 flex flex-col gap-2"
              style={isLast ? {} : { borderBottom: `1px solid ${colors.dark}` }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-white text-sm font-medium truncate">{review.author}</span>
                  <span className="text-xs truncate" style={{ color: colors.gray }}>→ {review.barbershop}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ color: status.color, backgroundColor: `${status.color}20` }}
                  >
                    {status.label}
                  </span>
                  <span style={{ color: colors.gold }} className="text-sm">
                    {(() => {
                      const r = Math.min(5, Math.max(0, Math.round(review.rating || 0)));
                      return "★".repeat(r) + "☆".repeat(5 - r);
                    })()}
                  </span>
                </div>
              </div>

              <p className="text-sm" style={{ color: colors.gray }}>{review.text}</p>

              {isPending && (
                <div className="flex gap-2 pt-1 lg:justify-end">
                  <Button label="Одобрить" variant="success" />
                  <Button label="Отклонить" variant="danger" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewModerationTable;
