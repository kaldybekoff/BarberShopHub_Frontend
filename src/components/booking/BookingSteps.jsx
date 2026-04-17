const steps = [
  { num: 1, label: "1. Услуга" },
  { num: 2, label: "2. Время" },
  { num: 3, label: "3. Подтверждение" },
];

function BookingSteps({ currentStep }) {
  return (
    <div style={{ padding: "16px 32px 24px" }}>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}
      >
        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isDone = step.num < currentStep;
          const highlighted = isActive || isDone;

          return (
            <div key={step.num}>
              <div
                style={{
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: highlighted ? "#E94560" : "#2a3a4a",
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  marginTop: "6px",
                  color: isActive ? "#E94560" : "#A8B2C1",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingSteps;
