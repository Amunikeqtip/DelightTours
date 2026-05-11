export type ServiceOption = {
  id: string;
  title: string;
  price: number;
  category: string;
};

export const serviceOptions: ServiceOption[] = [
  { id: "1", title: "Victoria Falls Guided Tour", price: 65, category: "Sightseeing" },
  { id: "2", title: "Zambezi Sunset Cruise", price: 85, category: "River" },
  { id: "3", title: "Chobe Day Safari", price: 175, category: "Safari" },
  { id: "4", title: "Falls Helicopter Flight", price: 160, category: "Adventure" },
  { id: "5", title: "Village & Market Visit", price: 45, category: "Culture" },
  { id: "6", title: "Boma Dinner Experience", price: 70, category: "Culture" },
  { id: "7", title: "Zambezi Canoe Trail", price: 115, category: "Adventure" },
  { id: "8", title: "Private Airport Transfer", price: 25, category: "Transfers" },
];
