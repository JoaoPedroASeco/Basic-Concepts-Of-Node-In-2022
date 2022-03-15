const express = require('express')
const { randomUUID } = require('crypto')
const fs = require('fs')

const app = express()
app.use(express.json())

let products = []

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
    } else {
        products = JSON.parse(data)
    }
})

/**
 * POST => Inserir um/dados dados
 * GET => Buscar um/mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para minha aplicação
 * Params => /product/:ID
 * Query => product?id=123
 */

app.post('/products', (req, res) => {
    // nome, preço

    const { name, price } = req.body

    products.push({
        name, 
        price,
        id: randomUUID()
    })

    productFile()

})

app.get('/products', ( req, res ) => {
    return res.json(products)
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id === id)

    return res.json(product)
})

app.put('/products/:id', (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    const productIndex = products.findIndex(product => product.id === id)

    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    }

    productFile()

    return res.json({message: 'Producto alterado com sucesso!'})
})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params
    const productIndex = products.findIndex(product => product.id === id)

    products.splice(productIndex, 1)

    productFile()

    return res.json({message: 'Producto deletado com sucesso!'})
})

const productFile = () => {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.error(err)
        }else {
            console.log('Produto inserido')
        }
    })
}

app.listen(4001, () => console.log('Servidor rodando na porta 4001'))