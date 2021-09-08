import React, { useState, useEffect } from 'react';

export default function GetDocuments() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("/list")
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    let allDocs = [];

    for (var i = 0; i < data.length; i++) {
        allDocs += data[i];
    }

    return (
        <div>{allDocs}</div>
    )
}
