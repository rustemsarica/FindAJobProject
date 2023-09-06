package com.rustemsarica.FindAJobProject.business.dto.Role;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateRoleDto {
    @Min(value = 0)
    private Long companyId;
    @NotEmpty
    private String name;
    private List<Long> permissions;
}
