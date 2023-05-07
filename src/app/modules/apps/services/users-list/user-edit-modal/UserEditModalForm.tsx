import {FC, useEffect, useState} from 'react'

import {formatDate, ID} from '../../../../../../_metronic/helpers'
import {User} from '../core/_models'

import {useListView} from '../core/ListViewProvider'

import {getBuyer, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: User
}

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }
  const [client, setClient] = useState<any>()
  useEffect(() => {
    getBuyer(user.userId).then((res: any) => setClient({name: res.userName, phone: res.phone}))
  }, [])

  const updateOrder = (id: ID, withRefresh?: boolean) => {
    try {
      updateUser({id: id, status: 'confirmed'})
    } catch (error) {
      console.log(error)
    } finally {
      if (withRefresh) {
        refetch()
      }
      refetch()
      setItemIdForUpdate(undefined)
    }
  }

  // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  // const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  return (
    <>
      <div>
        <h3>numéro de commande: {user.id}</h3>
        <h4>Articles:</h4>
        <ul>
          {user.items.map((item: any) => (
            <li key={item.id}>
              <b> {item.name}</b>
            </li>
          ))}
        </ul>

        <div>
          <h5>date: {formatDate(user.createdAt)}</h5>
          <h5>Statut: {user.status === 'pending' ? 'En cours' : 'Confirmé'}</h5>
          <h5>Nom de client: {client?.name}</h5>
          <h5>Numéro de client: {client?.phone}</h5>
        </div>
      </div>
      <div className='text-center pt-15'>
        <button
          type='reset'
          onClick={() => cancel()}
          className='btn btn-light me-3'
          data-kt-users-modal-action='cancel'
        >
          Annuler
        </button>

        <button
          type='submit'
          className='btn btn-primary'
          data-kt-users-modal-action='submit'
          onClick={() => updateOrder(user.id)}
        >
          <span className='indicator-label'>Confirmer</span>
        </button>
      </div>
    </>
  )
}

export {UserEditModalForm}
