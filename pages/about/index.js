import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { auth } from '../../utils/auth.js'

const About = props => {
  const [user, setUser] = useState({
    name: 'trung',
    age: '22',
  })

  const click = () => {
    setUser({ ...user, name: 'trung 1' })
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <div onClick={click}>About</div>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}

// About.getInitialProps = async ctx => {
//     let token = (await auth(ctx)) || null
//     return { token }
// }

export default About
