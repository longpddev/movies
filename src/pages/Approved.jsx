import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { addRequestToken, getSession } from '../services/authen';

const Approved = () => {
    const dispatch = useDispatch();
    const [params] = useSearchParams()
    const request_token = params.get('request_token')
    useEffect(() => {
        if(!request_token) return 
        dispatch(getSession(request_token)).then(data => {
            console.log(data)
        })
    }, [])
  return (
    <div className="py-8">
        <Link to="/">
            <h1 className="text-3xl text-center">Goto Home page</h1>
        </Link>
    </div>
  )
}

export default Approved