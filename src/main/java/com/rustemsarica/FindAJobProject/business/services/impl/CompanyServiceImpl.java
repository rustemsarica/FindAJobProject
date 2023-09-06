package com.rustemsarica.FindAJobProject.business.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.business.dto.CompanyDto;
import com.rustemsarica.FindAJobProject.business.dto.Role.CreateRoleDto;
import com.rustemsarica.FindAJobProject.business.services.CompanyService;
import com.rustemsarica.FindAJobProject.business.services.RolePermissionService;
import com.rustemsarica.FindAJobProject.business.services.UserService;
import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity;
import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity.CompanyEntityBuilder;
import com.rustemsarica.FindAJobProject.data.repositories.CompanyRepository;

import jakarta.validation.Valid;

@Service
public class CompanyServiceImpl implements CompanyService{

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    RolePermissionService rolePermissionService;
    
    @Override
    public ResponseEntity<?> createCompany(CompanyDto companyDto) {
        CompanyEntityBuilder companyEntityBuilder = CompanyEntity.builder();

        companyEntityBuilder.owner(userService.dtoToEntity(userService.getUserById(companyDto.getOwner()).getBody()));
        companyEntityBuilder.name(companyDto.getName());
        companyEntityBuilder.sector(companyDto.getSector());
        companyEntityBuilder.address(companyDto.getAddress());
        companyEntityBuilder.province(companyDto.getProvince());
        companyEntityBuilder.city(companyDto.getCity());
        companyEntityBuilder.location(companyDto.getLocation());
        companyEntityBuilder.website(companyDto.getWebsite());        

        companyRepository.save(companyEntityBuilder.build());

        return ResponseEntity.ok("Company created");
    }

    @Override
    public CompanyEntity getCompany(Long id) {
        return companyRepository.findById(id).get();
    }

    @Override
    public ResponseEntity<?> updateCompany(Long id, @Valid CompanyDto companyDto) {
        CompanyEntity companyEntity = getCompany(id);
        if(companyEntity.getOwner().getId() != companyDto.getOwner()){
            return ResponseEntity.notFound().build();
        }
        companyEntity.setName(companyDto.getName());
        companyEntity.setSector(companyDto.getSector());
        companyEntity.setWebsite(companyDto.getWebsite());
        companyEntity.setAddress(companyDto.getAddress());
        companyEntity.setProvince(companyDto.getProvince());
        companyEntity.setCity(companyDto.getCity());
        companyEntity.setLocation(companyDto.getLocation());
        companyRepository.save(companyEntity);
        return ResponseEntity.ok("Company updated");
    }

    @Override
    public ResponseEntity<?> addRole(CreateRoleDto createRoleDto) {

        CompanyEntity companyEntity = getCompany(createRoleDto.getCompanyId());
        if(createRoleDto.getRoleId()!=null){            
            rolePermissionService.updateRole(createRoleDto, companyEntity);
        }else{
            rolePermissionService.createRole(createRoleDto,companyEntity);
        }

        return ResponseEntity.ok("Company roles updated");        
    }

    @Override
    public ResponseEntity<?> removeRole(Long roleId, Long companyId) {
        rolePermissionService.remove(roleId);        
        return ResponseEntity.ok("Company roles updated"); 
    }

    
}
