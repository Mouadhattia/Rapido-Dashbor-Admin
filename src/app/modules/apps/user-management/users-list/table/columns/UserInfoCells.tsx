import {FC} from 'react'
import {formatDate} from '../../../../../../../_metronic/helpers'

import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCells: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a className='text-gray-800 text-hover-primary mb-1'>{formatDate(user.createdAt)}</a>
    </div>
  </div>
)

export {UserInfoCells}
