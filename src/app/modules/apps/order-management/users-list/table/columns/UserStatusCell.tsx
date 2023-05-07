import {FC} from 'react'

import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserStatusCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.status === 'pending' ? 'en cours' : 'confirmé'}
      </a>
    </div>
  </div>
)

export {UserStatusCell}
