import React, { useEffect, useState } from 'react'
import summaryURL from '../common';
import moment from 'moment'
import formatCurrency from '../helper/currencyChange'

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch(summaryURL.getOrders.url, {
      method: summaryURL.getOrders.method,
      credentials: "include"
    })
    const result = await response.json();
    if (result.success) {
      setData(result.data)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <p>No order available</p>
        )
      }

      <div className="p-4">
        {
          data.map((order, index) => {
            return (
              <div key={index} className="">
                <p className='mt-2 font-medium text-lg'>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</p>
                <div className="mt-3 border border-slate-400 rounded p-4">
                  <div className="flex justify-between flex-col lg:flex-row">
                    <div className="grid gap-1">
                      {
                        order?.productDetails.map((product, index) => {
                          return (
                            <div key={index} className="flex gap-3 bg-slate-100">
                              <img className='w-28 h-28 bg-slate-200 object-scale-down p-2' src={product.image[0]} alt={product.name} />
                              <div className="">
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className="flex items-center gap-5 mt-1">
                                  <div className="text-lg text-red-500 font-medium">{formatCurrency(product.price)}</div>
                                  <p>Quantity: {product.quantity}</p>
                                </div>
                              </div>

                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="flex gap-4 flex-col p-2 min-w-[320px]">
                      <div className="">
                        <div className="text-lg font-medium">
                          Payment Details :
                        </div>
                        <p className='ml-1'>Payment method : {order.paymentDetails.payment_method_type[0]}</p>
                        <p className='ml-1'>Payment status : {order.paymentDetails.payment_status}</p>
                      </div>
                      <div className="">
                        <div className="text-lg font-medium">Shipping Details : </div>
                        {
                          order?.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate} className="ml-1">Shipping amount : {formatCurrency(shipping.shipping_amount)}</div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-lg lg:text-xl font-semibold ml-auto w-fit ">Total Price : {formatCurrency(order.totalAmount)}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage
