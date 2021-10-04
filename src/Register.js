import React from 'react';


export default class Register extends React.Component {
    reg = (e) => {
        e.preventDefault();
              fetch('http://localhost:1337/register', {
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
                // console.log(response);
              });
    };
    render() {
    return (
        <>
        <div className="register">
            <form onSubmit={this.reg}>
                <label>Mejl:</label><br />
                <input type="email" placeholder="exempel@exempel.com" /><br />
                <br />
                <br />
                <label>Lösenord:</label><br />
                <input type="password" /><br />
                <br />
                <br />
                <input type="submit" className="registerBtn" value="Registrera" />
            </form>
            <br />
            <br />
        </div>
        </>
    );
    }
}