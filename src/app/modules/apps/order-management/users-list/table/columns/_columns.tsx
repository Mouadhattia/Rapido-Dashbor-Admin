import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
// import {UserLastLoginCell} from './UserLastLoginCell'
// import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {UserInfoCells} from './UserInfoCells'
import {UserStatusCell} from './UserStatusCell'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Prix' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='frais' className='min-w-125px' />
    ),
    accessor: 'fee',
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Prix totale' className='min-w-125px' />
    ),
    accessor: 'totalPrice',
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='créé à' className='min-w-125px' />
    ),
    id: 'createdAt',
    Cell: ({...props}) => <UserInfoCells user={props.data[props.row.index]} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='statut' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <UserStatusCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
