package com.rustemsarica.FindAJobProject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.FindAJobProject.business.services.RolePermissionService;
import com.rustemsarica.FindAJobProject.data.entities.Role.PermissionEntity;

@RestController
@RequestMapping("/role-permission")
public class RolePermissionController {
    @Autowired
    RolePermissionService rolePermissionService;

    @GetMapping("/permissions")
    public ResponseEntity<List<PermissionEntity>> getAllPermissions(){
        return ResponseEntity.ok(rolePermissionService.getAllPermissions());
    }
}
