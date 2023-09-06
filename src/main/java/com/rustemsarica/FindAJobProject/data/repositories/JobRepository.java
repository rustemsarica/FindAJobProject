package com.rustemsarica.FindAJobProject.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.FindAJobProject.data.entities.JobEntity;

@Repository
public interface JobRepository extends JpaRepository<JobEntity,Long>{
    
}
