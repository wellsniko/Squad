const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Squad = require('../../models/Squad');
const User = require('../../models/User')
const validateSquadInput = require('../../validation/squads');

router.get('/', (req, res) => {
    Squad.find()
        .sort({ date: -1 })
        .then(squads => res.json(squads))
        .catch(err => res.status(404).json({ nosquadsfound: 'No squads found' }));
});

router.get('/user/:user_id', (req, res) => {
    Squad.find({user: req.params.user_id})
        .then(squads => res.json(squads))
        .catch(err =>
            res.status(404).json({ nosquadsfound: 'No squads found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Squad.findById(req.params.id)
        .then(squad => res.json(squad))
        .catch(err =>
            res.status(404).json({ nosquadfound: 'No squad found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateSquadInput(req.body);
      // console.log(req.user.id)
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newSquad = new Squad({
        leader: req.user.id,
        name: req.body.name,
        generalBio: req.body.generalBio,
        members: req.user.id
      });
  
      newSquad.save().then(squad => res.json(squad));
    } 
  );

// router.patch('/:id', (req, res) => {
//   const squad = Squad.findById(req.params.id)
  
// })

// 5fea74db4ab7ef31c0b94a37
// 5fea7355a8e58e3104bf79f7

router.put("/:id", (req, res) => {
  if (req.body.type === 'addRequest'){
    let id = req.params.id;  //body
    let update = { $push: { requests: req.body.newMemberId }}
    Squad.findByIdAndUpdate(id, update, {new: true})
    .then(squad => res.json(squad));
  }

  if (req.body.type === 'declineRequest') {
    let id = req.params.id;
    let remove = { $pull: { requests: req.body.newMemberId }}
    Squad.findByIdAndUpdate(id, remove, {new: true}).then(squad => res.json(squad));
  }

  if (req.body.type === 'acceptMember') {
    let id = req.params.id;    
    // let remove = { $pull: { requests: req.body.newMemberId }}
    // Squad.findByIdAndUpdate(id, remove, {new: true})
    let update = { $push: { members: req.body.newMemberId }, $pull: { requests: req.body.newMemberId }};
    Squad.findByIdAndUpdate(id, update, { new: true } ).then(squad => res.json(squad));
  }

  if (req.body.type === 'removeMember') {
    let id = req.params.id;
    let remove = { $pull: { members: req.body.newMemberId }}
    Squad.findByIdAndUpdate(id, remove, {new: true}).then(squad => res.json(squad));
  }


});

// addRequest declineRequest declineMember removeMember 

















// 5fea1c8b721efa6fc37480bd

module.exports = router;

//squadid
//5fea29a7ec6c0280f5fefdf3
//newUseId
//5fe976e157c91efde5f904dd