
import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container px-4 pt-28 pb-16">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              About SipSafe
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Fun with a Purpose
            </motion.p>
          </div>
          
          <div className="bg-glass rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-6">
              SipSafe was created to blend fun with education. We believe that awareness about health and safety can be delivered in engaging, interactive ways that don't feel like traditional educational materials.
            </p>
            <p>
              Our app lets you enjoy the creative process of making virtual smoothies while also learning about important health facts regarding shared drinks and virus transmission in a casual, non-threatening manner.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-glass rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">Educational Value</h2>
              <p className="text-muted-foreground">
                SipSafe provides factual health information about virus transmission through shared drinks, focusing on HSV-1 (oral herpes) and other common illnesses. All statistics are based on current public health data.
              </p>
            </div>
            
            <div className="bg-glass rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">Playful Learning</h2>
              <p className="text-muted-foreground">
                We believe that learning is most effective when it's enjoyable. That's why we've created an interactive experience that delivers important health information through a fun, game-like interface.
              </p>
            </div>
          </div>
          
          <div className="bg-glass rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">The Team</h2>
            <p className="mb-6">
              SipSafe was developed by a team of health educators, developers, and designers who are passionate about creating innovative approaches to public health education.
            </p>
            <p>
              Our goal is to continue developing interactive tools that make learning about health engaging and accessible to everyone.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Remember, SipSafe is designed for educational purposes only. For personalized medical advice, please consult with a healthcare professional.
            </p>
            
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium button-hover"
            >
              Start Creating Smoothies
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
