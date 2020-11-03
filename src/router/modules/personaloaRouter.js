import Layout from '@/layout'

const personaloaRouter = {
  path: '/personaloa',
  component: Layout,
  redirect: 'noRedirect',
  name: '餐饮展示',
  meta: { title: 'personaloa', icon: 'component' },
  children: [
    {
      path: 'startprocess',
      component: () => import('@/views/personaloa/startprocess'),
      name: '餐饮详情',
      meta: { title: 'startprocess', icon: 'el-icon-s-promotion' }
    },
    {
      path: 'myprocess',
      component: () => import('@/views/personaloa/myprocess'),
      name: '餐饮分类',
      meta: { title: 'myprocess', icon: 'el-icon-user-solid' }
    },
    {
      path: 'candidatetask',
      component: () => import('@/views/personaloa/candidatetask'),
      name: '餐饮评论',
      meta: { title: 'candidatetask', icon: 'el-icon-s-claim' }
    }
  ]
}
export default personaloaRouter
