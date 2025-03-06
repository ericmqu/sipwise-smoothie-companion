
import React, { useState } from "react";
import { useSmoothie, Ingredient } from "../context/SmoothieContext";

const IngredientList: React.FC = () => {
  const { allIngredients, addIngredient, removeIngredient, smoothie } = useSmoothie();
  const [activeCategory, setActiveCategory] = useState<string>("fruits");

  const categories = [
    { id: "fruits", name: "Fruits", icon: "🍓" },
    { id: "vegetables", name: "Vegetables", icon: "🥬" },
    { id: "bases", name: "Bases", icon: "🥛" },
    { id: "boosters", name: "Boosters", icon: "💪" },
  ];

  const filteredIngredients = allIngredients.filter(
    (ingredient) => ingredient.category === activeCategory
  );

  const handleIngredientClick = (ingredient: Ingredient) => {
    const isSelected = smoothie.selectedIngredients.some(
      (ing) => ing.id === ingredient.id
    );

    if (isSelected) {
      removeIngredient(ingredient.id);
    } else {
      addIngredient(ingredient);
    }
  };

  const isIngredientSelected = (ingredientId: string) => {
    return smoothie.selectedIngredients.some((ing) => ing.id === ingredientId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-glass rounded-2xl p-6 animate-scale-in">
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose Your Ingredients</h2>
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            onClick={() => handleIngredientClick(ingredient)}
            className={`ingredient-card ${
              isIngredientSelected(ingredient.id) ? "selected" : ""
            }`}
            style={{
              borderColor: ingredient.color,
              backgroundColor: `${ingredient.color}20`,
            }}
          >
            <div className="text-3xl mb-2">{ingredient.icon}</div>
            <p className="font-medium text-center">{ingredient.name}</p>
            {isIngredientSelected(ingredient.id) && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
