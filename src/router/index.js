import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/layout'
import Year from '../pages/year'
import Month from '../pages/month'
import New from '../pages/new'

const Router = createBrowserRouter([
  {
    path: '/',
    // index: true,
    element: <Layout />,
    children: [
      {
        // path: '/month',
        index: true,
        element: <Month />
      },
      {
        path: '/year',
        element: <Year />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])

export default Router