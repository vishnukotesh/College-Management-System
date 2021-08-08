package com.koti.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.koti.rest.entity.Instructor;


public interface InstructorRepo extends JpaRepository<Instructor, Integer> {
	
	List<Instructor> findByUserName(String userName);
	
	
}
