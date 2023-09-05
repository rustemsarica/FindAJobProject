package com.rustemsarica.FindAJobProject.business.dto;

import com.rustemsarica.FindAJobProject.data.entities.utils.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDetailDto {

    private Gender gender;

    private boolean militaryStatus=true;

    private String info;

    private String title;
}
