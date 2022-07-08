import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import useAuthen from '../hooks/useAuthen'
import { getRequestToken, getSessionWithLogin, getGuestSession } from '../services/authen'

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [requestToken, setRequestToken] = useState('')
    const dispatch = useDispatch()
    const {isLogin} = useAuthen()
    const navigate = useNavigate()
    useEffect(() => {
        if(isLogin) {
            navigate('/')
        }
    }, [isLogin])
    useEffect(() => {
        dispatch(getRequestToken()).unwrap()
        .then(data => {
            setRequestToken(data.request_token)
        })
    }, [])
    return (
        <div className="max-w-[900px]  mx-auto px-3 py-8">
            <form
              action=""
              onSubmit={e => {
                e.preventDefault()
                dispatch(getSessionWithLogin({
                    ...data,
                    request_token: requestToken
                }))
              }}
            >
                <label htmlFor="">User name</label>
                <Input
                  type="text"
                  value={data.username}
                  onChange={e => setData({
                    ...data,
                    username: e.target.value
                })}
                />
                <label htmlFor="">Password</label>
                <Input
                  type="text"
                  value={data.password}
                  onChange={e => setData({
                    ...data,
                    password: e.target.value
                })}
                />
                <button
                  type='submit'
                  className='w-full bg-gray-50 rounded-lg mt-3 p-2 border hover:shadow-lg border-sky-400'
                >Login</button>
                <button
                  type='button'
                  onClick={() => {
                      dispatch(getGuestSession())
                  }}
                  className='w-full bg-gray-50 rounded-lg mt-3 p-2 border hover:shadow-lg border-sky-400'
                >Login With Guest</button>
                {requestToken && (
                    <a
                      href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/approved`}
                      className="block w-full text-center bg-gray-50 rounded-lg mt-3 p-2 border hover:shadow-lg border-sky-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                        By Themoviedb
                    </a>
                )}

            </form>
        </div>
    )
}

export default Login