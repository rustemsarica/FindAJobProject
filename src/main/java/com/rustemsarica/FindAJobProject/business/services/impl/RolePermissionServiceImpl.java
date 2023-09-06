package com.rustemsarica.FindAJobProject.business.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.business.dto.Role.CreateRoleDto;
import com.rustemsarica.FindAJobProject.business.services.RolePermissionService;
import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity;
import com.rustemsarica.FindAJobProject.data.entities.Role.PermissionEntity;
import com.rustemsarica.FindAJobProject.data.entities.Role.RoleEntity;
import com.rustemsarica.FindAJobProject.data.repositories.Role.PermissionRepository;
import com.rustemsarica.FindAJobProject.data.repositories.Role.RoleRepository;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<PermissionEntity> getAllPermissions() {
        return permissionRepository.findAll();
    }

    @Override
    public RoleEntity createRole(CreateRoleDto createRoleDto,CompanyEntity companyEntity) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(createRoleDto.getName());
        roleEntity.setCompany(companyEntity);
        Set<PermissionEntity> set = new HashSet<>();
        for(Long permissionId : createRoleDto.getPermissions()){
            set.add(permissionRepository.findById(permissionId).get());
        }
        roleEntity.setPermissions(set);
        roleRepository.save(roleEntity);
        return roleEntity;
    }

    @Override
    public RoleEntity updateRole(CreateRoleDto createRoleDto, CompanyEntity companyEntity) {
        RoleEntity roleEntity = roleRepository.findById(createRoleDto.getRoleId()).get();
        if(roleEntity.getCompany().getId() != companyEntity.getId()){
            return roleEntity;
        }
        roleEntity.setName(createRoleDto.getName());
        Set<PermissionEntity> set = new HashSet<>();
        for(Long permissionId : createRoleDto.getPermissions()){
            set.add(permissionRepository.findById(permissionId).get());
        }
        roleEntity.setPermissions(set);
        roleRepository.save(roleEntity);
        return roleEntity;
    }

    @Override
    public RoleEntity getRole(Long roleId) {
        return roleRepository.findById(roleId).get();
    }

    @Override
    public void remove(Long roleId) {
        roleRepository.deleteById(roleId);
    }
    
}
