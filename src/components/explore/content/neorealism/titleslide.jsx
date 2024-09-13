import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

const slideVariants = {
  hidden: { opacity: 0, x: -100 },  // Initial state: hidden and slightly off-screen
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },  // Final state: visible and in place
};

const TitleSlide = () => (
  <motion.div
    className="flex flex-col items-center justify-center h-full text-white texture"
    initial={{ scale: 1 }}
    animate={{ scale: 1.05 }}
    transition={{ duration: 10, ease: "easeInOut" }} // Slow zoom on the whole section
  >
    {/* Main Title Animation */}
    <motion.h1
      className="text-6xl font-bold mb-8 text-stone-100 shadow-white shadow-2xl text-center leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}  // 1.5s fade and slide up
    >
      Italian Neorealism:<br />A Cinematic Revolution
    </motion.h1>

    <div className="relative w-3/4 h-1/2">
      {/* Image Zoom Animation */}
      <motion.img
        src="../explore/neorealism.jpeg"
        alt="Classic neorealist film still"
        className="w-full h-full object-cover rounded-lg shadow-2xl"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}  // Slight zoom effect
        transition={{ duration: 8, ease: "easeInOut" }}
      />

      {/* Subtitle Animation */}
      <motion.h2
        className="absolute bottom-4 left-4 text-3xl text-stone-950 italic"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}  // Delay to match main title animation
      >
        Capturing the Essence of Post-War Italy
      </motion.h2>

      <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
    </div>
  </motion.div>
);

const HistoricalContextSlide = () => (
  <div className="grid grid-cols-2 h-full text-white bg-gray-800">
    {/* Left Side: Text Block */}
    <motion.div
      className="flex flex-col justify-center p-8"
      initial={{ opacity: 0, y: 50 }}  // Start hidden and slightly below
      animate={{ opacity: 1, y: 0 }}   // Fade in and slide up
      transition={{ duration: 1.5 }}   // Animation lasts 1.5 seconds
    >
      <h2 className="text-4xl font-bold mb-6">The Birth of Neorealism</h2>
      <p className="text-xl">
        Italian Neorealism emerged as a cinematic movement in the aftermath of World War II, born out of a desire to portray the stark realities of Italian society. The country was ravaged by war, its people grappling with poverty, unemployment, and social upheaval. Traditional Italian cinema, with its focus on escapism and lavish productions, seemed out of touch with these harsh realities.
        Neorealist filmmakers sought to break free from these conventions, embracing a new aesthetic rooted in authenticity. They abandoned studio sets in favor of real locations, cast non-professional actors to capture the essence of everyday life, and tackled social issues with unflinching honesty. This raw, documentary-like approach, coupled with their focus on the struggles of ordinary people, distinguished Neorealism from anything that had come before.
      </p>
    </motion.div>

    {/* Right Side: Image Block */}
    <div className="relative">
      {/* Image with Zoom-in Animation */}
      <motion.img
        src="../explore/neorealism-2.webp"
        alt="War-torn Italian cityscape"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 0.99 }} // Slow zoom effect
        transition={{ duration: 8, ease: "circInOut" }} // Smooth zoom over 8 seconds
      />

      {/* Overlay Fade-in */}
      <motion.div
        className="absolute inset-0 bg-black opacity-40"
        initial={{ opacity: 0 }}  // Start fully transparent
        animate={{ opacity: 0.4 }}  // Fade into 40% opacity
        transition={{ duration: 2 }}  // Fade in over 2 seconds
      />
    </div>
  </div>
);

const KeyCharacteristicsSlide = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      title: "Location shooting in real settings",
      description: "Neorealist films abandoned artificial studio sets, opting to shoot on location in war-torn cities, rural villages, and bustling streets. This grounded the films in reality, immersing the viewer in the actual environment experienced by the characters."
    },
    {
      title: "Use of non-professional actors",
      description: "Neorealist directors often cast non-professional actors to capture authenticity, blurring the line between fiction and reality."
    },
    {
      title: "Focus on everyday struggles",
      description: "Neorealist films portrayed the struggles of ordinary people, focusing on unemployment, poverty, and the search for basic necessities."
    },
    {
      title: "Social and political commentary",
      description: "Neorealist films often tackled social and political issues, critiquing the status quo and advocating for social change."
    },
    {
      title: "Documentary-style aesthetics",
      description: "Neorealist films used handheld cameras, natural lighting, and long takes to create a documentary-like aesthetic."
    },
    {
      title: "Emphasis on humanism",
      description: "At its core, Neorealism was a humanist movement that portrayed the inherent dignity and resilience of ordinary people."
    }
  ];

  const row1Variants = {
    animate: {
      x: [0, 300],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  const row2Variants = {
    animate: {
      x: [0, -300],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gradient-to-r from-yellow-200 via-green-200 to-green-300 p-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Defining Features of Neorealist Cinema</h2>

      <div className="w-full">
        <div className="relative mb-16">
          <motion.div
            className="flex justify-center space-x-4"
            variants={row1Variants}
            animate="animate"
          >
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="relative">
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-md text-center flex items-center justify-center w-64 h-32 cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <p className="text-lg font-semibold">{feature.title}</p>
                </motion.div>
                {hoveredFeature === index && (
                  <motion.div
                    className="absolute bottom-full left-0 w-64 bg-white text-black p-4 rounded-lg shadow-xl mb-2 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm">{feature.description}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-16">
          <motion.div
            className="flex justify-center space-x-4"
            variants={row2Variants}
            animate="animate"
          >
            {features.slice(3, 6).map((feature, index) => (
              <div key={index + 3} className="relative">
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-md text-center flex items-center justify-center w-64 h-32 cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(index + 3)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <p className="text-lg font-semibold">{feature.title}</p>
                </motion.div>
                {hoveredFeature === index + 3 && (
                  <motion.div
                    className="absolute top-full left-0 w-64 bg-white text-black p-4 rounded-lg shadow-xl mt-2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm">{feature.description}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const LandmarkFilmsSlide = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      const filmIds = ['66dd34f7b64ec4711af84da0', '66dd3529b64ec4711af84da2', '66dd354ab64ec4711af84da4', '66dd356fb64ec4711af84da6'];
      const filmPromises = filmIds.map(id => 
        fetch(`http://localhost:4000/api/movies/${id}`).then(res => res.json())
      );
      const fetchedFilms = await Promise.all(filmPromises);
      setFilms(fetchedFilms);
    };
    fetchFilms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 bg-opacity-90 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Masterpieces of Italian Neorealism</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {films.map(film => (
              <div 
                key={film._id} 
                className="bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all"
                onClick={() => setSelectedFilm(film)}
              >
                <h3 className="text-xl font-semibold">{film.data.title}</h3>
                <p>Director: {film.data.director}</p>
              </div>
            ))}
          </div>
          <div className="bg-black bg-opacity-30 p-6 rounded-lg">
            {selectedFilm ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedFilm.title}</h2>
                <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center">
                  <video src='yourname.mp4' size={48} />
                  <span className="ml-2">Trailer would play here</span>
                </div>
                <p className="text-sm mb-2">Director: {selectedFilm.data.director}</p>
                <p className="text-sm mb-4">Writer: {selectedFilm.data.writer}</p>
                <p className="italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </p>
              </>
            ) : (
              <p className="text-center text-xl">Select a film to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImpactLegacySlide = () => (
  <div className="flex h-full text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
    <div className="w-1/2 flex flex-col justify-center p-8">
      <h2 className="text-4xl font-bold mb-6">Neorealism's Influence on World Cinema</h2>
      <ul className="list-disc pl-6 text-xl space-y-4">
        <li>Profound impact on global filmmaking</li>
        <li>Inspired French New Wave, British social realism, and Indian Parallel Cinema</li>
        <li>Continues to influence modern cinema</li>
      </ul>
    </div>
    <div className="w-1/2 grid grid-cols-2 gap-4 p-8">
      <img src="/api/placeholder/400/300" alt="French New Wave" className="rounded-lg shadow-lg" />
      <img src="/api/placeholder/400/300" alt="British social realism" className="rounded-lg shadow-lg" />
      <img src="/api/placeholder/400/300" alt="Indian Parallel Cinema" className="rounded-lg shadow-lg" />
      <img src="/api/placeholder/400/300" alt="Modern influenced cinema" className="rounded-lg shadow-lg" />
    </div>
  </div>
);

const NeorealismDeclineSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-white bg-gradient-to-br from-red-900 to-black">
    <h2 className="text-4xl font-bold mb-8">The Fading of the Movement</h2>
    <div className="relative w-3/4 h-1/2 mb-8">
      <img src="/api/placeholder/800/400" alt="Symbolic image of decline" className="w-full h-full object-cover rounded-lg shadow-2xl" />
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
    </div>
    <ul className="list-disc pl-6 text-xl w-3/4">
      <li>Decline of neorealism in the late 1950s</li>
      <li>Factors: Economic recovery, changing tastes, censorship, and new film movements</li>
    </ul>
  </div>
);

const ConclusionSlide = () => (
  <div className="grid grid-cols-3 h-full text-white bg-gradient-to-r from-green-800 via-blue-900 to-purple-900">
    <div className="col-span-2 flex flex-col justify-center p-8">
      <h2 className="text-5xl font-bold mb-8">Italian Neorealism: An Enduring Legacy</h2>
      <ul className="list-disc pl-6 text-2xl space-y-6">
        <li>Enduring significance in film history</li>
        <li>Humanistic portrayal of the human condition</li>
        <li>Reminder of cinema's power to reflect and shape society</li>
      </ul>
    </div>
    <div className="relative">
      <img src="/api/placeholder/600/800" alt="Powerful neorealist film image" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  </div>
);

export { TitleSlide, HistoricalContextSlide, KeyCharacteristicsSlide, LandmarkFilmsSlide, ImpactLegacySlide, NeorealismDeclineSlide, ConclusionSlide };