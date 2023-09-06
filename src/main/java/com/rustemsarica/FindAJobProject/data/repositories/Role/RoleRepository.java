package com.rustemsarica.FindAJobProject.data.repositories.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.FindAJobProject.data.entities.Role.RoleEntity;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long>{
    
}
