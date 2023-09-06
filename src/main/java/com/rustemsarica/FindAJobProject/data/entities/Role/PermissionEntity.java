package com.rustemsarica.FindAJobProject.data.entities.Role;

import com.rustemsarica.FindAJobProject.data.entities.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "permissions")
public class PermissionEntity extends BaseEntity{

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
