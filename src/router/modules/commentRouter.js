import Layout from '@/layout'

const commentRouter = {
  path: '/comment',
  component: Layout,
  redirect: 'noRedirect',
  name: 'comment',
  meta: { title: '地方特产', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'constitutecomment',
      component: () => import('@/views/comment/constitutecomment'),
      name: 'constitutecomment',
      meta: { title: '特产展示', icon: 'el-icon-user' }
    },
    {
      path: 'coursecomment',
      component: () => import('@/views/comment/coursecomment'),
      name: 'coursecomment',
      meta: { title: '特产评论', icon: 'el-icon-menu' }
    },
    {
      path: 'foodtype',
      component: () => import('@/views/comment/foodtype'),
      name: 'foodtype',
      meta: { title: '特产分类', icon: 'el-icon-menu' }
    }
  ]
}

export default commentRouter
