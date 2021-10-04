import React, { useState, useEffect } from 'react';

export default function Documents({ onTitleClick }) {
    const [data, setData] = useState({})
    const headers = { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZ3JpZEBzaWdyaWQuc2UiLCJpYXQiOjE2MzMzNDc5MjUsImV4cCI6MTYzMzM1MTUyNX0.aqtuoroWqdKNrTlMI46k56TLYd5sPi-j8qslsJVXvK0'}
    useEffect(() => {
        fetch("http://localhost:1337/documents", { headers })
        .then(res => res.json())
        .then(data => setData(data))
    }, [])
    // console.log(data);

    if (data.length > 0) {
        let allDocs = [];

        for (let i = 0; i < data.length; i++) {
            allDocs.push(<div className="indDoc" onClick={() => onTitleClick(data[i]._id, data[i].name, data[i].text)}>{data[i].name}</div>);
        }

        return (
            allDocs
        )
    } 
    // console.log(data.length);
    return "Inga dokument"

    // fetch(`https://jsramverk-editor-sijn20.azurewebsites.net/documents`)
    // .then(function (response) {
    //     // console.log(response);
    //     return response.json();
    // }).then(function(data) {
    //     console.log(data);
    //     let allDocs = [];

    //     for (let i = 0; i < data.length; i++) {
    //         allDocs.push(<div className="indDoc" onClick={() => onTitleClick(data[i]._id, data[i].name, data[i].text)}>{data[i].name}</div>);
    //     }
    //     console.log("alldocs", allDocs);

    //     return allDocs;
    // });
};
