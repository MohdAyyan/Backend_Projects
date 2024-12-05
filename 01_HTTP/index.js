import express from 'express';

const app = express();

app.use(express.json());

let teaData = [];
let nextId = 1;


//add new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;

    const newTea = {
        id: nextId++,
        name,
        price
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})
//anything which come after url its name as params and in body it is req.body 
//get tea by id
app.get('/teas/:id', (req, res) => {
    const { id } = req.params;
    const tea = teaData.find(tea => tea.id === parseInt(id));
    if (!tea) {
       return res.status(404).send('Tea not found');
    } else {
        res.status(200).send(tea);
    }
})

//update tea by id
app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const { name, price } = req.body;
    const tea = teaData.find(tea => tea.id === teaId);
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

//delete tea by id
app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    teaData = teaData.filter(tea => tea.id !== teaId);
    res.status(204).send("deleted successfully");
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
