import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Offer from '@/components/shared/Offer';
import { getUserInfo } from '@/services/auth.service';


import * as React from 'react';

interface IHomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = async ({ children }) => {
     const user = await getUserInfo()
     return <main>
        <Offer />
        <Navbar profile={user} />
        {children}
        <Footer />
    </main>;
};

export default HomeLayout;
