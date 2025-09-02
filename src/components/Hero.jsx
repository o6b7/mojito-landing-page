import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef();
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const [videoLoaded, setVideoLoaded] = useState(false);

    useGSAP(() => {
        if (!videoLoaded) return;

        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 1,
        });

        // Scroll effects
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200, x: 200, rotate: 5, scale: 1.05 }, 0)
            .to('.left-leaf', { y: 400, x: -200, rotate: -5, scale: 1.05 }, 0);


        // Video scrubbing
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '150% top' : 'bottom top';

        gsap.to(videoRef.current, {
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
                onUpdate: self => {
                    videoRef.current.currentTime = videoRef.current.duration * self.progress;
                }
            }
        });

        // Modified: Sticky video that stays at the end
        gsap.to(".video", {
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom top",
                end: "+=100%",
                scrub: true,
                pin: true,
                pinSpacing: false
            }
        });

    }, [videoLoaded]);

    const handleVideoLoad = () => {
        setVideoLoaded(true);
        videoRef.current?.pause();
    };

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left leaf"
                    className="left-leaf"
                />
                <img
                    src="/images/hero-right-leaf.png"
                    alt="right leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the spirit <br />
                                of the summer
                            </p>
                        </div>

                        <div className="view-menu">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>

                            <a href="#menu">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modified: Video container with position fixed to stay visible */}
            <div className="video fixed inset-0 before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:z-10 z-0">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleVideoLoad}
                />
            </div>
        </>
    );
};

export default Hero;