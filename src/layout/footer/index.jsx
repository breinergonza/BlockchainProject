import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    this.year = date.getFullYear()
  }
  render() {
    return (
    <footer className="page-footer font-small blue">
       <div className="footer-copyright text-center py-3">© {this.year} Copyright:  <a href="https://breinergonza.net/"> Breitner Enrique Gonzalez Angarita</a>
       </div>
    </footer>
    );
  }
}

export default Footer;