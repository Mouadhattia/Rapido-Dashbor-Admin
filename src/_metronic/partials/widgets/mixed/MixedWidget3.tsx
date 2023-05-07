/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import clsx from 'clsx'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import axios from 'axios'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}
interface Order {
  id: number
  createdAt?: string
  fee?: number
  price?: number
  totalPrice?: string
}
const MixedWidget3: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  let apiUrl = process.env.REACT_APP_THEME_API_URL
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    axios.post(apiUrl + '/order/getAll').then((res) => setOrders(res.data.data))
  }, [])

  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  const today = orders.filter((order: any) => {
    const orderDate = new Date(order.createdAt)
    return (
      orderDate.getDate() === now.getDate() &&
      orderDate.getMonth() === now.getMonth() &&
      orderDate.getFullYear() === now.getFullYear()
    )
  })

  const ordersThisMonth = orders.filter((order: any) => {
    const orderDate = new Date(order.createdAt)
    return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
  })

  const feeToDay = today.reduce((total, order: any) => {
    return total + order.fee
  }, 0)
  const feeThisMounth = ordersThisMonth.reduce((total, order: any) => {
    return total + order.fee
  }, 0)

  const year = now.getFullYear() // get current year
  const months = Array.from({length: 12}, (_, i) => i) // create an array of month indices (0 to 11)

  const feesByMonth = months.map((monthIndex) => {
    const ordersForMonth = orders.filter((order: any) => {
      const orderMonth = new Date(order.createdAt).getMonth()
      const orderYear = new Date(order.createdAt).getFullYear()
      return orderMonth === monthIndex && orderYear === year
    })
    const feeForMonth = ordersForMonth.reduce((total, order: any) => {
      return total + order.fee
    }, 0)
    return feeForMonth
  })



  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, feesByMonth))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode, feesByMonth])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header  */}
      <div className={`card-header border-0 bg-${chartColor} py-5`}>
        <h3 className='card-title fw-bold text-white'>Revenu cette année</h3>
      </div>
      {/* end::Header  */}

      {/* begin::Body  */}
      <div className='card-body p-0'>
        {/* begin::Chart  */}
        <div
          ref={chartRef}
          className={`mixed-widget-12-chart card-rounded-bottom bg-${chartColor}`}
        ></div>
        {/* end::Chart  */}

        {/* begin::Stats  */}
        <div className='card-rounded bg-body mt-n10 position-relative card-px py-15'>
          {/* begin::Row  */}
          <div className='row g-0 mb-7'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-400'>Nombre de commande aujourd'hui</div>
              <div className='fs-2 fw-bold text-gray-800'>{today.length}</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-400'>Nombre de commande cette mois</div>
              <div className='fs-2 fw-bold text-gray-800'>{ordersThisMonth.length}</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}

          {/* begin::Row  */}
          <div className='row g-0'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-400'>Revenu aujourd'hui</div>
              <div className='fs-2 fw-bold text-gray-800'>{feeToDay} Dt</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-gray-400'>Revenu cette mois</div>
              <div className='fs-2 fw-bold text-gray-800'>{feeThisMounth} Dt</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}
        </div>
        {/* end::Stats  */}
      </div>
      {/* end::Body  */}
    </div>
  )
}

const chartOptions = (chartHeight: string, feesByMonth: any): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')

  return {
    series: [
      {
        name: 'Bénéfice net',
        data: [...feesByMonth],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'jan',
        'fev',
        'mars',
        'avril',
        'mai',
        'juin',
        'juill',
        'aout',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 18,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: ['solid', 'solid'],
      opacity: [0.25, 1],
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ' Dt'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['#ffffff', '#ffffff'],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
        right: 20,
      },
    },
  }
}

export {MixedWidget3}
