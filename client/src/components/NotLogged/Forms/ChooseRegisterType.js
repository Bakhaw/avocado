import React from 'react';

import Button from '../../Button';
import Header from './Header';

const buttonsArray = [
  {
    href: '/auth/google',
    style: 'google',
    text: 'Google',
  },
  {
    href: '/auth/facebook',
    style: 'facebook',
    text: 'Facebook',
  },
  {
    href: '/auth/twitter',
    style: 'twitter',
    text: 'Twitter',
  },
  {
    href: '/auth/instagram',
    style: 'instagram',
    text: 'Instagram',
  },
  {
    href: '/auth/github',
    style: 'github',
    text: 'Github',
  },
  {
    href: '/auth/twitch',
    style: 'twitch',
    text: 'Twitch',
  },
];

const ChooseRegisterType = ({ handlePrev, handleNext }) => {
  return (
    <div className='choose-register-type'>
      <Header title='ENREGISTREZ VOUS AVEC' chevronLeft handlePrev={handlePrev} />
      <Button buttonText='Email' onClick={handleNext} />

      {buttonsArray.map((button, index) => {
        const { href, style, text } = button;
        return (
          <a key={index} href={href}>
            <Button buttonStyle={style} buttonText={text} />
          </a>
        )
      })}
    </div>
  );
}

export default ChooseRegisterType;