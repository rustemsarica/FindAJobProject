package com.rustemsarica.FindAJobProject.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rustemsarica.FindAJobProject.data.entities.WorkExperienceEntity;

public interface WorkExperienceRepository extends JpaRepository<WorkExperienceEntity, Long>{
    
}
