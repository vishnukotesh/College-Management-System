package com.koti.rest.repository;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.koti.rest.entity.Instructor;

@Repository
@Transactional
public class InstructorRepository {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void insertInstructor(Instructor theInstructor) {
		entityManager.persist(theInstructor);
		
	}
	
	public Instructor findById(int id) {
		return entityManager.find(Instructor.class, id);
	}
	
	public Instructor updateInstructor(Instructor newInstructor) {
		
		return entityManager.merge(newInstructor);
		
	}
	
	public void deleteInstructorById(int id) {
		Instructor instructor=findById(id);
		
		entityManager.remove(instructor);
		
	}
	
	public List<Instructor> findAllInstructors() {
		TypedQuery<Instructor> query= entityManager.createQuery("select i from Instructor i",Instructor.class);
		return query.getResultList();
		
	}
	


}
