const express = require("express");
const {getStudents,getStudentById, addStudents, deleteStudent, updateStudent} = require("./controller.js");


 const router = express.Router();

router.get('/',getStudents);
router.post('/addStudents',addStudents);
router.get('/getStudent/:id',getStudentById);
router.delete('/deleteStudent/:id',deleteStudent);
router.put('/updateStudent/:id',updateStudent);
module.exports= router;
