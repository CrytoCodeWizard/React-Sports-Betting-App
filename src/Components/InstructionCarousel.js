import React from 'react';
import { Carousel, Typography } from "@material-tailwind/react";
import slide1 from'./../Images/Instructions/slide-1.png';
import slide2 from'./../Images/Instructions/slide-2.png';
import slide3 from'./../Images/Instructions/slide-3.png';
import slide4 from'./../Images/Instructions/slide-4.png';
import slide5 from'./../Images/Instructions/slide-5.png';
import slide6 from'./../Images/Instructions/slide-6.png';
import slide7 from'./../Images/Instructions/slide-7.png';
import slide8 from'./../Images/Instructions/slide-8.png';
import slide1_small from'./../Images/Instructions/slide-1-small.png';
import slide2_small from'./../Images/Instructions/slide-2-small.png';
import slide3_small from'./../Images/Instructions/slide-3-small.png';
import slide4_small from'./../Images/Instructions/slide-4-small.png';
import slide5_small from'./../Images/Instructions/slide-5-small.png';
import slide6_small from'./../Images/Instructions/slide-6-small.png';
import slide7_small from'./../Images/Instructions/slide-7-small.png';
import slide8_small from'./../Images/Instructions/slide-8-small.png';


const InstructionCarousel = (size) => {

    const slides = [
        {
            slide: (size.size === "big" ? slide1 : slide1_small),
            instruction: "Select an option in the Navigation Bar to view matches for a particular sport."
        },
        {
            slide: (size.size === "big" ? slide2 : slide2_small),
            instruction: "The \"State\" dropdown allows you to view sportsbooks legally operating in your location. Select the \"All\" option to view all supported sportsbooks."
        },
        {
            slide: (size.size === "big" ? slide3 : slide3_small),
            instruction: "The search bar allows you to filter by match names. For example, if you wanted to view props for a New York Jets game, you'd search \"Jets\" or \"NYJ\"."
        },
        {
            slide: (size.size === "big" ? slide4 : slide4_small),
            instruction: "The \"Team Props\" button on a game card will allow you to toggle seeing upcoming & live lines for team-related props, such as moneyline, spreads, and totals."
        },
        {
            slide: (size.size === "big" ? slide5 : slide5_small),
            instruction: "The \"Player Props\" button on a game card will allow you to toggle seeing upcoming lines for player-related props, which vary depending on the sport. Appears when event is within 2 days."
        },
        {
            slide: (size.size === "big" ? slide6 : slide6_small),
            instruction: "The \"Sort For\" dropdown allows you to specify the side of the line you are interested in (Ex: Over vs. Under), showing you the best options based on your choice."
        },
        {
            slide: (size.size === "big" ? slide7 : slide7_small),
            instruction: "The list items with gold medal icons on them represent the best line of the available sportsbooks for the particular prop and sorting choice."
        },
        {
            slide: (size.size === "big" ? slide8 : slide8_small),
            instruction: "This toggle will allow you to limit your view to only see the best options for a given prop."
        }
    ]

    return (
        <Carousel className="rounded-xl">
            {slides.map((slide, index) => (
            <figure data-testid="slide" className="relative h-full w-full mb-2" key={"slide " + index}>
                <img
                    className="h-full w-full rounded-xl"
                    src={slide.slide}
                    alt={"slide " + index}
                />
                <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm mb-2">
                    <div>
                        <Typography variant="paragraph" color="blue-gray">
                            {slide.instruction}
                        </Typography>
                    </div>
                </figcaption>
            </figure>
            ))}
        </Carousel>
    );
};

export default InstructionCarousel;