package com.book;

import java.util.List;

import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.ViewResult;
import org.ektorp.support.CouchDbRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Repository
public class BookDAO extends CouchDbRepositorySupport<Book>  {

	@Autowired
	public BookDAO(CouchDbConnector  db) {
		super(Book.class,db);
		initStandardDesignDocument();
	}
	
	
	public int getNoOfReviews(String title) {
		ViewQuery query = createQuery("noOfReviews")
				.group(true)
		        .dbPath(db.path())
		        .designDocId(stdDesignDocumentId)
		        .key(title);
		ViewResult noOfReviews = db.queryView(query);
		return noOfReviews.getRows().get(0).getValueAsInt();
		
		
	}
	
	

}
