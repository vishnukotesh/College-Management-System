package com.koti.rest.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = LastNameConstarintValidator.class)
@Retention(RUNTIME)
@Target({ FIELD, METHOD })
@Documented
public @interface LastName {
	
	public String value() default "VIS";
	
	public String message() default "Last Name should start with VIS";
	
	 Class<?>[] groups() default { };

	    Class<? extends Payload>[] payload() default { };
	

}
