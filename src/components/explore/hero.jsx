import React from "react";
import { Button } from 'evergreen-ui';
import { Film, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex flex-col md:flex-row justify-center items-center p-8 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="w-full md:w-1/2 z-10">
        <div className="flex flex-col gap-4 max-w-lg mx-auto md:ml-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 animate-fade-in-down">
            Cinema: A Canvas of Dreams
          </h1>
          <p className="text-lg text-gray-600 mb-1 animate-fade-in-up animation-delay-300">
            Witness the evolution of filmmaking,
          </p>
          <p className="text-lg text-gray-600 mb-1 animate-fade-in-up animation-delay-600">
            from the gritty realism of Italian cinema to the mind-bending visions of Surrealism.
          </p>
          <p className="text-lg text-gray-600 mb-5 animate-fade-in-up animation-delay-900">
            Discover the techniques and artistry of the world's greatest directors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1200">
            <Button iconBefore={Film} appearance="primary" height={48} className="bg-blue-500 hover:bg-blue-600">
              Discover More
            </Button>
            <Button iconAfter={ChevronRight} intent="danger" appearance="primary" height={48} className="bg-red-500 hover:bg-red-600">
              Start Now
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-12 md:mt-0 z-10">
        <div className="relative w-full max-w-md mx-auto">
          <img src="../../../asset.png" alt="Cinema Equipment" className="w-full h-auto rounded-lg shadow-2xl animate-fade-in-up" />
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-md opacity-80 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-md opacity-80 animate-pulse animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;