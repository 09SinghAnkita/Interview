const express = require('express');
const fs = require("fs");
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/branch:branchId', (req, res) => {
    const branch = JSON.parse(fs.readFileSync(`data/branch${req.params.branchId}.json`, 'utf8'))
    if (branch) {
        return res.status(200).json({ products: branch.products });
    }
    else {
        return res.status(404).json({ message: `File not available` })
    }
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});