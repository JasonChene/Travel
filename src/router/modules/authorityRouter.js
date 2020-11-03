import Layout from '@/layout'

const authorityRouter = {
  path: '/authority',
  component: Layout,
  redirect: 'noRedirect',
  name: 'authority',
  meta: { title: '旅游路线', icon: 'lock' },
  children: [
    {
      path: 'sysrole',
      component: () => import('@/views/authority/sysrole'),
      name: 'sysrole',
      meta: { title: '详情管理', icon: 'el-icon-postcard' }
    },
    {
      path: 'sysurl',
      component: () => import('@/views/authority/sysurl'),
      name: 'sysurl',
      meta: { title: '景点管理', icon: 'el-icon-set-up' }
    },
    {
      path: 'datapermission',
      component: () => import('@/views/authority/datapermission'),
      name: 'datapermission',
      meta: { title: '景点分类', icon: 'el-icon-connection' }
    },
    {
      path: 'viewcomment',
      component: () => import('@/views/authority/viewcomment'),
      name: 'viewcomment',
      meta: { title: '评论管理', icon: 'el-icon-connection' }
    }
  ]
}
export default authorityRouter
