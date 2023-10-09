import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const WithLoading = (WrappedComponent) => {
    return function WithLoading(props) {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Simulate an async operation (e.g., fetching data)
            setTimeout(() => {
                setIsLoading(false); // Set isLoading to false when loading is complete
            }, 2000); // Simulate a 2-second loading delay
        }, []);

        return isLoading ? <LoadingSpinner /> : <WrappedComponent {...props} />;
    };
};

export default WithLoading;
