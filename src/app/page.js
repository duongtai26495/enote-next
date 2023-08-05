"use client"
import WorkspaceView from '@/components/WorkspaceView'
import { login } from '@/store/sliceAuth'
import { setToken } from '@/store/sliceToken'
import { access_token } from '@/utils/constants'
import { checkToken } from '@/utils/functions'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {


  const route = useRouter()

  useEffect(() => {
    const checkLogin = () => {

      const token = Cookies.get(access_token)
      if (!checkToken(token)) {
        route.push('/authen/login?unlogin'); 
      }
    }

    checkLogin()
  }, [])

  return (
    <div className={``}>
      <WorkspaceView />
    </div>
  )
}

