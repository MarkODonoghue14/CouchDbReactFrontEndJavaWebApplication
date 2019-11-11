import React ,{ Component} from 'react';
import {Button,Modal, FormGroup, Label,Form,Input, ModalHeader,ModalBody,ModalTitle, ModalFooter,} from 'reactstrap' ;
import './App.css'

class AddBookComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            genre:'',
            author:'',
            name:'',
            description:'',
            rating: 0,
            isLoaded: false,
            books:[],
            addBookModal: false
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
          console.log(this.state);
    };

    toggleAddBook(){
        this.setState({

        addBookModal: !this.state.addBookModal})
    }
    addBook(){

        fetch('/book/addBook',{ 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.id, title: this.state.title,
                 description: this.state.description, genre: this.state.genre,
                 author: this.state.author
            })
        }).then((response) => {
            window.location.reload();
            this.setState({
                 title: '', description : '',genre: '', author:''

            });
        })
            
    }

    render() {

        return (
            <>
            <Button color="primary" style = {{marginTop: '3%', marginBottom: '3%'}} onClick={this.toggleAddBook.bind(this)}>
                Add Book
            </Button>
            <Modal isOpen ={this.state.addBookModal} toggle = {this.toggleAddBook.bind(this)}>
            <ModalHeader closeButton>      Add a new book to  your collection     </ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                  <Label htmlFor="title">Book Title</Label>
                  <Input ref="title" type="text" name="title" placeholder="Enter the title of the book you wish to add..." onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">Book Description</Label>
                  <Input ref="description" type="text" name="description" placeholder="Enter the description of the book you wish to add..." onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="genre">Genre </Label>
                  <Input  ref="genre" type="text" name="genre" placeholder="Enter the genre of the book you wish to add..." onChange={(event) => this.handleChange(event)}/>
                 </FormGroup>
                 <FormGroup>
                  <Label htmlFor="author">Author </Label>
                  <Input  ref="author" type="text" name="author" placeholder="Enter the author of the book you wish to add..." onChange={(event) => this.handleChange(event)}/>
                  </FormGroup>
                  <FormGroup>
          </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
          <Button color="danger" onClick={this.toggleAddBook.bind(this)} >
                Close
              </Button>
              <Button color="primary" onClick={this.addBook.bind(this)}>
                Add Book
              </Button>
          </ModalFooter>
          </Modal>
           </>
           

            );}
    }


    export default AddBookComponent