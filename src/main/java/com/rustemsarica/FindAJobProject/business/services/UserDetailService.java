package com.rustemsarica.FindAJobProject.business.services;

import org.springframework.http.ResponseEntity;

import com.rustemsarica.FindAJobProject.business.dto.UserDetailDto;

public interface UserDetailService {
    public ResponseEntity<?> update(Long userId, UserDetailDto userDetailDto);
}
