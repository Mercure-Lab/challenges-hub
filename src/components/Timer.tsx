import { useState, useEffect } from 'react';
import { formatDistanceStrict, parseISO } from 'date-fns';

const Timer = ({ targetDateTime }: { targetDateTime: string }) => {
    const [remainingTime, setRemainingTime] = useState('');

    const formatRemainingTime = (distanceInSeconds: number) => {
        const days = Math.floor(distanceInSeconds / (24 * 60 * 60));
        const hours = Math.floor((distanceInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((distanceInSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(distanceInSeconds % 60);

        return `${days}j ${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const updateRemainingTime = () => {
            const now = new Date();
            const targetDate = parseISO(targetDateTime);
            const distance = formatDistanceStrict(targetDate, now, {
                unit: 'second',
                roundingMethod: 'floor'
            });

            const distanceInSeconds = parseInt(distance, 10);

            setRemainingTime(formatRemainingTime(distanceInSeconds));
        };

        updateRemainingTime();
        const interval = setInterval(updateRemainingTime, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDateTime]);

    return <div>{remainingTime}</div>;
};

export default Timer;
