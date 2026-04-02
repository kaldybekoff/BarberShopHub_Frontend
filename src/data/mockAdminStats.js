export const adminStatsCards = [
  { id: 1, label: "Всего пользователей", value: "1 248", icon: "👥" },
  { id: 2, label: "Всего барбершопов", value: "34", icon: "✂️" },
  { id: 3, label: "Записей за месяц", value: "2 107", icon: "📅" },
  { id: 4, label: "Отзывов на модерации", value: "8", icon: "💬" },
];

export const userList = [
  { id: 1, name: "Алибек Джаксыбеков", phone: "+7 700 123 4567", registeredAt: "01.03.2026", role: "user", status: "active" },
  { id: 2, name: "Нурлан Сейткали", phone: "+7 701 234 5678", registeredAt: "05.03.2026", role: "user", status: "active" },
  { id: 3, name: "Марат Барбер", phone: "+7 702 345 6789", registeredAt: "10.02.2026", role: "barbershop", status: "active" },
  { id: 4, name: "Темирлан Ахметов", phone: "+7 703 456 7890", registeredAt: "15.02.2026", role: "user", status: "blocked" },
  { id: 5, name: "Айгерим Касымова", phone: "+7 704 567 8901", registeredAt: "20.01.2026", role: "user", status: "active" },
  { id: 6, name: "Данияр Омаров", phone: "+7 705 678 9012", registeredAt: "25.01.2026", role: "barbershop", status: "blocked" },
];

export const barbershopList = [
  { id: 1, name: "BarberKing", address: "ул. Абая, 12", rating: 4.8, status: "active" },
  { id: 2, name: "Chop Chop", address: "пр. Достык, 45", rating: 4.6, status: "active" },
  { id: 3, name: "OldSchool Barbershop", address: "ул. Толе би, 78", rating: 4.4, status: "blocked" },
  { id: 4, name: "Fade Masters", address: "ул. Байтурсынова, 5", rating: 4.9, status: "active" },
  { id: 5, name: "CutZone", address: "ул. Сейфуллина, 33", rating: 4.2, status: "pending" },
  { id: 6, name: "Royal Cuts", address: "пр. Аль-Фараби, 17", rating: 4.7, status: "active" },
];

export const reviewList = [
  { id: 1, author: "Алибек Д.", barbershop: "BarberKing", text: "Отличное место, мастер очень профессиональный!", rating: 5, status: "pending" },
  { id: 2, author: "Серик О.", barbershop: "Chop Chop", text: "Нормально, но пришлось долго ждать.", rating: 3, status: "approved" },
  { id: 3, author: "Тимур Н.", barbershop: "Fade Masters", text: "Лучшие фейды в городе, однозначно рекомендую!", rating: 5, status: "pending" },
  { id: 4, author: "Максим В.", barbershop: "OldSchool Barbershop", text: "Не понравилось обслуживание, грубый мастер.", rating: 2, status: "rejected" },
  { id: 5, author: "Даурен К.", barbershop: "CutZone", text: "Хорошее соотношение цены и качества.", rating: 4, status: "pending" },
  { id: 6, author: "Олжас М.", barbershop: "Royal Cuts", text: "Быстро и качественно, рекомендую всем!", rating: 5, status: "approved" },
  { id: 7, author: "Арман Т.", barbershop: "BarberKing", text: "Мастер опоздал на 20 минут, неприятно.", rating: 2, status: "rejected" },
  { id: 8, author: "Бекзат Н.", barbershop: "Fade Masters", text: "Цена завышена, но качество на уровне.", rating: 3, status: "pending" },
];
