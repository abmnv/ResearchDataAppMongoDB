const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fsp = require('fs-promise');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Project} = require('./models/Project');

const app = express();
app.use(bodyParser.json());

const upload = multer({dest: './uploads/'});

app.get('/projects', (req, res) => {
  Project.find({}, (err, docs) => {
    if(err) {
      res.status(400).send(err);
    }else{
      res.send(docs);
    }
  });
});

app.post('/projects/:projectId/files', upload.array('files', 1), (req, res) => {
  const projectId = req.params.projectId;

  Project.findById(projectId).then((project) => {
    //console.log('project:', project);
    const file = req.files[0];
    //console.log('req.files:', req.files);
    //const path = `./public/${projectId}/${file.originalname}`;
    project.files.push({name: file.originalname, path: file.path, projectId});
    return project.save();
  }).then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.delete('/projects/:projectId/files/:fileId', (req, res) => {
  const projectId = req.params.projectId;
  const fileId = req.params.fileId;
  //let fileDoc;
  //let myProject;
  let myDoc;

  Project.findById(projectId).then((project) => {

    if(!project){
      throw new Error('NotFound');
      //return new res.status(404).send();
    }
    //myProject = project;
    console.log('project:', project);

    myDoc = project.files.id(fileId);
    console.log('inside findById doc:', myDoc);
    if(!myDoc){
      throw new Error('NotFound');
    }

    //return project.files.pull(fileId);
    project.files.id(fileId).remove();
    return project.save();
  }).then((docs) => {

    res.send(myDoc);
  }).catch((err) => {
    if(err.message === 'NotFound'){
      return res.status(404).send();
    }
    res.status(400).send(err);
  });
});

app.patch('/projects/:projectId', (req, res) => {
  console.log('req.body:', req.body);
  const body = _.pick(req.body, ['title', 'description']);
  console.log('body:', body);

  Project.findByIdAndUpdate(req.params.projectId, {$set: body}, {new: true}).then((doc) => {
    if(!doc){
      return res.status(404).send();
    }
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.delete('/projects/:projectId', (req, res) => {
  console.log('projectId:', req.params.projectId);
  Project.findByIdAndRemove(req.params.projectId).then((doc) => {
    console.log('doc:', doc);
    if(!doc){
      return res.status(404).send();
    }

    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post('/projects', upload.fields([{
  name: 'dataFiles',
  maxCount: 20
}, {
  name: 'logo',
  maxCount: 1
}]), (req, res) => {
  //console.log(req.body);
  //console.log(req.files.logo);

  const body = _.pick(req.body, ['title', 'description']);
  const project = new Project(body);
  project.createdAt = new Date().getTime();
  //console.log('project:', project);

  const projectId = project._id;

  if(req.files.dataFiles){
    req.files.dataFiles.forEach((file) => {
      project.files.push({name: file.originalname, path: file.path, projectId});
    });
  }
  
  if(req.files.logo){
    project.logo = {
      name: req.files.logo[0].originalname,
      path: req.files.logo[0].path
    };
  }else{
    project.logo = {
      name: null,
      path: null
    }
  }

  project.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log("Server started on port", PORT);
});
