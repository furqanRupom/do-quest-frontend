import * as React from 'react';
import { Button } from '../ui/button';
import { Plus, Search } from 'lucide-react';



const Hero: React.FunctionComponent = () => {
    return (
        <main className='min-h-[500px] bg-white'>
            <div className='max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center'>
                {/* Title and subtitle */}
                <div className='mb-10 max-w-4xl'>
                    <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
                        The Best Platform for
                        <span className='text-primary'> Bounties </span>
                        and
                        <span className='text-primary'> Quests</span>
                    </h1>
                    <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed'>
                        Discover exciting opportunities, complete challenging tasks, and earn rewards.
                        Join thousands of creators and solvers in the ultimate bounty marketplace.
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 mb-12'>
                    <Button size="lg" className=''>
                        <Search className="mr-2 h-5 w-5" />
                        Browse Quests
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className='cursor-pointer '
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Post New Bounty
                    </Button>
                </div>

              
            </div>
        </main>
    );
};

export default Hero;