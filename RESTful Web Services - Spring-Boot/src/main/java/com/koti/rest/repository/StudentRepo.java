package com.koti.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.koti.rest.entity.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {
	
	List<Student> findByUserName(String userName);

}
