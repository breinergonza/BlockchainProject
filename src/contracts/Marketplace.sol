pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Proyecto Blockchain Udistrital 2020";
    }

    function createProduct(string memory _name, uint _price) public {
        // Se requiere un ombre válido
        require(bytes(_name).length > 0);
        // Se requiere un precio valido
        require(_price > 0);
        // Incrementar el recuento de productos
        productCount ++;
        // Crea el producto
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // Disparar un evento
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        // Obtener el producto
        Product memory _product = products[_id];
        // Buscar el dueño del producto
        address payable _seller = _product.owner;
        // Asegúrese de que el producto tenga una identificación válida
        require(_product.id > 0 && _product.id <= productCount);
        // Se requiere que haya suficiente Ether en la transacción
        require(msg.value >= _product.price);
        // Es requerido que el producto aún no se haya comprado
        require(!_product.purchased);
        // Se requiere que el comprador no sea el vendedor.
        require(_seller != msg.sender);
        // Transferir la propiedad al comprador
        _product.owner = msg.sender;
        // Marcar como comprado
        _product.purchased = true;
        // Actualizar el producto
        products[_id] = _product;
        // Paga al vendedor enviándole Ether
        address(_seller).transfer(msg.value);
        // Activar un evento
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}
