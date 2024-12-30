const routes = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: { name: 'privateyun' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '主页'
        }
      },
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
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
          title: '登录'
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
