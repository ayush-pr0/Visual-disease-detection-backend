const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/labs/covid19", (req, res) => {
    const data = {
        path: "D:\\Work\\Disease Detection\\Dataset\\CNN-covid-Dataset\\COVID\\COVID-2.png",
    };
    let dataToSend;

    const covid19 = spawn("python", [
        "script\\covid19_pneumonia.py",
        data.path,
    ]);
    // collect data from script
    covid19.stdout.on("data", function (stdData) {
        dataToSend = {
            disease: "covid19_pneumonia",
            result: stdData.toString().trim(),
            result_path:
                __dirname +
                "\\result\\covid19_pneumonia\\result_" +
                data.path.split("\\").pop(),
        };
        // dataToSend = stdData.toString().trim();
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
        path: "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\no_tumor\\image(1).jpg",
    };
    let dataToSend;

    const covid19 = spawn("python", ["script\\brain_tumor.py", data.path]);
    // collect data from script
    covid19.stdout.on("data", function (stdData) {
        dataToSend = {
            disease: "brain_tumor",
            result: stdData.toString().trim(),
            result_path:
                __dirname +
                "\\result\\brain_tumor\\result_" +
                data.path.split("\\").pop(),
        };
    });
    // in close event we are sure that stream from child process is closed
    covid19.on("close", (code) => {
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend);
    });
});

app.get("/labs/breast_cancer", (req, res) => {
    let data = {
        path: "D:\\Work\\Disease Detection\\Dataset\\Dataset_BUSI_with_GT\\normal\\normal (4).png",
    };
    let dataToSend;

    const covid19 = spawn("python", ["script\\breast_cancer.py", data.path]);
    // collect data from script
    covid19.stdout.on("data", function (stdData) {
        dataToSend = {
            disease: "breast_cancer",
            result: stdData.toString().trim(),
            result_path:
                __dirname +
                "\\result\\breast_cancer\\result_" +
                data.path.split("\\").pop(),
        };
    });
    // in close event we are sure that stream from child process is closed
    covid19.on("close", (code) => {
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    fs.mkdirSync(__dirname + "\\result\\covid19_pneumonia", {
        recursive: true,
    });
    fs.mkdirSync(__dirname + "\\result\\brain_tumor", {
        recursive: true,
    });
    fs.mkdirSync(__dirname + "\\result\\breast_cancer", {
        recursive: true,
    });
});
