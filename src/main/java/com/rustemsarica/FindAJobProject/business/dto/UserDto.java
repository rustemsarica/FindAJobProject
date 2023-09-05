package com.rustemsarica.FindAJobProject.business.dto;

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

}
