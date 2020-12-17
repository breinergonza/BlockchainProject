import React, { Component, Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FormValidationText extends Component {
  constructor(props) {
    super(props);
    this.formValidation = this.formValidation.bind(this);
    this.state = {
      productNameV: null,
      productPriceV: null
    };
    const date = new Date()
    this.year = date.getFullYear()
  }
  formValidation(e) {
    let { name, value } = e.target;
    switch (name) {
      case "productName":
        value.length > 3
          ? this.setState({ productName: false, productNameV: true })
          : this.setState({ productName: true, productNameV: false });
        break;
      case "productPrice":
        value.length > 0
          ? this.setState({ productPrice: false, productPriceV: true })
          : this.setState({ productPrice: true, productPriceV: false });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Fragment>
        <div className="header">
          <h5>Carrito de compras</h5>
          <hr />
        </div>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-row">
            <div className="mb-3 col-md-4">
              <label className="">Nombre del producto</label>
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Nombre del producto"
                required />
            </div>
            <div className="mb-3 col-md-4">
              <label className="">Precio del producto (Eth)</label>
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder="Precio del producto (Eth)"
                required />

            </div>
          </div>
          <button type="submit" className="btn btn-primary">Agregar al carrito</button>
        </form>
        <p>&nbsp;</p>
        <div className="header">
          <h5>{this.props.title}</h5>
          <hr />
        </div>
        <div className="table-responsive">
          <PerfectScrollbar>
            <div className="subject-scroll" style={{ height: "340px", position: "relative" }}>
              <table className="table table-hover m-b-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Moneda</th>
                    <th>Precio</th>
                    <th>Propietario</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="productList">
                  {this.props.products.map((product, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{product.id.toString()}</th>
                        <td>{product.name}</td>
                        <td>
                          <div className="media">
                            <FontAwesomeIcon
                              className={`f-30 m-r-5 align-self-center text-c-red`}
                              icon={["fab", "ethereum"]}
                            />
                            <div className="media-body">
                              <h6 className="m-0">Etherium</h6>
                              <p className="m-0">ETH</p>
                            </div>
                          </div>
                        </td>
                        <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                        <td>{product.owner}</td>
                        <td>
                          {!product.purchased
                            ? <button
                              name={product.id}
                              value={product.price}
                              onClick={(event) => {
                                this.props.purchaseProduct(event.target.name, event.target.value)
                              }}
                              className="btn btn-primary" >
                              Pagar</button>
                            : null
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </PerfectScrollbar>
            <footer className="page-footer font-small blue">
              <div className="footer-copyright text-center py-3">© {this.year} Copyright:  <a href="https://breinergonza.net/"> Breitner Enrique Gonzalez Angarita</a>
              </div>
            </footer>
        </div>

      </Fragment>
    );
  }
}

export default FormValidationText;
