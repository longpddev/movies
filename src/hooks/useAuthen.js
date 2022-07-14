import { useSelector } from "react-redux"

const useAuthen = () => {
    const session_id = useSelector(state => state.authen.session.sessionId);
    
    return {
        isLogin: !!session_id
    }
}

export default useAuthen