import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';

import UserAvatar from '../../components/UserAvatar';

const Header = ({ item }) => {

    const { authorImage, displayName, email, id } = item.authorInfos;
    const { date, title } = item.recetteInfos;

    return (
        <CardHeader
            avatar={
                <Link params={{ memberId: id }}
                    to={`/profil/${id}`}>
                    <UserAvatar {...item.authorInfos} image={authorImage}/>
                </Link>
            }
            title={<h4>{title}</h4>}
            subheader={date}
            className='card-title'
        />
    )
}

export default Header;