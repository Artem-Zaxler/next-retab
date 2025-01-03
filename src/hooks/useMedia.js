import { useEffect, useState } from 'react';

const useMedia = () => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 480px)');
        const updateMatches = () => setMatches(mediaQueryList.matches);

        updateMatches();

        mediaQueryList.addEventListener('change', updateMatches);

        return () => {
            mediaQueryList.removeEventListener('change', updateMatches);
        };
    }, []);

    const isMobile = matches;

    return {isMobile};
};

export default useMedia;
