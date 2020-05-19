/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require('express');

const Actions = require('./data/helpers/actionModel.js');

const Projects = require('./data/helpers/projectModel.js');

const server = express();

server.use(express.json());

const PORT = 6050;

server.listen(PORT, () => {
   console.log(`listening on http://localhost:${PORT}`);
})

server.get('/', (req,res) => {
    res.send(`
      Welcome to the API
    `)
})

//Actions Endpoints
//-------------------------------------------------------------------------------------------------
//Get

server.get('/api/actions', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        console.logy(error);
        res.status(500).json({
            message: 'The actions information could not be retrieved.'
        })
    })
})
// Get by ID

server.get('/api/actions/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if(action) {
        res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'The action wth specified ID does not exist'
            })
        }
    })
    .catch(error => {
        console.logy(error);
        res.status(500).json({
            message: 'The action information could not be retrieved.'
        })
    })
})
//Post

server.post('/api/actions', (req, res) => {
     Actions.insert(req.body)
    .then(action => {  
        res.status(201).json(action)  
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'There was an error while saving the action to the database',
        });
    });
})
//Update

server.put('/api/actions/:id', (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
    .then(action => {
        if (action) {
            res.status(200).json(action);
          } else {
            res.status(404).json({ message: 'The action with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The action information could not be modified.',
        });
      }); 
})
//Delete

server.delete('/api/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The action has been nuked' });
          } else {
            res.status(404).json({ message: 'The action with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The action could not be removed',
        });
    });
});
//Projects Endpoints
//---------------------------------------------------------------------------
//Get

server.get('/api/projects', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        console.logy(error);
        res.status(500).json({
            message: 'The projects information could not be retrieved.'
        })
    })
})
// Get by ID

server.get('/api/projects/:id', (req, res) => {
    Projects.get(req.query)
    .then(project => {
        if(project) {
        res.status(200).json(project);
        } else {
            res.status(404).json({
                message: 'The project wth specified ID does not exist'
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'The project information could not be retrieved.'
        })
    })
})
// Get project actions

server.get('/api/projects/:id/actions', (req, res) => {
    console.log(req.params.id)
    Projects.getProjectActions(req.params.id)
    .then(project => {
        if(project) {
        res.status(200).json(project);
        } else {
            res.status(404).json({
                message: 'The project wth specified ID does not exist'
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'The project actions information could not be retrieved.'
        })
    })
})
//Post

server.post('/api/projects', (req, res) => {
    Projects.insert(req.body)
    .then(project => {  
        res.status(201).json(project)  
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'There was an error while saving the project to the database',
        });
    });
})
//Update

server.put('/api/projects/:id', (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
    .then(project => {
        if (project) {
            res.status(200).json(project);
          } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The project information could not be modified.',
        });
      }); 
})
//Delete

server.delete('/api/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The project has been nuked' });
          } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The project could not be removed',
        });
    });
});