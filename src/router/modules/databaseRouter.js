import Layout from '@/layout'

const databaseRouter = {
  path: '/database',
  component: Layout,
  redirect: 'noRedirect',
  name: 'database',
  meta: { title: 'database', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'college',
      component: () => import('@/views/database/college'),
      name: 'College',
      meta: { title: 'collage', icon: 'el-icon-user' }
    },
    {
      path: 'subject',
      component: () => import('@/views/database/subject'),
      name: 'subject',
      meta: { title: 'subject', icon: 'el-icon-menu' }
    }
  ]
}

export default databaseRouter
