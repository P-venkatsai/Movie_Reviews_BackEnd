const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
/*.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})*/
.get((req,res,next) => {
    res.end('Will send all the leaderses to you!');
})
.post((req, res, next) => {
    res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaderses');
})
.delete((req, res, next) => {
    res.end('Deleting all leaderses');
})
leadersRouter.get('/:leadersId', (req,res,next) => {
    res.end('Will send details of the leaders: ' + req.params.leadersId +' to you!');
})

leadersRouter.post('/:leadersId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaderses/'+ req.params.leadersId);
})

leadersRouter.put('/:leadersId', (req, res, next) => {
  res.write('Updating the leaders: ' + req.params.leadersId + '\n');
  res.end('Will update the leaders: ' + req.body.name + 
        ' with details: ' + req.body.description);
})

leadersRouter.delete('/:leadersId', (req, res, next) => {
    res.end('Deleting leaders: ' + req.params.leadersId);
});
module.exports = leadersRouter;