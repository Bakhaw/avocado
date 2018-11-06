import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import Gravatar from 'react-gravatar';

const Header = ({ item }) => {

    const { authorImage, displayName, email, id } = item.authorInfos;
    const { date, title } = item.recetteInfos;

    const avatar =
        <Tooltip title={displayName} placement='top' id='recette-card-tooltip'>
            {authorImage !== 'none'
                ? <img src={authorImage} alt='Image de profil' />
                : <Gravatar email={email} />
            }
        </Tooltip>

    console.log(item.authorInfos);

    return (
        <CardHeader
            avatar={
                <Link params={{ memberId: id }}
                    to={`/profil/${id}`}>
                    {avatar}
                </Link>
            }
            title={<h4>{title}</h4>}
            subheader={date}
            className='card-title'
        />
    )
}

export default Header;