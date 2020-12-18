const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('Desplegado con exito', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('tiene un nombre', async () => {
      const name = await marketplace.name()
      assert.equal(name, 'Proyecto Blockchain Udistrital 2020')
    })
  })

  describe('Productos', async () => {
    let result, productCount

    before(async () => {
      result = await marketplace.createProduct('Escritorio Virtual', web3.utils.toWei('1', 'Ether'), { from: seller })
      productCount = await marketplace.productCount()
    })

    it('crean los productos', async () => {
      // Si es exitoso
      assert.equal(productCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'el nombre es correcto')
      assert.equal(event.name, 'Escritorio Virtual', 'El nombre es correcto')
      assert.equal(event.price, '1000000000000000000', 'el precio es correcto')
      assert.equal(event.owner, seller, 'el propietario es correcto')
      assert.equal(event.purchased, false, 'comprado con exito')

      // Error: El producto debe tener un nombre
      await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // Error: El producto debe tener un precio
      await await marketplace.createProduct('Escritorio Virtual', 0, { from: seller }).should.be.rejected;
    })

    it('listas de productos', async () => {
      const product = await marketplace.products(productCount)
      assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(product.name, 'Escritorio Virtual', 'name is correct')
      assert.equal(product.price, '1000000000000000000', 'el precio es correcto')
      assert.equal(product.owner, seller, 'el propietario es correcto')
      assert.equal(product.purchased, false, 'comprado con exito')
    })

    it('Vender productos', async () => {
      // Se le hace seguimiento al vendedor antes de la compra
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // Exitoso: El comprador realiza la compra del producto
      result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})
     
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'el id es correcto')
      assert.equal(event.name, 'Escritorio Virtual', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'el precio es correcto')
      assert.equal(event.owner, buyer, 'el propietario es correcto')
      assert.equal(event.purchased, true, 'comprado con exito')

      // Se comprueba que el vendedor recibió los fondos
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // Error: Intenta comprar un producto que no existe, es decir, el producto debe tener una identificación válida
      await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // Error: El comprador intenta comprar sin suficiente éter
      // Error: El comprador intenta comprar sin suficiente éter
      await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // Error: El implementador intenta comprar el producto, es decir, el producto no se puede comprar dos veces
      await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // Error: El comprador intenta comprar de nuevo, es decir, el comprador no puede ser el vendedor.
      await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })
})
