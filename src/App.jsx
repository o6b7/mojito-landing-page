import React from 'react'
import {ScrollTrigger, SplitText} from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Hero from './components/Hero.jsx';
import Menu from './components/Menu.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main className="App">
            <Navbar />
            <Hero />
            <Menu />
        </main>
    )
}

export default App;