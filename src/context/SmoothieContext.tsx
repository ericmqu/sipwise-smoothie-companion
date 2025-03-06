
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Ingredient = {
  id: string;
  name: string;
  color: string;
  icon: string;
  category: "fruits" | "vegetables" | "bases" | "boosters";
};

export type SmoothieState = {
  selectedIngredients: Ingredient[];
  blended: boolean;
  sipped: boolean;
  shared: boolean;
  tasteRating: number | null;
};

type SmoothieContextType = {
  smoothie: SmoothieState;
  allIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientId: string) => void;
  blendSmoothie: () => void;
  resetSmoothie: () => void;
  sipSmoothie: () => void;
  shareSmoothie: () => void;
};

const SmoothieContext = createContext<SmoothieContextType | undefined>(undefined);

// Predefined list of ingredients
const ingredients: Ingredient[] = [
  // Fruits
  { id: "strawberry", name: "Strawberry", color: "#FF6B6B", icon: "🍓", category: "fruits" },
  { id: "banana", name: "Banana", color: "#FFD93D", icon: "🍌", category: "fruits" },
  { id: "blueberry", name: "Blueberry", color: "#6B66FF", icon: "🫐", category: "fruits" },
  { id: "mango", name: "Mango", color: "#FFB347", icon: "🥭", category: "fruits" },
  { id: "pineapple", name: "Pineapple", color: "#FFDA79", icon: "🍍", category: "fruits" },
  
  // Vegetables
  { id: "spinach", name: "Spinach", color: "#6BCB77", icon: "🥬", category: "vegetables" },
  { id: "kale", name: "Kale", color: "#4D8B31", icon: "🥬", category: "vegetables" },
  { id: "carrot", name: "Carrot", color: "#FF9636", icon: "🥕", category: "vegetables" },
  
  // Bases
  { id: "almond-milk", name: "Almond Milk", color: "#F9F5F0", icon: "🥛", category: "bases" },
  { id: "coconut-milk", name: "Coconut Milk", color: "#FEFEE2", icon: "🥥", category: "bases" },
  { id: "oat-milk", name: "Oat Milk", color: "#F8E8D5", icon: "🥛", category: "bases" },
  { id: "yogurt", name: "Yogurt", color: "#FAFAFA", icon: "🧉", category: "bases" },
  
  // Boosters
  { id: "chia-seeds", name: "Chia Seeds", color: "#484848", icon: "●", category: "boosters" },
  { id: "protein", name: "Protein", color: "#E0E0E0", icon: "💪", category: "boosters" },
  { id: "honey", name: "Honey", color: "#F0B000", icon: "🍯", category: "boosters" },
];

export const SmoothieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [smoothie, setSmoothie] = useState<SmoothieState>({
    selectedIngredients: [],
    blended: false,
    sipped: false,
    shared: false,
    tasteRating: null,
  });

  const addIngredient = (ingredient: Ingredient) => {
    setSmoothie((prev) => ({
      ...prev,
      selectedIngredients: [...prev.selectedIngredients, ingredient],
    }));
  };

  const removeIngredient = (ingredientId: string) => {
    setSmoothie((prev) => ({
      ...prev,
      selectedIngredients: prev.selectedIngredients.filter(
        (ing) => ing.id !== ingredientId
      ),
    }));
  };

  const blendSmoothie = () => {
    setSmoothie((prev) => ({
      ...prev,
      blended: true,
    }));
  };

  const resetSmoothie = () => {
    setSmoothie({
      selectedIngredients: [],
      blended: false,
      sipped: false,
      shared: false,
      tasteRating: null,
    });
  };

  const sipSmoothie = () => {
    // Generate a random taste rating between 1 and 10
    const rating = Math.floor(Math.random() * 10) + 1;
    
    setSmoothie((prev) => ({
      ...prev,
      sipped: true,
      tasteRating: rating,
    }));
  };

  const shareSmoothie = () => {
    setSmoothie((prev) => ({
      ...prev,
      shared: true,
    }));
  };

  return (
    <SmoothieContext.Provider
      value={{
        smoothie,
        allIngredients: ingredients,
        addIngredient,
        removeIngredient,
        blendSmoothie,
        resetSmoothie,
        sipSmoothie,
        shareSmoothie,
      }}
    >
      {children}
    </SmoothieContext.Provider>
  );
};

export const useSmoothie = () => {
  const context = useContext(SmoothieContext);
  if (context === undefined) {
    throw new Error("useSmoothie must be used within a SmoothieProvider");
  }
  return context;
};
