import React, {Component} from 'react';
import {Table,Button,Modal, FormGroup, Label,Form,Input, ModalHeader,ModalBody,ModalTitle, ModalFooter,} from 'reactstrap' ;
import axios from 'axios';
import { thisTypeAnnotation } from '@babel/types';

class BookTableComponent extends Component {

    state = {
        books : [],
        isLoaded : null,
        updateBookModal: false,
        id : '',
        title: '',
        description: '',
        genre: '',
        author: '',
        reviewInfoModal : false,
        addReviewModal: false,
        updateReviewModal: false,
        reviews: [],
        bookId : '',
        bookTitle: '',
        name: '',
        comment: '',
        rating: 0,
        index: 0,
        noOfReviews: 0,
        reviewData: {
         name : '',
         comment : '',
         rating : 0

        },



    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
          console.log(this.state);
    };

    deleteBook(id){
        console.log(id);
        axios.delete('book/deleteBook/' + id)
    }

    setUpdateState(id,title,author,genre,description){

        this.setState({id:id, title:title, author:author, genre:genre, description:description,  updateBookModal: !this.state.updateBookModal })
    }

    updateBook(id){
        console.log(id);
        console.log(this.state.id);
        fetch('/book/updateBook/' + this.state.id ,{  
        method: 'PUT', 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id, 
         title: this.state.title, description:this.state.description,author:this.state.author,
            genre: this.state.genre
        })

    })
    this.setState({  
        updateBookModal: !this.state.updateBookModal,
        id : '',
        title: '',
        description: '',
        genre: '',
        author: ''})
 
    }

    toggleUpdateBook(){
        this.setState({

        updateBookModal: !this.state.updateBookModal})
    }

    
    toggleReviewInfo(){
        this.setState({

        reviewInfoModal: !this.state.reviewInfoModal})
    }

    toggleAddReview(){
        this.setState({
       addReviewModal: !this.state.addReviewModal
        })
    }

    toggleUpdateReviewModal(){
        this.setState({
            updateReviewModal: !this.state.updateReviewModal
        })
    }


    getReviewInfo(id,title){
          console.log(title);
        axios.get('book/getBook/' + id, {

          }).then((response) =>{
  
            this.setState({
              reviews:response.data.review, reviewInfoModal: !this.state.reviewInfoModal, bookId:response.data._id, bookTitle: response.data.title
            });
            console.log(this.state.reviews);
            console.log(title)
          });

          axios.get('book/getNoOfReviews/' + title,
          {

          }).then((response) =>{
              this.setState({noOfReviews:response.data})
              console.log(response);
          });
          console.log(this.state.noOfReviews);
        }



        addReview(){
         console.log(this.state.bookId);
         console.log(this.state);
         console.log(this.state.reviews);
            fetch('/book/addReview/' + this.state.bookId,{ 
                method: 'PUT', 
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.bookId, name: this.state.name,
                     comment: this.state.comment, rating: this.state.rating
                })
            }).then((response) => {
                window.location.reload();
                this.setState({
                     name: '', comment : '',rating: ''
    
                });
            })
                
        }

        updateReviewInfo(name,comment,rating,index){
           this.setState({ name:name, comment:comment, rating:rating, index:index, updateReviewModal: !this.state.updateReviewModal})
           console.log(name);
           console.log(rating);
           console.log(index)

        }

        updateReview(){
            fetch('/book/updateReview/' + this.state.bookId + '/' + this.state.index,{  
            method: 'PUT', 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
             name: this.state.name, comment:this.state.comment,rating:this.state.rating 
            })

    
        })
        this.setState({updateReviewModal: !this.state.updateReviewModal})

        }

        deleteReview(index){
            fetch('/book/deleteReview/' + this.state.bookId + '/' + index,{  
                method: 'POST', 
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            })
        this.setState({reviewInfoModal:!this.state.reviewInfoModal});
    }
  




    

    componentDidMount() {
        axios.get('book/getBooks')
            .then((res) => {
              this.setState({ isLoaded: true, books: res.data })
              console.log(res.data[0].review);
            });


           
      }

    render(){
        var i = 0;
  return (
    <div className="BookTable">
        <Table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>genre</th>
                    <th>author</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>Review info</th>
                </tr>
            </thead>

            <tbody>
            {this.state.books.map(book => (
                <tr>
                    <td>{book.title}</td>
                    <td>{book.description}</td>
                    <td>{book.genre}</td>
                    <td>{book.author}</td>
                    <td>
                        <Button color = "success" onClick ={this.setUpdateState.bind(this,book._id, book.title,book.author,  book.genre,book.description)}>Update</Button>
                        <Modal isOpen ={this.state.updateBookModal} toggle = {this.toggleUpdateBook.bind(this)}>
            <ModalHeader closeButton>  Update book  </ModalHeader>
            <ModalBody>
                <Form>
                <FormGroup>
                  <Label htmlFor="title">Book Title</Label>
                  <Input ref="title" type="text" name="title" value = {this.state.title} onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">Book Description</Label>
                  <Input ref="description" type="text" name="description" value = {this.state.description} onChange={(event) => this.handleChange(event)}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="genre">Genre </Label>
                  <Input  ref="genre" type="text" name="genre" value={this.state.genre} onChange={(event) => this.handleChange(event)}/>
                 </FormGroup>
                 <FormGroup>
                  <Label htmlFor="author">Author </Label>
                  <Input  ref="author" type="text" name="author" value={this.state.author} onChange={(event) => this.handleChange(event)}/>
                  </FormGroup>
                  <FormGroup>
          </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
          <Button color="danger" onClick={this.toggleUpdateBook.bind(this)} >
                Close
              </Button>
              <Button color="primary" onClick ={this.updateBook.bind(this, book._id)}>
                update Book
              </Button>
          </ModalFooter>
          </Modal>
           
                    </td>
                    <td>
                        <Button color = "danger" onClick={this.deleteBook.bind(this, book._id)} >Delete</Button>
                    </td>
                    <td>
                    
                    
                    
                    
                    <Button color = "primary" onClick = {this.getReviewInfo.bind(this, book._id, book.title)}>Review info</Button>
                    <Modal isOpen ={this.state.reviewInfoModal} toggle = {this.toggleReviewInfo.bind(this)}>
                             <ModalHeader >  all reviews for {this.state.bookTitle} : Total number of reviews is {this.state.noOfReviews}</ModalHeader>
                              <ModalBody>
                               <Button  color= 'success' onClick={this.toggleAddReview.bind(this)}> add review </Button>
                                       <Modal isOpen ={this.state.addReviewModal} toggle = {this.toggleAddReview.bind(this)}>
                                          <ModalHeader>      Add a Review for this book   </ModalHeader>
                                            <ModalBody>
                                               <Form>
                                                    <FormGroup>
                                                        <Label htmlFor="name">AddName</Label>
                                                            <Input ref="name" type="text" name="name" placeholder="please enter your username ..." onChange={(event) => this.handleChange(event)}/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="comment">Review Comment</Label>
                                                            <Input ref="comment" type="text" name="comment" placeholder="Enter the comment you would like to add ..." onChange={(event) => this.handleChange(event)}/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="rating"> Rating </Label>
                                                             <Input  ref="rating" type="text" name="rating" placeholder="Enter the rating you would like to add ..." onChange={(event) => this.handleChange(event)}/>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" onClick={this.toggleAddReview.bind(this)} >
                                                         Close
                                                    </Button>
                                                    <Button color="primary" onClick={this.addReview.bind(this)}>
                                                       Add Review
                                                    </Button>
                                                </ModalFooter>
                                        </Modal>
                        <Table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Comment</th>
                                    <th>Rating</th>
                                    <th>Update Review</th>
                                    <th>Delete Review</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {
                            this.state.reviews.map((review,index)=> 
                                <tr key ={index}>
                                    <td>{review.name}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.rating}</td>
                                    <td> <Button color = "primary" onClick = {this.updateReviewInfo.bind(this,review.name,review.comment,review.rating,index)}>Update Review</Button>
                                    <Modal isOpen ={this.state.updateReviewModal} toggle = {this.toggleUpdateReviewModal.bind(this)}>
                                      <ModalHeader closeButton>  Update  </ModalHeader>
                                        <ModalBody>
                                             <Form>
                                                 <FormGroup>
                                                      <Label htmlFor="title">User Name</Label>
                                                      <Input ref="name" type="text" name="name" value = {this.state.name} onChange={(event) => this.handleChange(event)}/>
                                                 </FormGroup>
                                                 <FormGroup>
                                                      <Label htmlFor="comment">Review Comment </Label>
                                                      <Input ref="comment" type="text" name="comment" value = {this.state.comment} onChange={(event) => this.handleChange(event)}/>
                                                 </FormGroup>
                                                 <FormGroup>
                                                       <Label htmlFor="rating">Rating</Label>
                                                       <Input  ref="rating" type="text" name="rating" value={this.state.rating} onChange={(event) => this.handleChange(event)}/>
                                                 </FormGroup>
                                             </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="danger" onClick={this.toggleUpdateReviewModal.bind(this)} >
                                                         Close
                                                    </Button>
                                                    <Button color="primary" onClick={this.updateReview.bind(this)}>
                                                       Update Review
                                                    </Button>
                                                </ModalFooter>
                                        </Modal>

                                    </td>
                                    <td>
                                    <Button color = "danger" onClick={this.deleteReview.bind(this, index)} >Delete</Button>
                                    </td>
                                </tr> 
                              )}
                                </tbody>                       
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleReviewInfo.bind(this)} >
                          Close
                        </Button>
                    </ModalFooter>
                    </Modal>
                    </td>
                </tr>
                  ))}
            </tbody>
        </Table>
 
    </div>
  );
}
}

export default BookTableComponent;