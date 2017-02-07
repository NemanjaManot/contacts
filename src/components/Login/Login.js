import React from "react";

class Login extends React.Component {

    render() {
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    <form>
                        <h2> Login form </h2>

                        <label>Username</label>
                        <input className="loginInput" type="text" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </section>
        )
    }

}

export default Login;