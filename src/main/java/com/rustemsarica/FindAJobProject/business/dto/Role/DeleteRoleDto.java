package com.rustemsarica.FindAJobProject.business.dto.Role;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DeleteRoleDto {
    @Min(value = 0)
    private Long roleId;
    @Min(value = 0)
    private Long companyId;
}
