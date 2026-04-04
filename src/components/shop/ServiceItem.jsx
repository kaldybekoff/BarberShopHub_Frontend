import colors from "../../styles/colors";

function ServiceItem({ service }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-xl"
      style={{ backgroundColor: colors.dark }}>
      <div>
        <p className="text-white text-sm font-medium">{service.name}</p>
        <p className="text-xs mt-0.5" style={{ color: colors.gray }}>{service.duration}</p>
      </div>
      <span className="text-sm font-semibold text-white">{service.price} ₸</span>
    </div>
  );
}

export default ServiceItem;
