/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title='Tableau de bord'
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gestionnaire</span>
        </div>
      </div>
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des utilisateurs'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/category-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des catégories'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/restaurant-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des restaurants'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/menu-management/23/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Market'
        fontIcon='bi-layers'
      />
      {/* <AsideMenuItem
        to='/apps/menu-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des menus'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/product-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des produits'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            Promotions & services{' '}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to='/apps/promotion-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des promotions'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/service-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Gestion des services'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/notification-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Notification management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Historique</span>
        </div>
      </div>
      <AsideMenuItem
        to='/apps/order/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Commandes'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/pharmacy/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Pharmacie'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/services/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Service'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/comment/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Commentaires'
        fontIcon='bi-layers'
      />
    </>
  )
}
