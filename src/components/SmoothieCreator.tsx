
import React, { useState } from "react";
import { useSmoothie } from "../context/SmoothieContext";
import IngredientList from "./IngredientList";
import Smoothie from "./Smoothie";
import { motion } from "framer-motion";

const SmoothieCreator: React.FC = () => {
  const { smoothie, blendSmoothie, resetSmoothie, sipSmoothie } = useSmoothie();
  const [isBlending, setIsBlending] = useState(false);
  
  const handleBlend = () => {
    if (smoothie.selectedIngredients.length < 2) {
      return; // Need at least 2 ingredients
    }
    
    setIsBlending(true);
    
    // Simulate blending animation
    setTimeout(() => {
      blendSmoothie();
      setIsBlending(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Smoothie />
          
          {/* Blender animation */}
          {isBlending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 animate-stir flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/30 animate-stir" style={{ animationDelay: "-0.5s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleBlend}
            disabled={smoothie.selectedIngredients.length < 2 || smoothie.blended || isBlending}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              smoothie.selectedIngredients.length < 2 || smoothie.blended || isBlending
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 button-hover"
            }`}
          >
            {isBlending ? "Blending..." : "Blend Smoothie"}
          </button>
          
          {smoothie.blended && !smoothie.sipped && (
            <button
              onClick={sipSmoothie}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium button-hover"
            >
              Take a Sip
            </button>
          )}
          
          <button
            onClick={resetSmoothie}
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium button-hover"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div>
        <IngredientList />
      </div>
    </div>
  );
};

export default SmoothieCreator;
