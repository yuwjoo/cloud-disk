import LayoutView from '@/views/layout/LayoutView.vue';

export const routes = [
  {
    path: '/',
    name: '/',
    component: LayoutView,
    redirect: { name: 'control' },
    children: [
      {
        path: '/control',
        name: 'control',
        component: () => import('@/views/control/ControlView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/share/ShareView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notFound/NotFoundView.vue')
  }
];
