import {Route} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {ToastContainer} from "react-toastify";
import StaffCreateForm from "../components/StaffCreateForm";
import {classNames} from "../utilities/utils";
import {getToken} from "../localStorage";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Main from "../pages/Main";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import MenuEdit from "../pages/MenuEdit";

export default function Dashboard() {
    const user = useSelector(state => state?.user.userProps.user);
    const [loggedIn, setLoggedIn] = useState(getToken() !== null);

    useEffect(() => {
        setLoggedIn(getToken() !== null)
    }, [user])

    return (
        <div>
            <Navbar/>
            <ToastContainer position={"bottom-left"} pauseOnFocusLoss={false} closeButton={null}/>
            <div className={classNames({
                "signed-in-main-container": loggedIn,
                "signed-out-main-container": !loggedIn
            })}>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/staff-create" component={StaffCreateForm}/>
                <Route exact path="/menu-edit" component={MenuEdit}/>
                <Route exact path="/settings" component={Settings}/>


                <Footer/>
            </div>
        </div>
    )
}

