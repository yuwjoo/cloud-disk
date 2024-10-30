const routes = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: { name: 'storage' },
    children: [
      {
        path: 'storage',
        name: 'storage',
        component: () => import('@/views/storage/StorageView.vue'),
        meta: {
          title: '存储',
          aside: true
        }
      },
      {
        path: 'picture',
        name: 'picture',
        component: () => import('@/views/picture/PictureView.vue'),
        meta: {
          title: '图片'
        }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/VideoView.vue'),
        meta: {
          title: '视频'
        }
      },
      {
        path: 'taskCenter',
        name: 'taskCenter',
        component: () => import('@/views/taskCenter/TaskCenterView.vue'),
        meta: {
          title: '任务中心'
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/settings/SettingsView.vue'),
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
        component: () => import('@/views/notFound/NotFoundView.vue'),
        meta: {
          title: '404'
        }
      }
    ]
  }
];

export default routes;
