"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, X } from 'lucide-react';

const Offer: React.FunctionComponent = () => {
    const [isVisible, setIsVisible] = React.useState<boolean>(true);

    React.useEffect(() => {
        // Check if offer was previously closed
        const offerClosed = window.localStorage.getItem('offer-banner-closed');
        if (offerClosed === 'true') {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Store in localStorage so it never appears again
        window.localStorage.setItem('offer-banner-closed', 'true');
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className='bg-emerald-500 text-secondary text-center p-3 flex items-center justify-between'>
            <div className='flex-1 flex items-center justify-center gap-2'>
                <Gift className="h-5 w-5" />
                <span className="font-medium">
                    🎉 Limited Time: Get 50% OFF on all premium plans - Use code SAVE50
                </span>
            </div>

            <Button
                size="icon"
                variant="ghost"
                className="text-secondary hover:bg-emerald-400/20 flex-shrink-0"
                onClick={handleClose}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Offer;