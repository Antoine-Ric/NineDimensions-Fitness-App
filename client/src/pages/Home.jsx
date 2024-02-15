import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Planning from "../components/Planning";

const Home = () => {
    return (
        <div className="home-container">
            <Hero />
            <Planning />
            <Footer />
        </div>
    )
}

export default Home;