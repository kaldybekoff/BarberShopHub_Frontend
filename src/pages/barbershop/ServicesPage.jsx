import mockShops from "../../data/mockShops";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
import colors from "../../styles/colors";

const serviceList = mockShops[0].services;

function ServicesPage() {
  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title="Услуги" subtitle="Услуги вашего барбершопа" />
        <Button label="+ Добавить" variant="primary" />
      </div>

      {serviceList.length === 0 ? (
        <EmptyState icon="✂️" message="Добавьте первую услугу." />
      ) : (
        <div className="flex flex-col gap-3">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl px-4 py-4 flex items-center justify-between"
              style={{ backgroundColor: colors.light }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold text-sm">
                  {service.name}
                </span>
                <span className="text-xs" style={{ color: colors.gray }}>
                  {service.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-sm">
                  {service.price.toLocaleString()} ₸
                </span>
                <Button label="Ред." variant="secondary" />
                <Button label="Удалить" variant="danger" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
