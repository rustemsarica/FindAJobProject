package com.rustemsarica.FindAJobProject.business.dto;

import com.rustemsarica.FindAJobProject.data.entities.utils.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LoginDto {
    private Long id;
    private String token;
    private String refreshToken;
    private String name;
    private String username;
    private UserRole role;
}
