import { Login, PhotoList, PhotoOperations, Signup } from '../components'

export const publicRoutes = [
  { path: '/signup', component: Signup, exact: true, isHeader: false },
  { path: '/login', component: Login, exact: true, isHeader: false },
  { path: '/helloworld', component: Login, exact: true, isHeader: false },
]

export const privateRoutes = [
  { path: '/photoList', component: PhotoList, exact: true, isHeader: true },
  {
    path: '/photo/:id',
    component: PhotoOperations,
    exact: true,
    isHeader: true,
  },
]
