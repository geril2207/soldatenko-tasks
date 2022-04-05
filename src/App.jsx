import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { privateRoutes, publicRoutes } from './navigation'
import { Layout } from './components'

function App() {
  const token = localStorage.getItem('token')
  return (
    <Router>
      <div className="App">
        {token ? (
          <Switch>
            {privateRoutes.map((route, index) => (
              <Route
                path={route.path}
                exact={route.exact}
                key={`${route.path}_${index}`}
              >
                <Layout isHeader={route.isHeader} component={route.component} />
              </Route>
            ))}
            <Redirect to="/photoList" />
          </Switch>
        ) : (
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route
                path={route.path}
                exact={route.exact}
                key={`${route.path}_${index}`}
              >
                <Layout isHeader={route.isHeader} component={route.component} />
              </Route>
            ))}
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App
