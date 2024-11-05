const pool = require("../../db.js");
const queries = require('./queries.js');

const getStudents = (req,res)=>{
try {
    pool.query(queries.getStudents,(err,result)=>{
        if(err) throw err;
        res.status(200).json({message:'Data fetched successfully',data:result.rows});
    })
} catch (error) {
    res.status(500).json({error:error.message})
}
}

const getStudentById = (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        if(!id){
            return res.status(404).json({error:`Cannot find any student with id ${id}`});
        }
        pool.query(queries.getStudentById,[id],(err,results)=>{
            if(err) throw err;
            console.log(results.rowCount);
            
            if(results.rowCount===0){
            return res.status(404).json({error:`Cannot find any student with id ${id}`})
            }
            res.status(200).json({message:'students fetched successfully',data:results.rows});
        })
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const addStudents = (req,res) =>{
    try {
        const {name,email,age,dob} = req.body;
        // check email is already exists
        
        pool.query(queries.checkEmailExist,[email],(err,results)=>{
            if(err) throw err;
            if(results.rows.length){
                return res.status(409).json({error:`${email} is already exists, try with different email address`});
            }
        
            // adding student info into the db
            pool.query(queries.addStudents,[name,email,age,dob],(err,results)=>{
                if(err) throw err;
                res.status(201).json({message:'Student Created Successfully!',data:results.rows});
                console.log(results.rows);
                
            });
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const deleteStudent = (req,res)=>{
    try {
        const id =parseInt(req.params.id);
        pool.query(queries.deleteStudent,[id],(err,results)=>{
            if(err) throw err;
            if(results.rowCount===0){
                return res.status(404).json({error:`Cannot find any student with id ${id}`})
                }
            res.status(200).json({message:'Student Deleted Successfully',data:results.rows});
        })
    } catch (error) {
    res.status(500).json({error:error.message});        
    }
}

const updateStudent = (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const {name,email,age,dob} = req.body;
        pool.query(queries.updateStudent,[name,email,age,dob,id],(err,results)=>{
            if(err) throw err;
            if(results.rowCount === 0){
                return res.status(404).json({error:`cannot find any student with id ${id}`});
            }
            res.status(200).json({message:'Student updated successfully.',data:results.rows});
        })
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
module.exports = {getStudents,getStudentById,addStudents,deleteStudent,updateStudent};