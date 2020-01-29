import axios from 'axios'
import qs from 'qs'

interface GetBlogListProps {
  perPage?: number
  page?: number
  tags?: string[]
}

export default {
  state: {
    blogList: {
      list: [],
      count: 0,
      page: 1,
      perPage: 30,
    },

    currentBlog: {},

    comments: { list: [], total: 0 },
  },

  reducers: {
    setBlogList(state, blogList) {
      return { ...state, blogList }
    },

    setBlog(state, currentBlog) {
      return { ...state, currentBlog }
    },

    setComments(state, comments) {
      return { ...state, comments }
    },
  },

  effects: dispatch => ({
    async getBlogList(options?: GetBlogListProps) {
      const params = options || { perPage: 200, page: 1, tags: [] }

      Object.assign(params, { type: 1 })

      const blogs = await axios.get('/articles', {
        params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })

      dispatch.blogModel.setBlogList(blogs)

      return blogs
    },

    async getBlog(id) {
      try {
        axios.post('/articles/' + id + '/view-count')
        const blog = await axios.get(`/articles/${id}`)
        dispatch.blogModel.setBlog(blog)
        return blog
      } catch {
        console.log('博客不存在')
        return null
      }
    },

    async commentBlog(info) {
      await axios.post('/comments', info)
      dispatch.blogModel.getComments({ blogId: info.blogId })
    },

    async leaveMessage(info) {
      await axios.post('/comments', info)
      dispatch.blogModel.getComments({ type: 2 })
    },

    async getComments(query) {
      const comments = await axios.get('/comments', { params: query })
      dispatch.blogModel.setComments(comments)
    },
  }),
}
