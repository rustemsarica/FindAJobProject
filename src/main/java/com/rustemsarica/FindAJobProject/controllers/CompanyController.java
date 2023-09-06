package com.rustemsarica.FindAJobProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.FindAJobProject.business.dto.CompanyDto;
import com.rustemsarica.FindAJobProject.business.dto.Role.CreateRoleDto;
import com.rustemsarica.FindAJobProject.business.dto.Role.DeleteRoleDto;
import com.rustemsarica.FindAJobProject.business.services.CompanyService;
import com.rustemsarica.FindAJobProject.business.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/company")
@Validated
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @Autowired
    UserService userService;
    
    @PostMapping("/create")
    public ResponseEntity<?> createCompany(@RequestBody @Valid CompanyDto companyDto){
        return companyService.createCompany(companyDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompany(@PathVariable Long id){
        return ResponseEntity.ok(companyService.getCompany(id)) ;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> getCompany(@PathVariable Long id, @RequestBody @Valid CompanyDto companyDto){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null){
            Long userId = userService.getUserByUsername(auth.getName()).getId();
            if(userId != companyDto.getOwner() ){
                return ResponseEntity.notFound().build();
            }
        }
        companyService.updateCompany(id, companyDto);
        return ResponseEntity.ok("Company updated.");
        
    }

    @PostMapping("/roles/add")
    public ResponseEntity<?> addRole(@RequestBody @Valid CreateRoleDto createRoleDto){
        return companyService.addRole(createRoleDto);
    }

    @DeleteMapping("/{companyId}/roles/{roleId}/remove")
    public ResponseEntity<?> removeRole(@PathVariable Long companyId, @PathVariable Long roleId){
        System.out.println("*****************");
        System.out.println(roleId);
        System.out.println("*****************");
        return companyService.removeRole(roleId,companyId);
    }
}
