import { defineMiddleware } from 'astro/middleware'

export const onRequest = defineMiddleware((context, next) => {
  const basicAuth = context.request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1] ?? 'username:password'

    const [username, pwd] = atob(authValue).split(':')
    if (username === process.env.BASIC_USER && pwd === process.env.BASIC_PASS) {
      return next()
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-authenticate': 'Basic realm="Secure Area"'
    }
  })
})
