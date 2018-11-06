import React from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

const Header = ({ title, handlePrev, chevronLeft }) => (
    <div className='form-header'>
        {chevronLeft &&
            <div onClick={handlePrev} className='prev-button'>
                <ChevronLeft />
            </div>
        }
        <div>
            <h3>{title}</h3>
            <hr />
        </div>
    </div>
)

export default Header;