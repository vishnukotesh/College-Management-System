package com.koti.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.koti.rest.entity.Course;

public interface CourseRepo extends JpaRepository<Course, Integer> {
	
	List<Course> findByCourseCode(String courseCode);

}
