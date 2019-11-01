import _ from 'lodash'
import axios from 'axios'
import Router from 'next/router'
import getToken from './getToken.js'
// import { baseURL } from './../config/index.js'
var baseURL

export async function auth(ctx) {
  let token = getToken(ctx)
  console.log(
    'auth token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! :',
    token
  )

  if (!!!token) {
    goToPage(ctx, '/login')
  }
  return token

  try {
    console.log('current checktoken auth handleAuthSSR')

    // yeu cau backend tao mot endpoint de check token co hop le hay khong
    const response = await axios.get(baseURL + '/user/check-token', {
      headers: { Authorization: `Bearer ${token}` },
    })
    // dont really care about response, as long as it not an error
  } catch (err) {
    // in case of error
    // console.log(err.response.data.msg)
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login',
      })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
}

export async function handleAuthSSRForLoginPage(ctx) {
  let token = getToken(ctx)
  if (!_.isEmpty(token)) {
    goToPage(ctx, '/')
  }

  // let isTokenValid = true
  // try {
  //   console.log('current checktoken auth handleAuthSSRForLoginPage')
  //   const response = await axios.get(baseURL + '/user/check-token', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   console.log('checktoken success')
  //   if (response.data.msg !== "It's looking good!") {
  //     return false
  //   }
  // } catch (err) {
  //   return false
  // }

  // return isTokenValid
}

function goToPage(ctx, path) {
  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: path,
    })
    ctx.res.end()
  } else {
    Router.push(path)
  }
}
