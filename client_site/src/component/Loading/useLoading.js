import { useEffect, useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an async operation (e.g., fetching data)
        setTimeout(() => {
            setIsLoading(false); // Set isLoading to false when loading is complete
        }, 2000); // Simulate a 2-second loading delay
    }, []);

    return isLoading;
};

export default useLoading;
