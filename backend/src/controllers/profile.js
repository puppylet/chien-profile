const mongoose = require('mongoose')
const Project = mongoose.model('Project')
const Experience = mongoose.model('Experience')
const Client = mongoose.model('Client')
const Tech = mongoose.model('Tech')
const Testimonial = mongoose.model('Testimonial')
const Skill = mongoose.model('Skill')

module.exports = (req, res) => {
  const query = {isActive: true}
  const getAllData = [
    Experience.find(query).sort({from:  -1}),
    Project.find(query),
    Client.find(query),
    Tech.find(query),
    Testimonial.find(query),
    Skill.find(query)
  ]

  Promise.all(getAllData).then(doc => {
    const data = {
      experience: doc[0],
      project: doc[1],
      client: doc[2],
      tech: doc[3],
      testimonial: doc[4],
      skill: doc[5]
    }
    res.status(200).send(data)
  })
}
