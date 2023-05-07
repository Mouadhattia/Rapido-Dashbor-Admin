/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    {/* <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {user.img ? (
          <div className='symbol-label'>
            <img src={user.img} alt='img' className='w-100' />
          </div>
        ) : (
          <div className={clsx('symbol-label fs-3', `bg-light-`, `text-`)}></div>
        )}
      </a>
    </div> */}
    <div className='d-flex flex-column'></div>
  </div>
)

export {UserInfoCell}
