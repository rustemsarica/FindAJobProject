package com.rustemsarica.FindAJobProject.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rustemsarica.FindAJobProject.data.entities.SkillEntity;

public interface SkillRepository extends JpaRepository<SkillEntity,Long> {
    
}
