const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const conn1 = require("../db/conn");

// register user data
router.post("/create", (req, res) => {

    // console.log(req.body);

    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                conn.query("INSERT INTO users SET ?", { name, email, age, mobile, work, add, desc }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});




// get userdata

router.get("/getusers", (req, res) => {

    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});


// user delete api

router.delete("/deleteuser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("DELETE FROM users WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

router.delete("/getuser/:password", (req, res) => {

    const { id } = req.params;

    conn.query("select * FROM users WHERE password = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});




// get single user

router.get("/induser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("SELECT * FROM users WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateuser/:id", (req, res) => {

    const { id } = req.params;

    const data = req.body;

    conn.query("UPDATE users SET ? WHERE id = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});


//-------------------------------azure 
// get userdata

router.get("/getusersa", (req, res) => {

    conn1.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/getuserdetails/:email", (req, res) => {
    const { email } = req.params;

    conn1.query("SELECT * FROM users where email = ?", email, (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/getusers/:email", (req, res) => {
    const { email } = req.params;


    conn1.query("SELECT * FROM users where email = ?", email, (err, result) => {
        if (err) {
            res.status(422).json("nodata available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.patch("/updateuser/:email", (req, res) => {

    const { email } = req.params;

    const data = req.body;

    conn.query("UPDATE users SET ? WHERE email = ? ", [data, email], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});


// register user data
router.post("/autoregister", (req, res) => {

    // console.log(req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("Plese use a new mail to register.(this mail already registered with safefoodhandling")
            } else {
                conn.query("INSERT INTO users SET ?", { name, email, password }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});


router.get("/getallcourses", (req, res) => {

    conn1.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});

router.get("/agetallpayments", (req, res) => {

    conn1.query("SELECT p.id, u.name as 'user_name', p.user_id, c.name as 'course_name',  p.course_id, p.payment_reference_number, p.payment_status, p.amount FROM payment p JOIN users u ON p.user_id = u.id JOIN courses c ON p.course_id = c.id; ", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});


router.get("/paymentup/:id", (req, res) => {

    const { id } = req.params;

    conn.query("SELECT * FROM payment WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

router.delete("/deletepayment/:id", (req, res) => {

    const { id } = req.params;

    conn.query("DELETE FROM payment WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

router.patch("/updatepayment/:id", (req, res) => {

    const { id } = req.params;

    const data = req.body;

    conn.query("UPDATE payment SET ? WHERE id = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});


router.get("/agetallusers", (req, res) => {

    conn1.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});

router.get("/agetallquizzes", (req, res) => {

    conn1.query("SELECT * FROM quiz", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/agetallcourses", (req, res) => {

    conn1.query("SELECT * FROM courses", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/agetallcomplaints", (req, res) => {

    conn1.query("SELECT * FROM complaints", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/agetallresolvedcomplaints", (req, res) => {

    conn1.query("SELECT * FROM resolved", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});

router.get("/agetallquizattempts", (req, res) => {

    conn1.query("SELECT  userid, users.name as 'UserName', courses.name as 'CourseName', courses.id as 'CourseID', quiztype, quizresult FROM quiz JOIN courses ON quiz.courseid = courses.id JOIN users ON quiz.userid = users.id WHERE courseid > 0 GROUP BY courses.name, courses.id, quiztype, userid, quizresult, users.name ", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});

router.get("/agetallcomplaintsresolvedyes", (req, res) => {

    conn1.query("SELECT c.complaint_id as complaint_id, c.user_name, c.user_email, r.resolved_status, c.complaint_date_time as raised_time, r.timestamp as resolved_time FROM complaints c INNER JOIN resolved r ON c.complaint_id = r.complaint_id WHERE r.resolved_status = 'yes'", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/agetallcomplaintsresolvedno", (req, res) => {

    conn1.query("SELECT c.complaint_id as complaint_id, c.user_name, c.user_email, r.resolved_status, c.complaint_date_time as raised_time, r.timestamp as resolved_time FROM complaints c INNER JOIN resolved r ON c.complaint_id = r.complaint_id WHERE r.resolved_status = 'no'", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
router.get("/agetallcomplaintsresolvedall", (req, res) => {

    conn1.query("SELECT c.complaint_id as complaint_id, c.user_name, c.user_email, r.resolved_status, c.complaint_date_time as raised_time, r.timestamp as resolved_time FROM complaints c INNER JOIN resolved r ON c.complaint_id = r.complaint_id", (err, result) => {
        if (err) {
            res.status(422).json("no data available");
        } else {
            res.status(201).json(result);
        }
    })
});
module.exports = router;



