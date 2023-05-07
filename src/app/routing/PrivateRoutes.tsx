import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const CategoriesPage = lazy(() => import('../modules/apps/category-management/UsersPage'))
  const RestaurantPage = lazy(() => import('../modules/apps/restaurant-management/UsersPage'))
  const MenuPage = lazy(() => import('../modules/apps/menu-management/UsersPage'))
  const ProductPage = lazy(() => import('../modules/apps/product-management/UsersPage'))
  const Promo = lazy(() => import('../modules/apps/promo-management/UsersPage'))
  const Service = lazy(() => import('../modules/apps/service-management/UsersPage'))
  const Notification = lazy(() => import('../modules/apps/notification-management/UsersPage'))
  const Comment = lazy(() => import('../modules/apps/comment-management/UsersPage'))
  const Order = lazy(() => import('../modules/apps/order-management/UsersPage'))
  const Supplment = lazy(() => import('../modules/apps/supplement-managment/UsersPage'))
  const Pharmacy = lazy(() => import('../modules/apps/pharmacy-management/UsersPage'))
  const Services = lazy(() => import('../modules/apps/services/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='/auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='/dashboard' element={<DashboardWrapper />} />
        <Route path='/builder' element={<BuilderPageWrapper />} />
        <Route path='/menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/category-management/*'
          element={
            <SuspensedView>
              <CategoriesPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/restaurant-management/*'
          element={
            <SuspensedView>
              <RestaurantPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/menu-management/:id/*'
          element={
            <SuspensedView>
              <MenuPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/product-management/:marketId/:id/*'
          element={
            <SuspensedView>
              <ProductPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/promotion-management/*'
          element={
            <SuspensedView>
              <Promo />
            </SuspensedView>
          }
        />
        <Route
          path='apps/service-management/*'
          element={
            <SuspensedView>
              <Service />
            </SuspensedView>
          }
        />
        <Route
          path='apps/notification-management/*'
          element={
            <SuspensedView>
              <Notification />
            </SuspensedView>
          }
        />
        <Route
          path='apps/comment/*'
          element={
            <SuspensedView>
              <Comment />
            </SuspensedView>
          }
        />
        <Route
          path='apps/order/*'
          element={
            <SuspensedView>
              <Order />
            </SuspensedView>
          }
        />
        <Route
          path='apps/pharmacy/*'
          element={
            <SuspensedView>
              <Pharmacy />
            </SuspensedView>
          }
        />
        <Route
          path='apps/services/*'
          element={
            <SuspensedView>
              <Services />
            </SuspensedView>
          }
        />
        <Route
          path='apps/supplement/:id/*'
          element={
            <SuspensedView>
              <Supplment />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
