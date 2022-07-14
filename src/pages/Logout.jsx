import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuthen from '../hooks/useAuthen'
import { deleteSession } from '../services/authen'

const Logout = () => {
    const navigate = useNavigate()
    const {isLogin} = useAuthen()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLogin) {
            dispatch(deleteSession())
        }

        navigate('/')
    }, [])
  return (
    <div>Logout...</div>
  )
}

export default Logout