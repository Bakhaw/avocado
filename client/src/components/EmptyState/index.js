import React from 'react';
import EmptyStateImg from '../../assets/images/states-illustrations/empty-state.svg';

const EmptyState = ({ text }) => {
    return (
        <div className='empty-state'>
            <p className='empty-state__text'>{text}</p>
            <img alt='Pas de contenu ici ...'
                className='empty-state__image'
                src={EmptyStateImg} />
        </div>
    )
}

export default EmptyState;