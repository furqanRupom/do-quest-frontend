import * as React from 'react';
import LogoIcon from './LogoIcon';
import Link from 'next/link';



const Logo: React.FunctionComponent = () => {
  return <Link href='/'>
    <div className=' font-bold text-2xl space-x-3 inline-flex items-center '>
      <LogoIcon />
      <h3 className='pt-2'>Do<span className='text-primary'>.</span><span>Quest</span></h3>

    </div>
  </Link>;
};

export default Logo;
