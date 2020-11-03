import Layout from '@/layout'

const libRouter = {
  path: '/lib',
  component: Layout,
  redirect: 'noRedirect',
  name: 'lib',
  meta: { title: 'lib', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'libclass',
      component: () => import('@/views/lib/libclass'),
      name: 'libclass',
      meta: { title: 'libclass', icon: 'el-icon-user' }
    }
    // {
    //   path: 'libc',
    //   component: () => import('@/views/lib/libc'),
    //   name: 'subject',
    //   meta: { title: '学科', icon: 'el-icon-menu' }
    // }
  ]
}

export default libRouter
