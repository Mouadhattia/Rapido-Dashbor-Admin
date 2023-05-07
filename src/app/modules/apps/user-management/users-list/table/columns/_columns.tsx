import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
// import {UserLastLoginCell} from './UserLastLoginCell'
// import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import { UserInfoCells } from './UserInfoCells'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Nom' className='min-w-125px' />,
    id: 'fullname',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='user Name' className='min-w-125px' />
    ),
    accessor: 'userName',
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='addresse' className='min-w-125px' />
    ),
    accessor: 'address',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='date de naissance' className='min-w-125px' />
    ),
    accessor: 'birthDay',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='genre' className='min-w-125px' />
    ),
    accessor: 'gender',
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
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
