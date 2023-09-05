package com.rustemsarica.FindAJobProject.business.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.business.dto.UserContactInfoDto;
import com.rustemsarica.FindAJobProject.business.services.UserContactInfoService;
import com.rustemsarica.FindAJobProject.data.entities.UserContactInfoEntity;
import com.rustemsarica.FindAJobProject.data.repositories.UserContactInfoRepository;

@Service
public class UserContactInfoServiceImpl implements UserContactInfoService {

    @Autowired
    UserContactInfoRepository userContactInfoRepository;

    @Override
    public ResponseEntity<?> update(Long userId, UserContactInfoDto userContactInfoDto) {
        UserContactInfoEntity userContactInfoEntity = userContactInfoRepository.findByUserId(userId);

        userContactInfoEntity.setGithub(userContactInfoDto.getGithub());
        userContactInfoEntity.setLinkedin(userContactInfoDto.getLinkedin());
        userContactInfoEntity.setPhone(userContactInfoDto.getPhone());
        userContactInfoEntity.setUrl(userContactInfoDto.getUrl());
        UserContactInfoEntity savedEntity = userContactInfoRepository.save(userContactInfoEntity);

        return ResponseEntity.ok(savedEntity);
    }
    
}
