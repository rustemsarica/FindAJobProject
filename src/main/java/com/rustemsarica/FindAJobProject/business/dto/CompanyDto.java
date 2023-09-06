package com.rustemsarica.FindAJobProject.business.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CompanyDto {
    @Min(value = 1)
    private Long owner;
    
    @NotEmpty
    private String name;

    private String sector;

    private String address;

    private String province;

    private String city;

    private String location;

    private String website;
}
