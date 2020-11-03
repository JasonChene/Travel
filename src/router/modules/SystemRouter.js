import Layout from '@/layout'

const SystemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'system',
  meta: { title: 'system', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'sysrole',
      component: () => import('@/views/system/sysrole'),
      name: 'sysrole',
      meta: { title: 'sysrole', icon: 'el-icon-user' }
    },
    {
      path: 'systutor',
      component: () => import('@/views/system/systutor'),
      name: 'systutor',
      meta: { title: 'systutor', icon: 'el-icon-menu' }
    },
    {
      path: 'creatPM',
      component: () => import('@/views/system/creatPM'),
      name: 'creatPM',
      meta: { title: 'creatPM', icon: 'peoples' }
    },
    {
      path: 'sysuser',
      component: () => import('@/views/system/sysuser'),
      name: 'sysuser',
      meta: { title: 'sysuser', icon: 'peoples' }
    }
  ]
}

export default SystemRouter
