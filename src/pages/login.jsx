import React from "react";

export const Login = () => {
    return(
        <div className="login-page">
            <div className="login-form">
                <form action="">
                    <div className="input user">
                        <input type="text" placeholder="username/email here" />
                    </div>
                    <div className="input password">
                        <input type="password" placeholder="Password here" />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}
