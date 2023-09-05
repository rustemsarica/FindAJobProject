package com.rustemsarica.FindAJobProject.business.services;

import org.springframework.http.ResponseEntity;

import com.rustemsarica.FindAJobProject.business.dto.UserContactInfoDto;

public interface UserContactInfoService {
    public ResponseEntity<?> update(Long userId, UserContactInfoDto userContactInfoDto);
}
