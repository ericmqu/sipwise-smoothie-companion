
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FactCardProps = {
  title: string;
  percentage: number;
  description: string;
};

const FactCard: React.FC<FactCardProps> = ({ title, percentage, description }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <div className="flex items-center mb-3">
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
          ></motion.div>
        </div>
        <span className="ml-3 font-medium text-sm">{percentage}%</span>
      </div>
      
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const HealthEducation: React.FC = () => {
  const [showRiskCheck, setShowRiskCheck] = useState(false);
  
  return (
    <div className="bg-glass rounded-2xl p-8">
      <AnimatePresence mode="wait">
        {!showRiskCheck ? (
          <motion.div
            key="education"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-2 text-center">Did You Know?</h2>
            <p className="text-muted-foreground mb-8 text-center">
              Sharing drinks can sometimes lead to the transmission of viruses and bacteria.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FactCard 
                title="Herpes Simplex Virus (HSV-1)"
                percentage={67}
                description="About 67% of the global population under age 50 has HSV-1, which is mainly transmitted through oral contact."
              />
              
              <FactCard 
                title="Cold & Flu Viruses"
                percentage={42}
                description="Sharing drinks during cold and flu season increases transmission chances by up to 42% according to some studies."
              />
              
              <FactCard 
                title="Common Cold Transmission"
                percentage={35}
                description="Approximately 35% of common cold cases can be traced to direct contact with infected saliva or respiratory droplets."
              />
              
              <FactCard 
                title="Awareness & Prevention"
                percentage={78}
                description="78% of virus transmission through shared drinks can be prevented with proper awareness and precautions."
              />
            </div>
            
            <div className="text-center">
              <p className="mb-6 text-muted-foreground">
                While sharing drinks occasionally is common, it's good to be aware of the potential health implications. Would you like to learn more about your personal risk level?
              </p>
              
              <button 
                onClick={() => setShowRiskCheck(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium button-hover"
              >
                Check My Risk Level
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="risk-check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-3xl">👩‍⚕️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Virtual Doctor</h3>
                <p className="text-sm text-muted-foreground">Health Information Specialist</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <p className="mb-4">
                Hi there! I'm Dr. Virtual, your health information specialist. While sharing drinks occasionally is common in social settings, it's good to be aware of some health facts:
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>HSV-1 (oral herpes) affects approximately 67% of people under 50 worldwide.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Most people with HSV-1 don't show symptoms but can still transmit the virus.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Other common illnesses like cold, flu, and strep throat can also be transmitted through shared drinks.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Regular testing is a good practice for overall health awareness.</span>
                </li>
              </ul>
              
              <p>
                Remember, this information is educational only. For personalized medical advice, please consult with a healthcare professional.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowRiskCheck(false)}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium button-hover"
              >
                Back to Facts
              </button>
              
              <a 
                href="https://www.cdc.gov/std/herpes/default.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium button-hover"
              >
                Learn More (CDC)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthEducation;
