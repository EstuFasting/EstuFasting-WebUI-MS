import React from 'react';
import {getToken} from "../localStorage";
import SignedInMain from "./SignedInMain";
import SignedOutMain from "./SignedOutMain";
import Login from "./Login";

function Main() {
    return (
        <div>
            {getToken() ? <SignedInMain/> : <Login/>}
        </div>
    );
}

export default Main;