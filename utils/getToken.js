import Cookies from 'js-cookie'

export default ctx => {
  let token = null

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    if (!ctx.req.headers || !ctx.req.headers.cookie) {
      return null
    }
    token = ctx.req.headers.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
  } else {
    // we dont have request info aka Client Side
    token = Cookies.get('token')
  }
  return token
}
