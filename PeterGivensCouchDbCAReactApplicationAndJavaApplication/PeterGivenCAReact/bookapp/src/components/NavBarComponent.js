import React, {Component} from 'react';









class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed :true,
            setCollapesd :true
        };

    }


    

       
      
 
        render() {
            

return (

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" style = {{color: 'white'}}>BookReviewIt</a>



  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link " href="#">About us</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  );
}
}


    export default NavBarComponent;