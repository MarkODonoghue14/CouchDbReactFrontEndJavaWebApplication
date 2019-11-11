package com.book;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Book {

	@JsonProperty("_id") 
    private String id;
    @JsonProperty("_rev") 
    private String revision;
    
    private String title;
    
    private String description;
     
    private String genre;
    
    private String author;
    
    private ArrayList <Review> review = new ArrayList<>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public ArrayList<Review> getReview() {
		return review;
	}

	public void setReview(ArrayList<Review> review) {
		this.review = review;
	}
	
	  public Book(String id , String revision, String title, String description, String genre, String author,
				ArrayList<Review> review) {
			super();
			this.id = id;
			this.revision = revision;
			this.title = title;
			this.description = description;
			this.genre = genre;
			this.author = author;
			this.review = review;
		}
	  
	  
	  public Book( String title, String description, String genre, String author,
				ArrayList<Review> review) {
			super();
			this.title = title;
			this.description = description;
			this.genre = genre;
			this.author = author;
			this.review = review;
		}
	  
	  public Book() {
		  
	  }
	  

	



}
