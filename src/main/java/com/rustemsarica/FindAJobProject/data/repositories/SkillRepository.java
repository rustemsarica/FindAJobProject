package com.rustemsarica.FindAJobProject.data.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.FindAJobProject.data.entities.SkillEntity;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity,Long> {

    List<SkillEntity> findByNameContaining(String name);
    
}
