export const routes = [
  {
    path: '/',
    name: '/',
    redirect: { name: 'control' }
  },
  {
    path: '/control',
    name: 'control',
    component: () => import('@/views/control/ControlView.vue'),
    meta: {
      haveAside: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/share/:id',
    name: 'share',
    component: () => import('@/views/share/ShareView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notFound/NotFoundView.vue')
  }
];
