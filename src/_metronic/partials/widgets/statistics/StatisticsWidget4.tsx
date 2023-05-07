/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../helpers'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import clsx from 'clsx'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import axios from 'axios'

type Props = {
  className: string
  svgIcon: string
  color: string
  change: string
  description: string
}
interface Order {
  id: number
  createdAt?: string
  fee?: number
  price?: number
  totalPrice?: string
}

const StatisticsWidget4: React.FC<Props> = ({className, svgIcon, color, change, description}) => {
  let apiUrl = process.env.REACT_APP_THEME_API_URL
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    axios.post(apiUrl + '/order/getAll').then((res) => setOrders(res.data.data))
  }, [])

  const now = new Date()
  const year = now.getFullYear() // get current year
  const months = Array.from({length: 12}, (_, i) => i) // create an array of month indices (0 to 11)

  const feesByMonth = months.map((monthIndex) => {
    const ordersForMonth = orders.filter((order: any) => {
      const orderMonth = new Date(order.createdAt).getMonth()
      const orderYear = new Date(order.createdAt).getFullYear()
      return orderMonth === monthIndex && orderYear === year
    })
    const feeForMonth = ordersForMonth.reduce((total, order: any) => {
      return total + order.price
    }, 0)
    return feeForMonth
  })
  const pricePerYeras = feesByMonth.reduce((total, order: any) => {
    return total + order
  }, 0)

  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))
    const labelColor = getCSSVariableValue('--kt-gray-800')
    const baseColor = getCSSVariableValue('--kt-' + color)
    const lightColor = getCSSVariableValue('--kt-' + color + '-light')

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, labelColor, baseColor, lightColor, feesByMonth)
    )
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
  }, [chartRef, color, mode, feesByMonth])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        <div className='d-flex flex-stack card-p flex-grow-1'>
          <span className={clsx('symbol symbol-50px', `symbol-light-${color}`, 'me-2')}></span>

          <div className='d-flex flex-column text-end'>
            <span className='text-dark fw-bold fs-2'>{pricePerYeras} Dt</span>

            <span className='text-muted fw-semibold mt-1'>{description}</span>
          </div>
        </div>

        <div
          ref={chartRef}
          className='statistics-widget-4-chart card-rounded-bottom'
          style={{height: '150px'}}
        ></div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {StatisticsWidget4}

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string,
  feesByMonth: any
): ApexOptions {
  return {
    series: [
      {
        name: 'Prix des commandes',
        data: feesByMonth,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
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
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: '#E4E6EF',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
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
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 10,
    },
  }
}
