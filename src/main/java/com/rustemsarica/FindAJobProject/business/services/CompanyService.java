package com.rustemsarica.FindAJobProject.business.services;

import org.springframework.http.ResponseEntity;

import com.rustemsarica.FindAJobProject.business.dto.CompanyDto;
import com.rustemsarica.FindAJobProject.business.dto.Role.CreateRoleDto;
import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity;

import jakarta.validation.Valid;

public interface CompanyService {
    public ResponseEntity<?> createCompany(CompanyDto companyDto);

    public CompanyEntity getCompany(Long id);

    public ResponseEntity<?> updateCompany(Long id, @Valid CompanyDto companyDto);

    public ResponseEntity<?> addRole(CreateRoleDto createRoleDto);

}
