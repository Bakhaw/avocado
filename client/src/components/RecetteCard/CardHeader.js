import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import UserAvatar from '../../components/UserAvatar';

const Header = ({ item }) => {

    const { _id, authorInfos, recetteInfos } = item;
    const { authorImage } = authorInfos;
    const { date, title } = recetteInfos;

    const memberId = authorInfos.id;
    const recetteId = _id;

    const header = {
        avatar:
            <Link params={{ memberId }}
                to={`/profil/${memberId}`}>
                <UserAvatar {...item.authorInfos}
                    image={authorImage}
                    sizeInPixels={40}
                />
            </Link>,
        title: 
            <Link params={{ recetteId }}
                to={`/recettes/${recetteId}`}>
                <Typography variant='title'>{title}</Typography>
            </Link>

    }

    return (
        <CardHeader
            avatar={header.avatar}
            title={header.title}
            subheader={date}
            className='card-title'
        />
    )
}

export default Header;