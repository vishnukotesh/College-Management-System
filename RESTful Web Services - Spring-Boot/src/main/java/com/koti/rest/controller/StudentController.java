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
import com.koti.rest.entity.Student;
import com.koti.rest.repository.CourseRepo;
import com.koti.rest.repository.StudentRepo;

@RestController
public class StudentController {
	
	@Autowired
	StudentRepo studentRepo;
	
	@Autowired
	CourseRepo courseRepo;
	
	@PostMapping("/students")
	public ResponseEntity<Student> createStudent(@RequestBody Student student) {
		Student savedStudent=studentRepo.save(student);
		java.net.URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("{id}").buildAndExpand(savedStudent.getId()).toUri();
		
		
		return ResponseEntity.created(location).body(savedStudent);
	}
	
	@GetMapping("/students/total")
	public String getTotalCountOfStudents() {
		List <Student> students= studentRepo.findAll();
		if(students.size()==0) {
			return "0";
		}
		return Integer.toString(students.size());
	}
	
	@GetMapping("/students/validate/username/{userName}")
	public String isStudentUserNameValid(@PathVariable String userName) {
		List<Student> students=studentRepo.findByUserName(userName);
		
		if(students.size()==0) {
			return "valid";
		}
		
		return students.get(0).getUserName().toString();
	}
	
	@GetMapping(path="/students/password/{userName}")
	public String getStudentPasswordByUserName(@PathVariable String userName) {
		
		if(userName==null) {
			return "no username";
		}
		List<Student> students=studentRepo.findByUserName(userName);
		if(students.size()==0) {
			return "no username";
		
		}
		
		return students.get(0).getPassword().toString();
		
	}
	
	@GetMapping(path="/students/{userName}")
	public ResponseEntity<Student> getStudentByUserName(@PathVariable String userName) {
		
		List<Student> students=studentRepo.findByUserName(userName);
		if(students.size()==0) {
			return ResponseEntity.noContent().build();
		
		}
		
		return new ResponseEntity<Student>(students.get(0), HttpStatus.OK);
		
	}
	
	@PutMapping(path="/students/update/{userName}")
	public ResponseEntity<Student> updateStudentDetailsByUserName(@RequestBody Student studentBody,@PathVariable String userName) {
		List<Student> students=studentRepo.findByUserName(userName);
		Student student = students.get(0);
		student.setEmailID(studentBody.getEmailID());
		student.setFirstName(studentBody.getFirstName());
		student.setLastName(studentBody.getLastName());
		student.setUserName(studentBody.getUserName());
		student.setPassword(studentBody.getPassword());
		Student updatedStudent = studentRepo.save(student);
		return ResponseEntity.ok(updatedStudent);
	}
	
	@PutMapping("/students/addCourseForStudent/{userName}/{courseCode}")
	public ResponseEntity<String> addCourseForStudent(@PathVariable String userName,@PathVariable String courseCode) {
		
		
		Student student=studentRepo.findByUserName(userName).get(0);
		Course course=courseRepo.findByCourseCode(courseCode).get(0);
		
		student.addCourse(course);
		course.addStudent(student);
		Student updatedStudent =studentRepo.save(student);
		Course updatedCourse = courseRepo.save(course);
		
		
		return new ResponseEntity("Successfully added",HttpStatus.CREATED);
		
	}
	
	@PutMapping("/students/deleteCourseForStudent/{userName}/{courseCode}")
	public ResponseEntity<String> deleteCourseForStudent(@PathVariable String userName,@PathVariable String courseCode) {
		
		
		Student student=studentRepo.findByUserName(userName).get(0);
		Course course=courseRepo.findByCourseCode(courseCode).get(0);
		
		student.removeCourse(course);
		course.removeStudent(student);
		Student updatedStudent =studentRepo.save(student);
		Course updatedCourse = courseRepo.save(course);
		
		
		return new ResponseEntity("Successfully removed",HttpStatus.CREATED);
		
	}
	
	@DeleteMapping(path="/students/delete/{userName}")
	public String deleteStudentByUserName(@PathVariable String userName) {
		
		Student student=studentRepo.findByUserName(userName).get(0);
		
		List<Course> coursesForThisStudent =student.getCourses();
		if(coursesForThisStudent.size()==0) {
			studentRepo.delete(student);
			return "ok deleted";
		}
		else {
			for(Course course:student.getCourses()) {
				course.removeStudent(student);
			}	
		}
		studentRepo.delete(student);
		return "ok deleted";

	}
	
	@GetMapping("/students/{userName}/courses")
	public List<Course> getAllCourseForAStudent(@PathVariable String userName){
		
		return studentRepo.findByUserName(userName).get(0).getCourses();
		
	}
	
	@GetMapping(path = "/students")
	public List<Student> getAllStudents(){
		
		return studentRepo.findAll();
	}

	

}
