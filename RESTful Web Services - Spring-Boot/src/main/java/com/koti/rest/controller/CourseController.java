package com.koti.rest.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

@RestController
public class CourseController {
	
	@Autowired
	CourseRepo courseRepo;
	
	@Autowired
	InstructorRepo instructorRepo;
	
	@GetMapping(path = "/courses")
	public List<Course> getAllCourses(){
		
		return courseRepo.findAll();
	}
	
	@PostMapping("/courses")
	public ResponseEntity<Course> createCourse(@RequestBody Course course) {
		Course savedCourse=courseRepo.save(course);
		java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("{id}").buildAndExpand(savedCourse.getId()).toUri();
		
		
		return ResponseEntity.created(location).body(savedCourse);
	}  
	
	@PutMapping(path="/courses/{courseCode}/{userName}")
	public ResponseEntity<Course> updateCourseDetails(@RequestBody Course courseBody,@PathVariable String courseCode,@PathVariable String userName) {
		
		Course course=courseRepo.findByCourseCode(courseCode).get(0);
		Instructor instructor= instructorRepo.findByUserName(userName).get(0);
		course.setCourseCode(courseBody.getCourseCode());
		course.setDescription(courseBody.getDescription());
		course.setTitle(courseBody.getTitle());
		course.setInstructor(instructor);
		Course updatedCourse = courseRepo.save(course);
		return ResponseEntity.ok(updatedCourse);
		
	}
	
	@DeleteMapping(path="/courses/{courseCode}")
	public ResponseEntity<Object> deleteCourseByCourseCode(@PathVariable String courseCode) {
		Course course=courseRepo.findByCourseCode(courseCode).get(0);
		courseRepo.delete(course);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(path="/courses/{courseCode}")
	public ResponseEntity<Course> getCourseDetailsByCourseCode(@PathVariable String courseCode) {
		
		List<Course> courses=courseRepo.findByCourseCode(courseCode);
		if(courses.size()==0) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<Course>(courses.get(0), HttpStatus.OK);
		
	}
		

}
