
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothie } from "../context/SmoothieContext";
import HealthEducation from "./HealthEducation";

const SmoothieAssistant: React.FC = () => {
  const { smoothie, shareSmoothie } = useSmoothie();
  const [drinkingStage, setDrinkingStage] = useState(0);
  const [showEducation, setShowEducation] = useState(false);

  const handleShareWithAssistant = () => {
    shareSmoothie();
    // Start drinking animation sequence
    simulateDrinking();
  };

  const simulateDrinking = () => {
    // Simulate drinking animation in stages
    setDrinkingStage(1);
    
    const stages = [
      { stage: 2, delay: 1500 },
      { stage: 3, delay: 3000 },
      { stage: 4, delay: 4500 },
    ];
    
    stages.forEach(({ stage, delay }) => {
      setTimeout(() => {
        setDrinkingStage(stage);
        
        // After final stage, show health education
        if (stage === 4) {
          setTimeout(() => {
            setShowEducation(true);
          }, 1000);
        }
      }, delay);
    });
  };

  // If smoothie hasn't been sipped yet, don't show anything
  if (!smoothie.sipped) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <AnimatePresence>
        {!smoothie.shared && (
          <motion.div 
            className="bg-glass rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">How's Your Smoothie?</h2>
            
            <div className="mb-6">
              <p className="text-lg">
                {smoothie.tasteRating && smoothie.tasteRating >= 7
                  ? "Mmm, it's delicious! 😋"
                  : smoothie.tasteRating && smoothie.tasteRating >= 4
                  ? "It's pretty good! 😊"
                  : "It's not really your taste... 😕"}
              </p>
              
              <div className="flex items-center justify-center mt-4">
                <div className="w-48 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{ width: `${(smoothie.tasteRating || 0) * 10}%` }}
                  >
                  </div>
                </div>
                <span className="ml-3 font-medium">{smoothie.tasteRating}/10</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <button 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium button-hover"
                onClick={() => {/* Continue drinking logic */}}
              >
                Finish My Smoothie
              </button>
              
              <button 
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium button-hover"
                onClick={handleShareWithAssistant}
              >
                Share with Assistant
              </button>
            </div>
          </motion.div>
        )}

        {smoothie.shared && !showEducation && (
          <motion.div 
            className="bg-glass rounded-2xl p-8 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-6">
                {/* Assistant character */}
                <motion.div 
                  className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden"
                  animate={
                    drinkingStage === 1 
                      ? { scale: [1, 1.05, 1] } 
                      : drinkingStage === 3 
                      ? { rotate: [0, 5, 0, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 1, repeat: drinkingStage === 1 ? 3 : 0 }}
                >
                  <div className="text-7xl">🤖</div>
                </motion.div>
                
                {/* Smoothie glass */}
                {drinkingStage <= 3 && (
                  <motion.div 
                    className="absolute bottom-0 right-0 w-20 h-24 bg-glass rounded-lg overflow-hidden border border-gray-200"
                    initial={{ x: 60, y: 60, opacity: 0 }}
                    animate={{ 
                      x: drinkingStage >= 1 ? 0 : 60, 
                      y: drinkingStage >= 1 ? 0 : 60,
                      opacity: drinkingStage >= 1 ? 1 : 0,
                      rotate: drinkingStage === 2 ? [0, 30, 60] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="absolute bottom-0 w-full bg-smoothie-berry"
                      initial={{ height: "80%" }}
                      animate={{ 
                        height: drinkingStage === 3 ? "10%" : drinkingStage === 2 ? "40%" : "80%"
                      }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </motion.div>
                )}
              </div>
              
              <div className="speech-bubble bg-white p-4 rounded-xl shadow-md max-w-md relative">
                <motion.p
                  key={drinkingStage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {drinkingStage === 0 && "Hi there! I'd be happy to try your smoothie."}
                  {drinkingStage === 1 && "Thanks for sharing! Let me taste this..."}
                  {drinkingStage === 2 && "Mmm, this is quite good! *sips more*"}
                  {drinkingStage === 3 && "Almost finished... *gulp*"}
                  {drinkingStage === 4 && "That was refreshing! Though... you know, sharing drinks does come with some health considerations we should discuss."}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {showEducation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HealthEducation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmoothieAssistant;
