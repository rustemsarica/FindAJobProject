package com.rustemsarica.FindAJobProject.business.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserContactInfoDto {
    private String phone;

    private String linkedin;

    private String github;
    
    private String url;
}
