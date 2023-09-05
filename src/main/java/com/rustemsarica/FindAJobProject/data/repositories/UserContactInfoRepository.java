package com.rustemsarica.FindAJobProject.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.FindAJobProject.data.entities.UserContactInfoEntity;

@Repository
public interface UserContactInfoRepository extends JpaRepository<UserContactInfoEntity,Long> {
    
}
