const mongoose = require('mongoose');
const fsp = require('fs-promise');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  path: {
    type: String,
    required: true,
    minlength: 1
  },
  projectId: {
    type: String,
    required: true,
    minlength: 1
  },

});

FileSchema.pre('save', function (next) {

  if(this.isNew) {
    const newPath = `./public/data/${this.projectId}/${this.name}`;

    fsp.mkdirp(`./public/data/${this.projectId}`).then(() => {
    //   console.log('created dir:', `./public/${projectId}`);
      return fsp.rename(this.path, newPath);
    }).then(() => {
      this.path = newPath;
      next();
    }).catch((err) => {
      next(new Error(err));
    })
  }else{
    next();
  }
});

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  logo: {
    name: {
      type: String,
      required: false,
      // minlength: 0
    },
    path: {
      type: String,
      required: false,
      // minlength: 0
    }
  },
  files: [FileSchema]
});

ProjectSchema.pre('save', function(next) {
  if(this.isNew) {
    // console.log('inside pre save');
    // console.log('this:', this);

    if(this.logo.name){
      const newPath = `./public/data/${this._id}/${this.logo.name}`;
      fsp.mkdirp(`./public/data/${this._id}`).then(() => {
      //   console.log('created dir:', `./public/${projectId}`);
        return fsp.rename(this.logo.path, newPath);
      }).then(() => {
        this.logo.path = newPath;
        next();
      }).catch((err) => {
        next(new Error(err));
      });
    }else{
      this.logo = {
        name: 'default-project.png',
        path: './public/images/default-project.png'
      }
      next();
    }
  }else{
    next();
  }
});

const Project = mongoose.model('Project', ProjectSchema)

module.exports = {Project}
