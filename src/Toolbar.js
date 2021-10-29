import React from 'react';

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
                <input type="text" id="nameDoc" />
                <input className="save" id="saveBtn" type="submit" value="Spara" />
            </form>
            <button className="log" onClick={logText}>Logga</button>
            <button className="log" onClick={emptyEditor}>Ny</button>
            <button className="pdf" onClick={printText}>Ladda ned som PDF</button>
        </div>
        </>
    );
}