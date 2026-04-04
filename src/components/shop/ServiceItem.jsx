import colors from "../../styles/colors";

function ServiceItem({ service }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div>
        <p className="text-white text-sm font-medium">{service.name}</p>
        <p className="text-sm mt-0.5" style={{ color: colors.gray }}>{service.duration}</p>
      </div>
      <span className="text-sm font-semibold text-white">{service.price} ₸</span>
    </div>
  );
}

export default ServiceItem;
