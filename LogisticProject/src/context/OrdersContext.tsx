import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Order, OrderStatus } from '../types/orders'
import ordersData from '../data/ordersData'

interface OrdersState {
  orders: Order[]
}

type OrdersAction =
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'UPDATE_STATUS'; orderId: string; status: OrderStatus }

function reducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'ADD_ORDER':
      return { orders: [action.order, ...state.orders] }
    case 'UPDATE_STATUS':
      return {
        orders: state.orders.map(o =>
          o.id === action.orderId ? { ...o, status: action.status } : o
        ),
      }
    default:
      return state
  }
}

interface OrdersContextValue {
  orders: Order[]
  addOrder: (order: Order) => void
  updateStatus: (orderId: string, status: OrderStatus) => void
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { orders: ordersData })

  return (
    <OrdersContext.Provider value={{
      orders: state.orders,
      addOrder:     order   => dispatch({ type: 'ADD_ORDER', order }),
      updateStatus: (id, s) => dispatch({ type: 'UPDATE_STATUS', orderId: id, status: s }),
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider')
  return ctx
}
