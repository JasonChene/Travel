import Layout from '@/layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: 'noRedirect',
  name: '住宿展示',
  meta: { title: 'admin', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'sysuser',
      component: () => import('@/views/admin/sysuser'),
      name: '酒店展示',
      meta: { title: 'sysuser', icon: 'el-icon-user' }
    },
    {
      path: 'sysmenu',
      component: () => import('@/views/admin/sysmenu'),
      name: '酒店分类',
      meta: { title: 'sysmenu', icon: 'el-icon-menu' }
    },
    {
      path: 'sysorg',
      component: () => import('@/views/admin/sysorg'),
      name: '酒店评论',
      meta: { title: 'sysorg', icon: 'peoples' }
    }
  ]
}
export default adminRouter
