/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
  items?: number
}
interface Product {
  id: number
  name?: string
  rate?: number
  periorty?: number
  img?: string
  resName: string
  desc?: string
  price: number
}

const ListsWidget4: React.FC<Props> = ({className, items = 6}) => {
  let apiUrl = process.env.REACT_APP_THEME_API_URL
  const [prodcuts, setProducts] = useState<Product[]>([])
  useEffect(() => {
    axios.post(apiUrl + '/product/getAll').then((res) => setProducts(res.data.data))
  }, [])

  return (
    <div className='card card-xl-stretch mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Meilleur produits</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            {'Plus de ' + prodcuts.length + ' produits'}
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {prodcuts
          .sort((a: any, b: any) => a.priority - b.priority)
          .slice(0, 6)
          .map((prod) => (
            <div key={prod.id} className='d-flex align-items-sm-center mb-7'>
              {/* begin::Symbol */}
              <div className='symbol symbol-50px me-5'>
                <span className='symbol-label'>
                  <img src={prod.img} className='h-50 align-self-center' alt='' />
                </span>
              </div>
              {/* end::Symbol */}
              {/* begin::Section */}
              <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
                <div className='flex-grow-1 me-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                    {prod.name}
                  </a>
                  <span className='text-muted fw-semibold d-block fs-7'>{prod.desc}</span>
                </div>
                <span className='badge badge-light fw-bold my-2'>{prod.price} DT</span>
              </div>
              {/* end::Section */}
            </div>
          ))}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget4}
