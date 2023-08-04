"use client"
import { login } from '@/store/sliceAuth'
import { setToken } from '@/store/sliceToken'
import { access_token } from '@/utils/constants'
import { checkToken } from '@/utils/functions'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {


  const route = useRouter()

  useEffect(() => {
    const checkLogin = () => {

      const token = Cookies.get(access_token)
      checkToken(token) ? route.push("/") : route.push("/authen/login?unlogin")
    }

    checkLogin()
  }, [])

  return (
    <div className={``}>
      <h1>Hello Home</h1>
    </div>
  )
}
