import React, {useState} from 'react';
import UserService from "../services/userService";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {getToken, setToken} from "../localStorage";
import {syncUser} from "../store/actions/userActions";
import {toast} from "react-toastify";
import AuthService from "../services/authService";

function LoginForm(props) {

    const authService = new AuthService();

    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        onSubmit: (values) => {
            authService.login(values.email, values.password)
                .then(response => {
                    setToken(response.headers.authorization)
                    dispatch(syncUser(response.data.data));
                    history.push("/")
                    toast("Hoşgeldiniz", {autoClose: 2500})
                }).catch(() => toast.error("Lütfen girdiğiniz değerleri kontrol edin"))
        }
    });

    if (getToken()) history.push("/")

    return (
        <div >
            <h3 className={"fasting-form-header"} style={{backgroundColor: "#574f4f"}}>Giriş yap</h3>
            <div className="p-5 pt-2 m-4">
                <form className={"fasting-form mt-2 mb-2"} onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">E-posta Adresi</label>
                    <input id="email" type="text" name={"email"} onChange={formik.handleChange}
                           value={formik.values.email} placeholder="E-posta Adresi Giriniz" required/>
                    <label htmlFor="password">Şifre</label>
                    <input id="password" type="password" name={"password"} onChange={formik.handleChange}
                           value={formik.values.password} placeholder="Şifre Giriniz" required/>
                    <label className="checkbox-container">Beni Hatırla
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <a className="float-end mt-3">Şifremi Unuttum</a>
                    <button className={"mt-5 container-fluid"} type={"submit"}>Oturum Aç</button>
                </form>
                <div className="text-center">
                    <span style={{fontSize: "13px"}}>2022© Tüm hakları saklıdır. Eskişehir Teknik Üniversitesi</span>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;