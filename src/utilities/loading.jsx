import React from 'react';
import { motion } from 'framer-motion';

const ClapperboardAnimation = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <div className="relative w-64 h-48">
        {/* Clapperboard base */}
        <div className="absolute inset-0 bg-gradient-to-tr from-matte-black via-onyx to-night rounded-lg" />
        
        {/* Clapperboard top */}
        <motion.div
          className="absolute inset-x-0 top-0 h-12 bg-white rounded-t-lg origin-top"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 60 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        >
          {/* Stripes on the clapperboard */}
          <div className="h-full flex">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 bg-black mx-1" />
            ))}
          </div>
        </motion.div>
        
        {/* Clapperboard stick */}
        <motion.div
          className="absolute left-4 top-10 w-56 h-2 bg-gray-300 origin-left"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        />
      </div>
    </div>
  );
};

export default ClapperboardAnimation;