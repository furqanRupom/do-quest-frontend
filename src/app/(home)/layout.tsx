import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Offer from '@/components/shared/Offer';
import QueryProviders from '@/providers/QueryProvider';

import * as React from 'react';

interface IHomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = ({ children }) => {
    return <main>
        <Offer />
        <Navbar />
        <QueryProviders>{children}</QueryProviders>
        <Footer />
    </main>;
};

export default HomeLayout;
