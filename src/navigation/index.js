import {
  Login,
  PhotoList,
  PhotoOperationsVone,
  PhotoRedactor,
  Signup,
} from '../components'

export const publicRoutes = [
  { path: '/signup', component: Signup, exact: true, isHeader: false },
  { path: '/login', component: Login, exact: true, isHeader: false },
  { path: '/helloworld', component: Login, exact: true, isHeader: false },
]

export const privateRoutes = [
  { path: '/photoList', component: PhotoList, exact: true, isHeader: true },
  {
    path: '/photo/:id',
    component: PhotoOperationsVone,
    exact: false,
    isHeader: true,
  },
  {
    path: '/photo',
    component: PhotoRedactor,
    exact: false,
    isHeader: true,
  },
]
