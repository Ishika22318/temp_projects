const Batch = require("../models/Batch");
const { Parser } = require('json2csv');
const {getABatchService, getAllBatchesService , addBatchService, deleteBatchesService , getCoursesNameandIdService, updateBatchService} = require('../services/batchService');
 const csv = require('csv-parser');
 const fs = require('fs');
 const trainingcourses = require("../models/Courses");
 const user = require("../models/UserModel");
 const path= require("path");
const csv1 = require('csvtojson');
const express = require("express");
const express1 =express();
const xlsx = require('xlsx');
const Courses = require("../models/Courses");
express1.use(express.static(path.resolve(__dirname,'public')));

exports.getAllBatches = async(req, res, next) => {
    try {
        
        let batches = await getAllBatchesService();
        res.status(200).json({ success: true, data: batches });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
};


exports.getABatch = async(req, res, next) => {
    try {

        let batch = await getABatchService(req.params.id);
        if(batch===null || batch.length === 0)
        {
            res.status(200).json({ success: true, data: [] , message:"No Batch Found" });
        }
        else
        {
            res.status(200).json({ success: true, data: batch });
        }
         
    } catch (err) {
           
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
}



exports.addBatches = async(req, res, next) => {
    try {
        const batch = req.body;
        console.log("batches data", batch);


        const existingBatchNames = await Batch.find({ batch_name: { $in: batch.map(b => b.batch_name) } });
        console.log("Existing Batch Names" , existingBatchNames);
        if (existingBatchNames.length > 0) 
        {
            console.log("Batch name is already present.");
            return res.status(200).json({ success: false, message: "batch name must be unique" });
        }



        const result = await addBatchService(batch);
        res.status(200).json({ success: true, message: "batch added successfully" });
    } catch (err) {

        console.log("error", err);
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
}



//Update Batch

exports.updateBatch = async(req, res, next) => {

    try {
        console.log("interns Data", req.body.interns);
        const id = req.body.batchId;
        const batchToUpdate = req.body.batch;
        const interns = req.body.interns;



        console.log("Batch to update , " , batchToUpdate)

        const existingBatch = await Batch.findOne({ batch_name: batchToUpdate.batch_name });
        console.log("Existing Batch Name in update" , existingBatch);
        if (existingBatch && existingBatch._id != id) 
        {
            console.log("Batch name is already present. in update");
            return res.status(200).json({ success: false, message: "batch name must be unique" });
        }





        const result = await updateBatchService(id , batchToUpdate , interns);

        res.status(200).json({ success: true, message: "batch updates successfully" });

    } catch (err) {
        console.log("Error in the patch request", err);
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
}


//Delete Batches


exports.deleteBatches = async(req, res, next) => {
    try {

        const result = await deleteBatchesService(req.body);

        res.status(200).json({ success: true, message: "batch deleted successfully" });

    } catch (err) {
        console.log("error while deleting");
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
}


exports.exportBatch = async(req,res,next) => {
    try {
            let batches = [];
            let batchData;
            if(req.body.length ===0 )
            {
                batchData = await Batch.find({}).exec();
            }
            else
            {
                batchData = await Batch.find({ _id: { $in: req.body } }).exec();
            }
            batchData.forEach((batch) => {
            let { batch_name , description , created_by , status,start_date , end_date , updated_on , program,role , coursesID } = batch;
            description = (description===null || description==="" || description===undefined)?"-":description
            end_date = (end_date === null)?"-":end_date;
            batches.push({ batch_name , description , created_by , status , start_date , end_date , updated_on , program , role, coursesID});
        });

        const csvFields = ['Batch_name','Description,created_by','Status','Start_date','End_date','Updated_on,program','Role','CoursesID'];
        const parser = new Parser({csvFields});
        const csvData = parser.parse(batches);
        res.setHeader("Content-Type", "csv");
        res.setHeader("Content-Disposition","attachment; filename=usersData.csv");
        res.status(200).end(csvData);
    }
    catch(error)
    {
        res.send({status:400, success:false, msg:error.message});
    }
}

//get course name and course-Id

exports.getCoursesNameandId = async(req , res , next)=>
{
    try{
        console.log("Req: has came successfully for getCoursesNameandId");
        //const courses = await trainingcourses.find({} , { _id: 1, courseName: 1 , jobRole:1 }).lean();
        const courses = await getCoursesNameandIdService();
        console.log("Courses" , courses);
       
       

    res.status(200).json({ success: true, data: courses });

    }
    catch(err)
    {
        console.log("error" , err);
        res.status(500).json({ success: false, error: err , message:"Internal Server Error" });
    }
    }


    exports.importBatch = async (req, res) => {
        try {
          if (!req.files || req.files.length === 0) {
            return res.status(400).json({ status: 400, success: false, msg: 'No files uploaded' });
          }
      
          for (const file of req.files) {
            let response = [];
      
            if (file.mimetype === 'text/csv') {
              response = await csv1().fromFile(file.path);
            } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
              const workbook = xlsx.readFile(file.path);
              const sheetName = workbook.SheetNames[0];
              response = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            } else {
              return res.status(400).json({ status: 400, success: false, msg: 'Unsupported file type' });
            }
      
            for (const data of response) {
              const existingBatch = await Batch.findOne({ batch_name: data.batch_name });
      
              if (existingBatch) {
                return res.status(400).json({ status: 400, success: false, msg: 'Batch name already exists' });
              }
      
              try {
                // ...parse JSON fields as before
      
                const parsedProgram = JSON.parse(data.program);
                const parsedRole = JSON.parse(data.role);
                const parsedCoursesID = JSON.parse(data.coursesID);
      
                await Batch.create({
                  batch_name: data.batch_name,
                  description: data.description,
                  created_by: data.created_by,
                  status: data.status,
                  start_date: data.start_date,
                  end_date: data.end_date,
                  updated_on: data.updated_on,
                  program: parsedProgram,
                  role: parsedRole,
                  coursesID: parsedCoursesID
                });
              } catch (error) {
                console.error('Error parsing JSON:', error);
                return res.status(400).json({ status: 400, success: false, msg: 'Error parsing JSON' });
              }
            }
          }
      
          res.status(200).json({ status: 200, success: true, msg: 'CSVs Imported' });
        } catch (error) {
          console.error(error);
          res.status(400).json({ status: 400, success: false, msg: error.message });
        }
      };
      
