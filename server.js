const express = require("express");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.get("/labs/covid19", (req, res) => {
    const data = {
        // path: "D:\\Work\\Disease Detection\\Diagnosticc\\Uploaded_images\\.png",
        path: "D:\\Work\\Disease Detection\\Dataset\\CNN-covid-Dataset\\COVID\\COVID-2.png",
        // path: "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\no_tumor\\image(1).jpg",
    };
    let dataToSend;

    const covid19 = spawn("python", [
        "script\\covid19_pneumonia.py",
        data.path,
    ]);
    // collect data from script
    covid19.stdout.on("data", function (stdData) {
        dataToSend = { disease: stdData.toString().trim() };
    });
    // in close event we are sure that stream from child process is closed
    covid19.on("close", (code) => {
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend);
    });
});

app.get("/labs/brain_tumor", (req, res) => {
    let data = {
        // path: "D:\\Work\\Disease Detection\\Diagnosticc\\Uploaded_images\\.png",
        // path: "D:\\Work\\Disease Detection\\COVID-19-master\\CovidDataset\\Train\\Normal\\IM-0172-0001.jpeg",
        path: "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\no_tumor\\image(1).jpg",
    };
    let dataToSend;

    const covid19 = spawn("python", ["script\\brain_tumor.py", data.path]);
    // collect data from script
    covid19.stdout.on("data", function (stdData) {
        dataToSend = { disease: stdData.toString().trim() };
    });
    // in close event we are sure that stream from child process is closed
    covid19.on("close", (code) => {
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
