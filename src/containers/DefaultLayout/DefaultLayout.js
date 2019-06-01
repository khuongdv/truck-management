import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer
} from '@coreui/react';
import AppSidebarNav from './AppSidebarNav';
import navigation from '../../_nav';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import auth from '../../helpers/auth';
import {ToastContainer} from 'react-toastify';
import Loading from '../../components/loading';
import {MyNavigator} from "../../AppContext";
import routes from '../../routes'

class DefaultLayout extends Component {

  componentDidMount() {
    console.log('componentDidMount', "DEFAULT LAYOUT")
    if (!auth.isLogin()) {
      auth.clear();
      MyNavigator.navigateTo('/login');
    } else {
      this.props.getMyInfo().then(res => {
        MyNavigator.navigateTo('/dashboard')
      }).catch(ex => {
        console.log("ERRR", ex)
      })
    }
  }

  render() {
    let {loading} = this.props;
    if (loading) {
      return <Loading/>;
    }
    return (
      <div className="app">
        <ToastContainer toastClassName="toast-container"/>
        <AppHeader fixed>
          <DefaultHeader user={this.props.user}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <AppSidebarNav navConfig={this.props.menuItems || navigation} {...this.props} />
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
        <AppFooter>
          <DefaultFooter/>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout
