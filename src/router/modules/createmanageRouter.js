import Layout from '@/layout'

const createmanageRouter = {
  path: '/createmanage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'createmanage',
  meta: { title: 'createmanage', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'consult',
      component: () => import('@/views/createmanage/consult'),
      name: 'consult',
      meta: { title: 'consult', icon: 'el-icon-user' }
    },

  ]
}

export default createmanageRouter
