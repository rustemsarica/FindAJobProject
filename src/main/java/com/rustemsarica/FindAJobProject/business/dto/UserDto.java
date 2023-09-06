package com.rustemsarica.FindAJobProject.business.dto;

import java.util.List;
import java.util.Set;

import com.rustemsarica.FindAJobProject.data.entities.CompanyEntity;
import com.rustemsarica.FindAJobProject.data.entities.SkillEntity;
import com.rustemsarica.FindAJobProject.data.entities.UserContactInfoEntity;
import com.rustemsarica.FindAJobProject.data.entities.UserDetailEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
   
    private Long id;
    
    private String name;

    private String username;

    private UserDetailEntity userDetail;

    private UserContactInfoEntity userContactInfo;

    private Set<SkillEntity> skills;

    private List<CompanyEntity> companies;

}
