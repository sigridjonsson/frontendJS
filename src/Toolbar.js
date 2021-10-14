import React from 'react';

function SelectUser() {
    fetch('https://jsramverk-editor-sijn20.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: "{users {email}}"})
        })
        .then( function (response) {
            return response.json();
        }).then(function(data) {
            if (data) {
                let optionList = document.getElementById('users').options;
                let options = data.data.users;
                options.forEach(option =>
                    optionList.add(
                      new Option(option.email)
                    )
                );
            }
        })

    return (
            ""
        );
}

export default function Toolbar({ saveText, logText, emptyEditor, printText }) {
    return (
        <>
        <div className="toolbar">
            <form id="docForm" onSubmit={saveText}>
                <label>Namn på dokument: </label>
                <input type="text" id="nameDoc" />
                <label> Dokumentets ID: </label>
                <input type="text" disabled="disabled" id="idDoc" />
                <label>Lägg till användare som ska få tillgång till texten: </label>
                <select name="users" id="users" form="docForm">
                </select>
                <input className="save" id="saveBtn" type="submit" value="Spara" />
                {/* <input className="print" id="printBtn" type="submit" value="Skriv ut" /> */}
            </form>
            <button className="log" onClick={logText}>Logga</button>
            <button className="log" onClick={emptyEditor}>Ny</button>
            <button className="pdf" onClick={printText}>Ladda ned som PDF</button>
        </div>
        < SelectUser />
        </>
    );
}