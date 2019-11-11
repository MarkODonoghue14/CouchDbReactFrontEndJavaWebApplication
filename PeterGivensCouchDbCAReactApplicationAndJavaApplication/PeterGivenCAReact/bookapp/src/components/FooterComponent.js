import React, {Component} from 'react';
import App from '../App';
import './App.css'

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){


    return(

<footer class="page-footer font-small cyan darken-3">



  <div class="footer-copyright text-center py-3">© 2019 Copyright:
    <a > Mark O Donoghue</a>
  </div>


</footer>
    );
    }
}


export default FooterComponent;