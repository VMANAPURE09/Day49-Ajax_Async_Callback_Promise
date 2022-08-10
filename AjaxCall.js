// //UC2 Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX
// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// function showTime() {
//     const date = new Date();
//     return date.getHours() + "Hrs:" + date.getMinutes() + "Mins: " + date.getSeconds() + "Sec:";
// }

// function makeAJAXCall(methodType, url, callback, async = true, data = null) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         console.log(methodType + " State Changed Called at: " + showTime() + " Rs: " + xhr.readyState + " Status:" + xhr.status);
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200 || xhr.status === 201) {
//                 callback(xhr.responseText);
//             }
//             else if (xhr.status >= 400) {
//                 console.log("Handle 400 client Error or 500 server Error at: " + showTime());
//             }
//         }
//     }
//     xhr.open(methodType, url, async);
//     if (data) {
//         console.log(JSON.stringify(data));
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.send(JSON.stringify(data));
//     } else xhr.send();
//     console.log(methodType + "request sent in the server at: " + showTime());
// }

// //GET
// const getURL = "http://localhost:3000/employees";
// function getUserDetails(data) {
//     console.log("Get User Data at: " + showTime() + " data: " + data)
// }

// makeAJAXCall("GET", getURL, getUserDetails, true);
// console.log("Made GET AJAX Call to Server at " + showTime());

// //DELETE
// const deleteURL = "http://localhost:3000/employees/4";
// function userDeleted(data) {
//     console.log("User Deleted at : " + showTime() + " Data " + data);
// }
// makeAJAXCall("DELETE", deleteURL, userDeleted, false);
// console.log("Made DELETE AJAX Call to Server at " + showTime());

// //POST
// const postURL = "http://localhost:3000/employees";
// const emplData = { "name": "vasanth", "Salary": "350000" };
// function userAdded(data) {
//     console.log("User Added at : " + showTime() + " Data " + data)
// }
// makeAJAXCall("POST", postURL, userAdded, true, emplData);
// console.log("Made POST AJAX Call to Server at " + showTime());

//UC3 Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX and Promise

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed Called. Ready State: " + xhr.readyState + " Status:" + xhr.status);
            if (xhr.status.tostring().match('[2] [0-9] {2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.tostring().match('^[4,5] [0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.groupCollapsed("XHR Failed");
            }
        }

        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + "request sent in the server ");
    });
}
//GET
const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + responseText)
    })
    .catch(error => console.log("Get Error Status: " + JSON.stringify(error)));

//DELETE
const deleteURL = "http://localhost:3000/employees/3";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText)
    })
    .catch(error => console.log("DELETE error status: " + JSON.stringify(error)));
//POST
const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Dhanashekar", "Salary": "35000" };

makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User Added: " + responseText)
    })
    .catch(error => console.log("POST error status: " + JSON.stringify(error)));