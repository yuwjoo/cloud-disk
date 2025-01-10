const routes = [
  {
    path: '/desktopWindow',
    name: 'desktopWindow',
    component: () => import('@/views/desktopWindow/DesktopWindow.vue'),
    meta: {
      title: 'DesktopWindow'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: { name: 'privateyun' },
    children: [
      {
        path: 'privateyun',
        name: 'privateyun',
        component: () => import('@/views/privateyun/Privateyun.vue'),
        meta: {
          title: '私有云',
          aside: true,
          fuzzyQuery: true,
          KeepAlive: true
        }
      },
      {
        path: 'baiduyun',
        name: 'baiduyun',
        component: () => import('@/views/baiduyun/Baiduyun.vue'),
        meta: {
          title: '百度云',
          aside: true,
          fuzzyQuery: true,
          KeepAlive: true
        }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('@/views/markdown/Markdown.vue'),
        meta: {
          title: 'markdown'
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/settings/Settings.vue'),
        meta: {
          title: '设置'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: 'share/:id',
        name: 'share',
        component: () => import('@/views/share/ShareView.vue'),
        meta: {
          title: '分享'
        }
      },
      {
        path: ':pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/notFound/NotFound.vue'),
        meta: {
          title: 'notFound'
        }
      }
    ]
  }
];

export default routes;
