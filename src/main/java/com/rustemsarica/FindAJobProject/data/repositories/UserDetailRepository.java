package com.rustemsarica.FindAJobProject.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.FindAJobProject.data.entities.UserDetailEntity;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetailEntity,Long> {

    UserDetailEntity findByUserId(Long userId);
    
}
