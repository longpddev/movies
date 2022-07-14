import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CustomLink = ({to, className, children }) => {
    const navigate = useNavigate();
    const ref = useRef();
    useEffect(() => {
        if(!ref.current) return;
        const delta = 6;
        let startX;
        let startY;
        const handleMouseDown = event => {
            startX = event.pageX;
            startY = event.pageY;
            console.log(startX, startY);
        }

        const handleMouseUp = event => {
            const diffX = Math.abs(event.pageX - startX);
            const diffY = Math.abs(event.pageY - startY);
          
            if (diffX < delta && diffY < delta) {
                console.log('click')
            } else {
                console.log('dragging')
            }
        }

        ref.current.addEventListener('mousedown', console.log);
        ref.current.addEventListener('mousedown', handleMouseDown);
        ref.current.addEventListener('mouseup', handleMouseUp);
        console.log(ref.current)
        return () => {
            console.log(123123)
            ref.current.removeEventListener('mousedown', handleMouseDown);
            ref.current.removeEventListener('mouseup', handleMouseUp);
        }
    }, [ref.current])
    return (
        <a href={to} ref={ref} onClick={e => { e.preventDefault() }}  className={className}>
            {children}
        </a>
    )
}

export default CustomLink