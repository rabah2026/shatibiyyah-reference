'use client';

import { useRouter } from 'next/navigation';
import { useRef, ReactNode } from 'react';

interface SwipeNavigatorProps {
    children: ReactNode;
    prevUrl: string | null;
    nextUrl: string | null;
}

export default function SwipeNavigator({ children, prevUrl, nextUrl }: SwipeNavigatorProps) {
    const router = useRouter();
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // RTL: Swipe left = next (go forward), Swipe right = previous (go back)
        if (isLeftSwipe && nextUrl) {
            router.push(nextUrl);
        } else if (isRightSwipe && prevUrl) {
            router.push(prevUrl);
        }

        // Reset
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="min-h-screen"
        >
            {children}
        </div>
    );
}
