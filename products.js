const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function load() {
  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
}

async function list({ offset = 0, limit = 25, tag } = {}) {
  let products = await load()

  if (tag) {
    products = products.filter(p =>
      p.tags?.some(t => t.title?.toLowerCase() === tag.toLowerCase())
    )
  }

  return products.slice(offset, offset + limit)
}

async function get(id) {
  const products = await load()
  return products.find(p => p.id === id) || null
}

async function create(body) {
  console.log("Creating product:", body)
  return body  // mock success
}

async function update(id, body) {
  console.log(`Updating product ${id}:`, body)
  return true
}

async function remove(id) {
  console.log(`Deleting product ${id}`)
  return true
}
