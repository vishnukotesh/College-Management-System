package com.koti.rest.authentication;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.koti.rest.entity.Instructor;
import com.koti.rest.entity.Student;
import com.koti.rest.repository.InstructorRepo;
import com.koti.rest.repository.StudentRepo;

@RestController
public class BasicAuthenticationController {
	
	@Autowired
	StudentRepo studentRepo;
	
	@Autowired
	InstructorRepo instructorRepo;
	
	@GetMapping(path="/authenticateStudent/{userName}/{password}")
	public String authenticateStudent(@PathVariable String userName, @PathVariable String password) {
		
		List<Student> students=studentRepo.findByUserName(userName);
		if(students.size()==0) {
			return "not valid";
		}
		
		for(Student s:students) {
			if(s.getPassword().equals(password)) {
				return "valid";
			}
		}
		return "not valid";
		
	}
	
	@GetMapping(path="/authenticateInstructor/{userName}/{password}")
	public String authenticateInstructor(@PathVariable String userName, @PathVariable String password) {
		
		List<Instructor> instructors=instructorRepo.findByUserName(userName);
		
		if(instructors.size()==0) {
			return "not valid";
		}
		
		for(Instructor i:instructors) {
			if(i.getPassword().equals(password)) {
				return "valid";
			}
		}
		return "not valid";
		
	}

}
