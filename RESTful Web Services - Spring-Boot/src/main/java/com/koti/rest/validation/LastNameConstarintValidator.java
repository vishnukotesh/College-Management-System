package com.koti.rest.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class LastNameConstarintValidator implements ConstraintValidator<LastName, String> {
	
	private String prefix;
	
	
	@Override
	public void initialize(LastName constraintAnnotation) {
		
		prefix=constraintAnnotation.value();
	}


	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		
		return value.startsWith(prefix);
		
		
	}

}
