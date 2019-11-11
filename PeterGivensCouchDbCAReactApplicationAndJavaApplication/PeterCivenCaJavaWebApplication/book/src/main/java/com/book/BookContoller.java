package com.book;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookContoller {

	@Autowired
	private BookDAO bookDao;

	@RequestMapping(method = RequestMethod.GET, value = "/addTest")
	public void addBookTest() {
		
		Review review = new Review("Paul","excellent book", 5);
		ArrayList <Review>bla = new ArrayList();
		bla.add(review);
		
		Book book = new Book("Titanic","In-depth look at history of titanic", "History","Paul",bla);
		bookDao.add(book);
		
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/addBook")
	public void addBook(@RequestBody Book book) {
	try {
		bookDao.add(book);
	}
	catch	(Exception e) {

	}
		
	}
	
	
	@RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/getBooks")
	public List<Book> getBooks() {
		List<Book> allBooks = new ArrayList<>();
		allBooks = bookDao.getAll();
		return allBooks;
	}
	
	@RequestMapping(method = RequestMethod.GET,produces = "application/json", value = "/getBook/{id}")
	public Book getBook(@PathVariable("id") String id) {
		Book book = new Book();
		book = bookDao.get(id);
		return book;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value="/deleteBook/{id}")
		public void deleteBook(@PathVariable("id") String id) {
		Book book = bookDao.get(id);
		bookDao.remove(book);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/updateBook/{id}")
	public void updateBook(@RequestBody Book book, @PathVariable("id") String id)
	{ 
		Book retrievedBook =bookDao.get(id);
		retrievedBook.setAuthor(book.getAuthor());
		retrievedBook.setDescription(book.getDescription());
		retrievedBook.setTitle(book.getTitle());
		retrievedBook.setGenre(book.getGenre());
		bookDao.update(retrievedBook);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/addReview/{id}")
	public void addReview(@RequestBody Review review, @PathVariable("id")String id) {
		Book retrievedBook = bookDao.get(id);
		retrievedBook.getReview().add(review);
		bookDao.update(retrievedBook);
	}
	
	
	@RequestMapping(method = RequestMethod.PUT, value="/updateReview/{id}/{index}")
		public void updateReview(@RequestBody Review review, @PathVariable("id") String id,
				@PathVariable("index") int index) {
			Book retrievedBook = bookDao.get(id);
			retrievedBook.getReview().get(index).setComment(review.getComment());
			retrievedBook.getReview().get(index).setName(review.getName());
			retrievedBook.getReview().get(index).setRating(review.getRating());
			bookDao.update(retrievedBook);
			
		}
	
	@RequestMapping(method = RequestMethod.POST, value= "/deleteReview/{id}/{index}")
	public void deleteReview(@PathVariable("id") String id,@PathVariable("index") int index) {
		Book retrievedBook = bookDao.get(id);
		retrievedBook.getReview().remove(index);
		bookDao.update(retrievedBook);
	}
	
	@RequestMapping(method = RequestMethod.GET , value="/getNoOfReviews/{title}")
	public int getNoOfReviews(@PathVariable String title) {
		
		return bookDao.getNoOfReviews(title);
		
		
	}
	  
	}
	
	
	
	
	
	
	

