import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
// import {UserLastLoginCell} from './UserLastLoginCell'
// import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='commentaire' className='min-w-125px' />
    ),
    accessor: 'comment',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='rate' className='text-end min-w-100px' />
    ),
    accessor: 'rate',
  },
]

export {usersColumns}
