import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../../../components/UserAvatar';

const Avatar = ({ item }) => {
  const { authorInfos } = item;
  const { authorImage } = authorInfos;

  const memberId = authorInfos.id;

  return (
    <Link params={{ memberId }}
      to={`/profil/${memberId}`}>
      <UserAvatar {...authorInfos}
        image={authorImage}
        sizeInPixels={40}
      />
    </Link>
  )
}

export default Avatar;