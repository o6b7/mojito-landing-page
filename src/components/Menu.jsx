import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {cocktailLists} from "../../constants/index.js";

const Menu = () => {

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top 30%',
                end: 'bottom 80%',
                scrubber: true,
            }
        })


        parallaxTimeline
            .from('#c-left-leaf', {
                x: -100,
                y: 100,
            })
            .from('#c-right-leaf', {
                x: 100,
                y: 100,
            })

    }, [])

    return (
        <>
            <section id="menu" className="noisy relative">

                <img src="/images/cocktail-left-leaf.png" alt="left leaf" id="c-left-leaf" className="top-0 lg:top-125 md:top-153"/>
                <img src="/images/cocktail-right-leaf.png" alt="right leaf" id="c-right-leaf" className="top-0 lg:top-125 md:top-153"/>

                <div className="list relative z-10 mt-7">
                    <div className="popular">
                        <h2>Most popular items:</h2>

                        <ul>
                            {cocktailLists.map(({name, country, detail, price}) => (
                                <li key={name}>
                                    <div className="me-28">
                                        <h3>{name}</h3>
                                        <p>{country} | {detail}</p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="loved">
                        <h2>Most loved items:</h2>

                        <ul>
                            {cocktailLists.map(({name, country, detail, price}) => (
                                <li key={name}>
                                    <div className="me-28">
                                        <h3>{name}</h3>
                                        <p>{country} | {detail}</p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Menu;