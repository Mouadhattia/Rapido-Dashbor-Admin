import {Suspense, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import io from 'socket.io-client'
const notificationSound = new Audio('/media/misc/notification-sound.mp3')
const socket = io('https://rapido-delivery.tn')
const App = () => {
  useEffect(() => {
    socket.on('orderData', (order) => {
      notificationSound.play()
    })

    return () => {
      socket.off('orderData')
    }
  }, [])
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
