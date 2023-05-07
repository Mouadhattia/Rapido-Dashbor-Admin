/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

interface Resto {
  id: number
  name?: string
  rate?: number
  priority?: number
  img?: string
}
interface Product {
  id: number
  name?: string
  rate?: number
  periorty?: number
  img?: string
  resName: string
}

const ListsWidget9: React.FC<Props> = ({className}) => {
  let apiUrl = process.env.REACT_APP_THEME_API_URL
  const [resto, setResto] = useState<Resto[]>([])
  const [prodcuts, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios.post(apiUrl + '/restaurant/getAllRes').then((res) => setResto(res.data.data))
    axios.post(apiUrl + '/menu/getAll').then((res) => setProducts(res.data.data))
  }, [])

  return (
    <div className={clsx('card', className)}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-3'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Meilleur restaurant</span>
          <span className='text-gray-400 mt-2 fw-bold fs-6'>
            {'Plus de ' + resto.length + ' restaurants'}
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {resto
          .sort((a: any, b: any) => a.priority - b.priority)
          .slice(0, 5)
          .map((res) => (
            <div key={res.id} className='d-flex mb-7'>
              {/*begin::Symbol*/}
              <div className='symbol symbol-60px symbol-2by3 flex-shrink-0 me-4'>
                <img src={res.img} className='mw-100' alt='' />
              </div>
              {/*end::Symbol*/}
              {/*begin::Section*/}
              <div className='d-flex align-items-center flex-wrap flex-grow-1 mt-n2 mt-lg-n1'>
                {/*begin::Title*/}
                <div className='d-flex flex-column flex-grow-1 my-lg-0 my-2 pe-3'>
                  <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                    {res.name}
                  </a>
                  {/* <span className='text-gray-400 fw-bold fs-7 my-1'>Study highway types</span> */}
                  <span className='text-gray-400 fw-bold fs-7'>
                    Par
                    <a href='#' className='text-primary fw-bold'>
                      {' '}
                      Rapido
                    </a>
                  </span>
                </div>

                <div className='text-end py-lg-0 py-2'>
                  <span className='text-gray-800 fw-boldest fs-3'>
                    {prodcuts.filter((e) => e.resName === res.name).length}
                  </span>
                  <span className='text-gray-400 fs-7 fw-bold d-block'>
                    {prodcuts.filter((e) => e.resName === res.name).length <= 1 ? 'Menu' : 'Menus'}
                  </span>
                </div>
                {/*end::Info*/}
              </div>
              {/*end::Section*/}
            </div>
          ))}
        {/*begin::Item*/}

        {/*end::Item*/}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListsWidget9}
