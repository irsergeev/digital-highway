import React, { useState } from 'react';

const MAX_SMALL_SCREEN_SIZE : number = 950;
const MIN_BIG_SCREEN_SIZE : number = 1921;

export const useResponsive = () => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [isBigScreen, setIsBigScreen] = useState<boolean>(false);
    const [windowHeight, setWindowHeight] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.matchMedia(`(max-width: ${MAX_SMALL_SCREEN_SIZE}px)`).matches);
            setIsBigScreen(window.matchMedia(`(min-width: ${MIN_BIG_SCREEN_SIZE}px)`).matches);

            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
            
            // console.log('width: ', window.innerWidth);
            // console.log('height: ', window.innerHeight);
            // console.log('from component - is small screen? ', isSmallScreen);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return (() => { window.removeEventListener('resize', handleResize) });
    });

    return { isSmallScreen, isBigScreen, windowHeight, windowWidth };
}