
import React, { useMemo } from "react";
import { useSmoothie } from "../context/SmoothieContext";
import { motion } from "framer-motion";

const Smoothie: React.FC = () => {
  const { smoothie } = useSmoothie();
  const { selectedIngredients, blended } = smoothie;

  // Calculate the average color of all selected ingredients
  const smoothieColor = useMemo(() => {
    if (selectedIngredients.length === 0) return "#FFFFFF";
    
    if (!blended) {
      // Return a layered look for unblended ingredients
      return `linear-gradient(to bottom, ${selectedIngredients
        .map((ing) => ing.color)
        .join(", ")})`;
    }

    // Calculate average RGB for blended color
    let r = 0, g = 0, b = 0;
    
    selectedIngredients.forEach((ing) => {
      // Convert hex to RGB
      const hex = ing.color.replace("#", "");
      const bigint = parseInt(hex, 16);
      const rVal = (bigint >> 16) & 255;
      const gVal = (bigint >> 8) & 255;
      const bVal = bigint & 255;
      
      r += rVal;
      g += gVal;
      b += bVal;
    });
    
    // Calculate average
    r = Math.round(r / selectedIngredients.length);
    g = Math.round(g / selectedIngredients.length);
    b = Math.round(b / selectedIngredients.length);
    
    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }, [selectedIngredients, blended]);

  // Generate a list of ingredient names
  const ingredientsList = selectedIngredients.map(ing => ing.name).join(", ");

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-8">
      <div className="relative w-60 h-72 flex flex-col items-center">
        {/* Glass */}
        <div className="absolute w-56 h-64 rounded-b-3xl rounded-t-lg border-2 border-gray-200 bg-glass overflow-hidden backdrop-blur-md">
          {/* Smoothie contents */}
          {selectedIngredients.length > 0 && (
            <>
              <motion.div 
                className="absolute bottom-0 w-full transition-all duration-500 ease-in-out"
                initial={{ height: 0 }}
                animate={{ height: "85%" }}
                style={{
                  background: blended ? smoothieColor : smoothieColor,
                  transition: "background 1s ease-out, height 0.5s ease-out",
                }}
              >
                {!blended && selectedIngredients.length > 0 && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    {selectedIngredients.map((ing, index) => (
                      <div
                        key={ing.id}
                        className="absolute w-full"
                        style={{
                          backgroundColor: ing.color,
                          height: `${100 / selectedIngredients.length}%`,
                          top: `${(index * 100) / selectedIngredients.length}%`,
                          opacity: 0.9,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Bubbles animation when blended */}
                {blended && (
                  <>
                    <div className="absolute top-[10%] left-[20%] w-3 h-3 rounded-full bg-white/20 animate-float" style={{ animationDelay: "0s" }}></div>
                    <div className="absolute top-[30%] left-[50%] w-2 h-2 rounded-full bg-white/20 animate-float" style={{ animationDelay: "0.5s" }}></div>
                    <div className="absolute top-[60%] left-[30%] w-4 h-4 rounded-full bg-white/20 animate-float" style={{ animationDelay: "1.2s" }}></div>
                    <div className="absolute top-[40%] left-[70%] w-2 h-2 rounded-full bg-white/20 animate-float" style={{ animationDelay: "0.8s" }}></div>
                  </>
                )}
              </motion.div>

              {/* Straw */}
              <div className="absolute top-0 right-1/4 w-4 h-72 flex justify-center z-10">
                <div className="w-3 h-36 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full"></div>
              </div>
            </>
          )}
        </div>

        {/* Glass shine effect */}
        <div className="absolute top-0 left-4 w-8 h-56 bg-white/10 rotate-12 blur-sm"></div>
        
        {/* Glass base */}
        <div className="absolute bottom-0 w-48 h-3 bg-gray-200/50 backdrop-blur-lg rounded-full"></div>
      </div>

      {/* Ingredients list */}
      {selectedIngredients.length > 0 && (
        <div className="mt-6 text-center max-w-xs">
          <h3 className="font-medium text-lg">Your Smoothie</h3>
          <p className="text-sm text-muted-foreground mt-1">{ingredientsList}</p>
        </div>
      )}

      {selectedIngredients.length === 0 && (
        <div className="mt-6 text-center text-muted-foreground">
          <p>Select ingredients to create your smoothie!</p>
        </div>
      )}
    </div>
  );
};

export default Smoothie;
