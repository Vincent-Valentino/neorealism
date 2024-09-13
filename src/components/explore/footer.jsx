import React from 'react';
import TextA from '../../utilities/textanimation';

function Footer(){
  return(
    <div className='flex justify-center mx-auto w-full h-[30vh] items-center bg-charcoal'>
      <TextA size={"text-3xl text-blue-100 text-center"} text={"Cinema is Art"} />
    </div>
  );
}

export default Footer;