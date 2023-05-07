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
    getBuyer({name: user.userName}).then((res: any) =>
      setClient({name: res.userName, phone: res.phone})
    )
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

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${user.path.to.long}%2C${user.path.to.lat}%2C${user.path.to.long}%2C${user.path.to.lat}&marker=${user.path.to.lat}%2C${user.path.to.long}&layer=mapnik`
  return (
    <>
      <div>
        <h3>numéro de commande: {user.id}</h3>
        <h4>Articles:</h4>
        <ul>
          {user.items.map((item: any) => (
            <li key={item.id}>
              <b>
                {' '}
                {item.qty} x {item.product.name} - {item.product.price} Dt{' '}
              </b>
              {item.product.supplment.length !== 0 && (
                <div>
                  <b>Supplément:</b>
                  {item.product.supplment.map((supp: any, key: ID) => (
                    <li key={key}>
                      <b>
                        {supp.name} {'(' + supp.price + ')'}
                      </b>
                    </li>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <h5>Prix: {user.price} Dt</h5>
          <h5>Frais: {user.fee} Dt</h5>
          <h5>Prix ​​total: {user.totalPrice} Dt</h5>
          <h5>Commentaire : {user.comment}</h5>
        </div>
        <h5>Restaurant : {user.resName}</h5>
        <div>
          <h5>date: {formatDate(user.createdAt)}</h5>
          <h5>Statut: {user.status === 'pending' ? 'en cours' : 'confirmé'}</h5>
          <h5>Nom de client: {client?.name}</h5>
          <h5>Numéro de client: {client?.phone}</h5>
          <iframe
            width='100%'
            height='300'
            frameBorder='0'
            style={{border: 0}}
            src={src}
            allowFullScreen
          />
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
