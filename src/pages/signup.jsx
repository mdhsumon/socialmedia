import React from "react";

export const Signup = () => {
    return(
        <div className="login-page">
            <div className="login-form">
                <form action="">
                    <div className="input">
                        <input className="input-field" type="text" placeholder="Full name" />
                    </div>
                    <div className="input">
                        <div>
                            <input type="radio" id="male" name="gender" value="male" />
                            &nbsp;<label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input type="radio" id="female" name="gender" value="female" />
                            &nbsp;<label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="input">
                        <input className="input-field" type="text" placeholder="Username" />
                    </div>
                    <div className="input">
                        <input className="input-field" type="text" placeholder="Email" />
                    </div>
                    <div className="input">
                        <input className="input-field" type="password" placeholder="Password here" />
                    </div>
                    <div className="input">
                        <input className="input-field" type="password" placeholder="Re type password here" />
                    </div>
                    <button type="button">Signup</button>
                </form>
                <div className="new-account">Already have account? <a href="/login">login</a> here.</div>
            </div>
        </div>
    )
}
