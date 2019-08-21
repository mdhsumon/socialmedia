import React from "react";

export const Login = () => {
    return(
        <div className="login-page">
            <div className="login-form">
                <form action="">
                    <div className="input user">
                        <input className="input-field" type="text" placeholder="username/email here" />
                    </div>
                    <div className="input password">
                        <input className="input-field" type="password" placeholder="Password here" />
                    </div>
                    <button type="button">Login</button>
                </form>
                <div className="new-account">Don't have account? Simply <a href="/signup">signup</a> here.</div>
            </div>
        </div>
    )
}
