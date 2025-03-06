
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SmoothieCreator from "../components/SmoothieCreator";
import SmoothieAssistant from "../components/SmoothieAssistant";
import { SmoothieProvider } from "../context/SmoothieContext";

const Index: React.FC = () => {
  return (
    <SmoothieProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        
        <main className="container px-4 pt-28 pb-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full">
              Interactive Health Education
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Welcome to SipSafe
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your perfect smoothie, share it with our AI assistant, and learn about the science of shared drinks.
            </p>
          </motion.div>
          
          <SmoothieCreator />
          <SmoothieAssistant />
        </main>
      </div>
    </SmoothieProvider>
  );
};

export default Index;
