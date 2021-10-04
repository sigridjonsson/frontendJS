import React from 'react';


export default class Login extends React.Component {
  login = (e) => {
      e.preventDefault();
            fetch('http://localhost:1337/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: e.target[0].value,
                    password: e.target[1].value,
                })
            })
            .then( function (response) {
              return response.json();

            }).then(function(data) {
              console.log(data.data.token);
              this.setState({token: data.data.token});
            })
    };
    render() {
    return (
        <>
        <div className="login">
            <form onSubmit={this.login}>
                <label>Mejl:</label><br />
                <input type="email" placeholder="exempel@exempel.com"/><br />
                <br />
                <br />
                <label>Lösenord:</label><br />
                <input type="password" /><br />
                <br />
                <br />
                <input type="submit" className="loginBtn" value="Logga in" />
            </form>
            <br />
            <br />
        </div>
        </>
    );
    }
}