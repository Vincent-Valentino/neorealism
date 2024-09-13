import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FilmIcon, CameraIcon, TvIcon, StarIcon, SunIcon, MoonIcon, 
  CloudIcon, UmbrellaIcon, SakuraIcon, MountainIcon, WaveIcon, FireIcon
} from 'lucide-react';

const Section = ({ title, children }) => {
  // Define random colors for background and text
  const randomBgColor = ['bg-red-600', 'bg-blue-500', 'bg-green-400', 'bg-yellow-300', 'bg-purple-600'];
  const randomTextColor = ['text-white', 'text-black', 'text-gray-100', 'text-gray-800'];

  // Randomly select a color
  const bgColor = randomBgColor[Math.floor(Math.random() * randomBgColor.length)];
  const textColor = randomTextColor[Math.floor(Math.random() * randomTextColor.length)];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen p-8 flex flex-col justify-center ${bgColor} ${textColor}`}
    >
      <motion.h2 
        className="text-4xl font-bold mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
};

const FloatingIcon = ({ icon: Icon, color, size = 24 }) => (
  <motion.div
    className={`text-${color}`}
    animate={{
      y: ["0%", "-50%", "0%"],
      rotate: [0, 360, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 5,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
    }}
  >
    <Icon size={size} />
  </motion.div>
);

const JapaneseCinemaWebsite = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 10;

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % totalSections);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + totalSections) % totalSections);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <Section title="Japanese Cinema">
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
            <motion.h1 
              className="text-6xl font-bold mb-8 relative z-10"
              animate={{ 
                textShadow: ["0 0 20px #ffffff", "0 0 10px #ffffff", "0 0 20px #ffffff"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Japanese Cinema
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Discover the rich history and cultural impact of Japanese filmmaking
            </motion.p>
          </Section>
        )}

        {currentSection === 1 && (
          <Section title="Japanese Cinema Eras">
            <motion.ul className="grid grid-cols-2 gap-4">
              {[
                "Early Days", "Golden Era", "Modern Era", "Kaiju Films",
                "Rise of Anime", "Akira Kurosawa", "Hayao Miyazaki", "Award Winners"
              ].map((item, index) => (
                <motion.li
                  key={item}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </Section>
        )}

        {currentSection === 2 && (
          <Section title="Early Days of Cinema">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The birth of Japanese cinema dates back to the late 19th century...
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <FloatingIcon icon={CameraIcon} color="sepia-300" size={32} />
              <FloatingIcon icon={FilmIcon} color="sepia-300" size={32} />
            </motion.div>
          </Section>
        )}

        {currentSection === 3 && (
          <Section title="Golden Era">
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  <StarIcon size={Math.random() * 20 + 10} />
                </motion.div>
              ))}
            </motion.div>
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              The 1950s and 1960s are often considered the Golden Age of Japanese cinema...
            </motion.p>
            <motion.div 
              className="w-32 h-32 bg-yellow-300 rounded-full mx-auto"
              animate={{
                boxShadow: ["0 0 20px #fde68a", "0 0 60px #fde68a", "0 0 20px #fde68a"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Section>
        )}

        {currentSection === 4 && (
          <Section title="Modern Era">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Contemporary Japanese cinema continues to evolve and influence global filmmaking...
            </motion.p>
            <motion.div className="flex justify-center space-x-8">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SunIcon size={48} className="text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MoonIcon size={48} className="text-blue-400" />
              </motion.div>
            </motion.div>
          </Section>
        )}

        {currentSection === 5 && (
          <Section title="Kaiju Films">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Japan has given birth to unique film genres, including Kaiju (monster) films...
            </motion.p>
            <motion.div 
              className="w-64 h-64 bg-green-700 mx-auto"
              animate={{
                clipPath: [
                  "polygon(50% 0%, 0% 100%, 100% 100%)",
                  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </Section>
        )}

        {currentSection === 6 && (
          <Section title="Anime">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Anime has become a global phenomenon, showcasing Japan's prowess in animation...
            </motion.p>
            <motion.svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
              <motion.path
                d="M100 0 L200 200 L0 200 Z"
                fill="none"
                stroke="#e9d5ff"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
          </Section>
        )}

        {currentSection === 7 && (
          <Section title="Akira Kurosawa">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Akira Kurosawa is one of the most influential filmmakers in the history of cinema...
            </motion.p>
            <motion.div 
              className="w-64 h-48 bg-gray-900 rounded-lg mx-auto overflow-hidden"
              initial={{ boxShadow: "0 0 0 0 rgba(255,255,255,0)" }}
              animate={{ boxShadow: "0 0 30px 10px rgba(255,255,255,0.3)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <motion.div
                className="w-full h-full bg-gray-700"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.p 
                  className="text-center pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Seven Samurai (1954)
                </motion.p>
              </motion.div>
            </motion.div>
          </Section>
        )}

        {currentSection === 8 && (
          <Section title="Hayao Miyazaki">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hayao Miyazaki has enchanted audiences worldwide with his magical animated films...
            </motion.p>
            <motion.div 
              className="w-64 h-64 bg-sky-500 rounded-full mx-auto overflow-hidden"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="w-full h-full bg-sky-300 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.p 
                  className="text-center pt-24 text-sky-900 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Studio Ghibli
                </motion.p>
              </motion.div>
            </motion.div>
          </Section>
        )}

        {currentSection === 9 && (
          <Section title="Award Winners">
            <motion.p 
              className="text-xl mb-8 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Japanese films have garnered numerous international awards and recognition...
            </motion.p>
            <motion.div className="flex justify-center space-x-8">
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  className="w-16 h-24 bg-yellow-500"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <motion.div
                    className="w-full h-8 bg-yellow-300"
                    animate={{
                      scaleY: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Section>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button 
          onClick={prevSection}
          className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
        >
          Previous
        </button>
        <button 
          onClick={nextSection}
          className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
        >
          Next
        </button>
      </motion.div>
    </div>
  );
};

export default JapaneseCinemaWebsite;
