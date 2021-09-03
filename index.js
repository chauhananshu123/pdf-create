const express = require("express");
const app = express();
var cors = require('cors')
let ejs = require("ejs");
let pdf = require("html-pdf");
const path = require("path")

app.use(cors())

app.get("/", (req, res) => {
    res.send("ok")
})
app.get('/pdf', (req, res) => {

    let students = {
        modulerAssessment: 2,
        session: "2020-2021",
        month: "APRIL - JUNE",
        studentName: "arron das",
        fatherGurduanName: "MR.SUMIT DASS",
        motherName: "MS.JENNIFER DASS",
        classSec: "CLASS VI-B",
        admitionNo: "KPS/01/19/05416",
        dob: "02/11/2010",
        studentProfile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVCvnDl43iFSMQX8cmCE_sRYY6j-4R2WSAQ&usqp=CAU",
        marks: [
            {
                subject: "ENGLISH",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "HINDI",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "MATHEMATICS",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "SCIENCE",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "SOCIAL SCIENCE",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "FRENCH",
                cwhw: "10",
                revisionAssignment: 6,
                mcq: 16,
                structured: 7.5,
                percentage: 79.0,
                grade: "B1"
            },
            {
                subject: "ICT",
                grade: "A1"
            }
        ],
        attandancePercentage: "78%",
        attandanceOut: "40/50",
        aggregatePercentage: "86%",
        cbseafflicatioNo: 1234876,
        address: "Sector 2z, Rajendra Nagar, Shahibabad, Gaziabad, Uttar Pradesh, Pin-201005"
    }

    console.log(students);
    try {
        ejs.renderFile(path.join("report-template.ejs"), { students: students }, (err, data) => {

            if (err) {
                res.send(err);
                console.log(err);
            } else {
                let options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "2mm"
                    },
                    "footer": {
                        "height": "2mm",
                    },
                };
                pdf.create(data, options).toFile(`./marksheets/${students?.studentName.split(" ")[0]}.pdf`, function (err, data) {
                    console.log("success !");
                    // res.send("ok")
                    var filePath = __dirname + "/marksheets/" + students?.studentName.split(" ")[0]+".pdf";
                    console.log(filePath)
                    res.download(filePath);
                })
            }

        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            status:500,
            message:"flag2"
        })
    }
})



app.listen(process.env.PORT || 3000, () => console.log(`port:3000`))