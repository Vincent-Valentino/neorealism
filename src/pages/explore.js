import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/explore/hero.jsx"
import Recommendation from "../components/explore/recommendation.jsx"
import Footer from "../components/explore/footer";

function Explore(){
  return(
    <div>
      <Navbar/>
      <Hero />
      <Recommendation />
      <Footer />
    </div>
  );
}

export default Explore;