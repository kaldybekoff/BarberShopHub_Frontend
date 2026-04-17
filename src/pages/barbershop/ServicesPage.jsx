import { useState } from "react";
import mockShops from "../../data/mockShops";
import Button from "../../components/shared/Button";
import EmptyState from "../../components/shared/EmptyState";
import SectionTitle from "../../components/shared/SectionTitle";
import colors from "../../constants/colors";

// TODO: заменить на услуги текущего барбершопа из API
const mockServiceList = mockShops[0]?.services ?? [];

function ServicesPage() {
  const [serviceList] = useState(mockServiceList);

  return (
    <div
      className="min-h-full px-4 md:px-6 py-6 max-w-7xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex items-start md:items-center justify-between gap-3 mb-6">
        <div>
          <SectionTitle title="Услуги" subtitle="Услуги вашего барбершопа" compact />
        </div>
        <Button label="+ Добавить" variant="primary" />
      </div>

      {serviceList.length === 0 ? (
        <EmptyState icon="scissors" message="Добавьте первую услугу." />
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
