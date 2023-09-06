package com.rustemsarica.FindAJobProject.business.services;

import java.util.List;

import com.rustemsarica.FindAJobProject.business.dto.Role.CreateRoleDto;
import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity;
import com.rustemsarica.FindAJobProject.data.entities.Role.PermissionEntity;
import com.rustemsarica.FindAJobProject.data.entities.Role.RoleEntity;

public interface RolePermissionService {
    public List<PermissionEntity> getAllPermissions();
    public RoleEntity createRole(CreateRoleDto createRoleDto,CompanyEntity companyEntity);
    public RoleEntity updateRole(CreateRoleDto createRoleDto,CompanyEntity companyEntity);
    public RoleEntity getRole(Long roleId);
    public void remove(Long roleId);
}
