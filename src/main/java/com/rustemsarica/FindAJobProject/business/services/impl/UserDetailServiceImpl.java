package com.rustemsarica.FindAJobProject.business.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.business.dto.UserDetailDto;
import com.rustemsarica.FindAJobProject.business.services.UserDetailService;
import com.rustemsarica.FindAJobProject.data.entities.UserDetailEntity;
import com.rustemsarica.FindAJobProject.data.repositories.UserDetailRepository;

@Service
public class UserDetailServiceImpl implements UserDetailService {

    @Autowired
    UserDetailRepository userDetailRepository;

    @Override
    public ResponseEntity<?> update(Long userId, UserDetailDto userDetailDto) {
        UserDetailEntity userDetailEntity = userDetailRepository.findByUserId(userId);

        userDetailEntity.setGender(userDetailDto.getGender());
        userDetailEntity.setInfo(userDetailDto.getInfo());
        userDetailEntity.setTitle(userDetailDto.getTitle());
        userDetailEntity.setMilitaryStatus(userDetailDto.isMilitaryStatus());
        UserDetailEntity savedEntity = userDetailRepository.save(userDetailEntity);

        return ResponseEntity.ok(savedEntity);
    }
    
}
