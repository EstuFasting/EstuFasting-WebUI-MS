import React from 'react';
import {useHistory} from "react-router-dom";

function SignedInMain() {

    const history = useHistory();

    history.push("/menu-edit");

    return <div/>
}

export default SignedInMain;