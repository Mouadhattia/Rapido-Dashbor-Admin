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
    Header: (props) => <UserCustomHeader tableProps={props} title='Nom' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='priorité' className='min-w-125px' />
    ),
    accessor: 'priority',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='catégorie' className='min-w-125px' />
    ),
    accessor: 'catName',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='taux' className='min-w-125px' />,
    accessor: 'rate',
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