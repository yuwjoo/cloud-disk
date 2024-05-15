export const routes = [
  {
    path: '/',
    name: '/',
    redirect: { name: 'overview' }
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/views/overview/OverviewView.vue'),
    meta: {
      title: '总览',
      haveAside: true
    }
  },
  {
    path: '/picture',
    name: 'picture',
    component: () => import('@/views/picture/PictureView.vue'),
    meta: {
      title: '图片',
      haveAside: true
    }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video/VideoView.vue'),
    meta: {
      title: '视频',
      haveAside: true
    }
  },
  {
    path: '/taskCenter',
    name: 'taskCenter',
    component: () => import('@/views/taskCenter/TaskCenterView.vue'),
    meta: {
      title: '任务中心',
      haveAside: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settings/SettingsView.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/share/:id',
    name: 'share',
    component: () => import('@/views/share/ShareView.vue'),
    meta: {
      title: '分享'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notFound/NotFoundView.vue'),
    meta: {
      title: '404'
    }
  }
];
