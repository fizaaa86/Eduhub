import React ,{useEffect, useState} from 'react'
import DashBoardComponent from '../components/DashBoardComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader/Loader';
export default function DashBoard() {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() =>{
        onAuthStateChanged(auth,res => {
            if(!res?.accessToken){
                navigate('/login');
            }
            else {
                setLoading(false);
            }
        })
    },[])
    return loading ? <Loader /> : <DashBoardComponent />;
}
