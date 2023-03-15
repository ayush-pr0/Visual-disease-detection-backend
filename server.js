const express = require("express");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.get("/labs/covid19", (req, res) => {
    let data = {
        // path: "D:\\Work\\Disease Detection\\Diagnosticc\\Uploaded_images\\.png",
        path: "D:\\Work\\Disease Detection\\COVID-19-master\\CovidDataset\\Train\\Normal\\IM-0172-0001.jpeg",
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
    // res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
