import mockShops from "../../data/mockShops";
import colors from "../../styles/colors";

const serviceList = mockShops[0].services;

function ServicesPage() {
  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Заголовок + кнопка добавить */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Услуги</h1>
          <p className="text-sm mt-1" style={{ color: colors.gray }}>
            Услуги вашего барбершопа
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: colors.accent }}
        >
          + Добавить
        </button>
      </div>

      {/* Список услуг */}
      {serviceList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl">✂️</span>
          <p className="text-white font-medium">Услуг пока нет</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            Добавьте первую услугу
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl px-4 py-4 flex items-center justify-between"
              style={{ backgroundColor: colors.light }}
            >
              {/* Левая часть: название + длительность */}
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold text-sm">
                  {service.name}
                </span>
                <span className="text-xs" style={{ color: colors.gray }}>
                  {service.duration}
                </span>
              </div>

              {/* Правая часть: цена + кнопки */}
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-sm">
                  {service.price.toLocaleString()} ₸
                </span>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: colors.dark,
                    color: colors.gray,
                  }}
                >
                  Ред.
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: `${colors.accent}20`,
                    color: colors.accent,
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
