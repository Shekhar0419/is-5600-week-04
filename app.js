// app.js
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 3000
const app = express()

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(middleware.cors)
app.use(bodyParser.json())

// Routes
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)

// 404 + error handlers (must be AFTER routes)
app.use(middleware.notFound)
app.use(middleware.handleError)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
