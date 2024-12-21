import Chart from 'react-apexcharts'
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from '../../redux/api/orderAiSlice'
import { useState, useEffect } from 'react'
import OrderList from './OrderList'
import Loader from '../../Components/Loader'
import { useGetUsersQuery } from '../../redux/api/usersApiSlices'

const DataCard = ({ title, value, isLoading, icon }) => (
  <div className="rounded-lg bg-black p-5 w-[20rem] mt-5 shadow-md hover:shadow-lg transition-shadow">
    <div className="font-bold rounded-full w-[3rem] bg-yellow-400 text-center p-3 text-black">
      {icon}
    </div>
    <p className="mt-5 text-yellow-300">{title}</p>
    <h1 className="text-xl font-bold text-white">
      {isLoading ? <Loader /> : value}
    </h1>
  </div>
)

const AdminDashboard = () => {
  const {
    data: sales,
    isLoading: loadingSales,
    isError: errorSales,
  } = useGetTotalSalesQuery()
  const {
    data: customers,
    isLoading: loadingCustomers,
    isError: errorCustomers,
  } = useGetUsersQuery()
  const {
    data: orders,
    isLoading: loadingOrders,
    isError: errorOrders,
  } = useGetTotalOrdersQuery()
  const { data: salesDetail, isError: errorSalesDetail } =
    useGetTotalSalesByDateQuery()

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'line',
      },
      tooltip: {
        theme: 'dark',
      },
      colors: ['#FBBF24'], // Yellow color for chart lines
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Sales Trend',
        align: 'left',
        style: {
          color: '#FBBF24', // Yellow title text
        },
      },
      grid: {
        borderColor: '#ccc',
      },
      markers: {
        size: 4,
        colors: ['#FBBF24'], // Yellow markers
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Date',
          style: {
            color: '#FBBF24',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Sales',
          style: {
            color: '#FBBF24',
          },
        },
        min: 0,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: 'Sales', data: [] }],
  })

  useEffect(() => {
    if (salesDetail) {
      const formattedData = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }))

      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories: formattedData.map((item) => item.x),
          },
        },
        series: [{ name: 'Sales', data: formattedData.map((item) => item.y) }],
      }))
    }
  }, [salesDetail])

  if (errorSales || errorCustomers || errorOrders || errorSalesDetail) {
    return (
      <div className="text-red-500">
        Error loading dashboard data. Please try again later.
      </div>
    )
  }

  return (
    <section className="xl:ml-[4rem] md:ml-[0rem] m-16 mx-0 ">
      <div className="w-[80%] flex justify-around flex-wrap">
        <DataCard
          title="Sales"
          value={`LKR ${sales?.totalSales?.toFixed(2)}`}
          isLoading={loadingSales}
          icon="LKR"
        />
        <DataCard
          title="Customers"
          value={customers?.length || 0}
          isLoading={loadingCustomers}
          icon="👤"
        />
        <DataCard
          title="All Orders"
          value={orders?.totalOrders || 0}
          isLoading={loadingOrders}
          icon="📦"
        />
      </div>

      <div className="ml-[10rem] mt-[4rem]">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width="70%"
        />
      </div>

      <div className="mt-[4rem]">
        {loadingOrders ? <Loader /> : <OrderList />}
      </div>
    </section>
  )
}

export default AdminDashboard
