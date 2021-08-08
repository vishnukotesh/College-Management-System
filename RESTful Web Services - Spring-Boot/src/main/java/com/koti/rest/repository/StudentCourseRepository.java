package com.koti.rest.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.koti.rest.entity.Course;
import com.koti.rest.entity.Student;

@Repository
@Transactional
public class StudentCourseRepository {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void addStudentToCourse(int courseId, Student student){
		
		Course course=entityManager.find(Course.class, courseId);
		entityManager.persist(student);
		course.addStudent(student);
		entityManager.persist(course);
		
		
	}

}
