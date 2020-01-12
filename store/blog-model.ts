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
  },

  reducers: {
    setBlogList(state, blogList) {
      return { ...state, blogList }
    },

    setBlog(state, currentBlog) {
      return { ...state, currentBlog }
    },
  },

  effects: dispatch => ({
    async getBlogList(options?: GetBlogListProps) {
      const params = options || { perPage: 30, page: 1, tags: [] }

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
      const currentBlog = await axios.get(`/articles/${id}`)
      dispatch.blogModel.setBlog(currentBlog)
    },
  }),
}
