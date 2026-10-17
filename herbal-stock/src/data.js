// All stock is stored in GRAMS (1 kg = 1000 g) so the maths is always exact.

export const LOW_STOCK_G = 500; // below 500 g = "Low"

export const USERS = Array.from({ length: 26 }, (_, i) => `User ${String.fromCharCode(65 + i)}`); // User A ... User Z

const NAMES = [
  "Ayurvathy Ilai", "Water", "Turmeric", "Neem Leaf", "Tulsi", "Ashwagandha", "Triphala", "Brahmi",
  "Amla", "Ginger", "Black Pepper", "Long Pepper", "Cumin", "Fenugreek", "Licorice Root", "Aloe Vera",
  "Curry Leaf", "Moringa", "Holy Basil", "Sandalwood", "Cardamom", "Clove", "Cinnamon", "Fennel",
  "Coriander", "Mustard Seed", "Garlic", "Honey", "Ghee", "Sesame Oil", "Coconut Oil", "Castor Oil",
  "Gooseberry", "Haritaki", "Bibhitaki", "Guduchi", "Shatavari", "Arjuna Bark", "Vetiver", "Camphor",
];

// 100 ingredients, each starts with 5 kg
export function makeSeedIngredients() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: NAMES[i] ?? `Ingredient ${i + 1}`,
    stockG: 5000,
  }));
}

export const kg = (grams) => (grams / 1000).toFixed(2) + " kg";
