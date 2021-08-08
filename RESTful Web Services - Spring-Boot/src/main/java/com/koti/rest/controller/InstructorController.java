package com.koti.rest.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.koti.rest.entity.Course;
import com.koti.rest.entity.Instructor;
import com.koti.rest.repository.CourseRepo;
import com.koti.rest.repository.InstructorRepo;
import com.koti.rest.repository.StudentRepo;


@RestController
public class InstructorController {
	
	@Autowired
	InstructorRepo instructorRepo;
	
	@Autowired
	CourseRepo courseRepo;
	
	@Autowired
	StudentRepo studentRepo;
	
	@PostMapping("/instructors")
	public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor) {
		Instructor savedInstructor=instructorRepo.save(instructor);
		java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("{id}").buildAndExpand(savedInstructor.getId()).toUri();
		
		
		return ResponseEntity.created(location).body(savedInstructor);
	}
	
	@GetMapping("/instructors/validate/username/{userName}")
	public String isInstructorUserNameValid(@PathVariable String userName) {
		List<Instructor> instructors=instructorRepo.findByUserName(userName);
		
		if(instructors.size()==0) {
			return "valid";
		}
		
		return instructors.get(0).getUserName().toString();
	}
	
	@GetMapping(path="/instructors/password/{userName}")
	public String getStudentPasswordByUserName(@PathVariable String userName) {
		
		List<Instructor> instructors=instructorRepo.findByUserName(userName);
		if(instructors.size()==0) {
			return "no username";
		
		}
		
		return instructors.get(0).getPassword();
		
	}
	
	@GetMapping(path="/instructors/{userName}")
	public ResponseEntity<Instructor> getInstructorById(@PathVariable String userName) {
		
		List<Instructor> instructors=instructorRepo.findByUserName(userName);
		if(instructors.size()==0) {
			return ResponseEntity.noContent().build();
		
		}
		
		return new ResponseEntity<Instructor>(instructors.get(0), HttpStatus.OK);
		
	}
	
	@PutMapping(path="/instructors/update/{userName}")
	public ResponseEntity<Instructor> updateInstructorDetailsByUserName(@RequestBody Instructor instructorBody,@PathVariable String userName) {
		List<Instructor> instructors=instructorRepo.findByUserName(userName);
		Instructor instructor = instructors.get(0);
		instructor.setEmailID(instructorBody.getEmailID());
		instructor.setFirstName(instructorBody.getFirstName());
		instructor.setLastName(instructorBody.getLastName());
		instructor.setUserName(instructorBody.getUserName());
		instructor.setPassword(instructorBody.getPassword());
		Instructor updatedInstructor = instructorRepo.save(instructor);
		return ResponseEntity.ok(updatedInstructor);
	}
	
	@PostMapping(path="instructors/{userName}/addCourse")
	public Instructor addCourseToInstructor(@RequestBody Course courseBody, @PathVariable String userName) {
		
		Course savedCourse= courseRepo.save(courseBody);
		Instructor instructor = instructorRepo.findByUserName(userName).get(0);
		savedCourse.setInstructor(instructor);
		courseRepo.save(savedCourse);
		instructor.addCouse(savedCourse);
		return instructorRepo.save(instructor);
	}
	
	@GetMapping(path = "/instructors")
	public List<Instructor> getAllInstructors(){
		
		return instructorRepo.findAll();
	}
	
	@GetMapping("/instructors/total")
	public String getTotalCountOfInstructors() {
		List <Instructor> instructors= instructorRepo.findAll();
		if(instructors.size()==0) {
			return "0";
		}
		return Integer.toString(instructors.size());
	}
	

}
