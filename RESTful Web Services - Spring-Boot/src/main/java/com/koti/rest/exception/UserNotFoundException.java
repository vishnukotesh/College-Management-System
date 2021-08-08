package com.koti.rest.exception;

//@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(String message) {
		super(message);
		
	}

}
