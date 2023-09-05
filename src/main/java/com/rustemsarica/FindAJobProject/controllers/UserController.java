package com.rustemsarica.FindAJobProject.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.FindAJobProject.business.dto.UserContactInfoDto;
import com.rustemsarica.FindAJobProject.business.dto.UserDetailDto;
import com.rustemsarica.FindAJobProject.business.dto.UserDto;
import com.rustemsarica.FindAJobProject.business.services.UserContactInfoService;
import com.rustemsarica.FindAJobProject.business.services.UserDetailService;
import com.rustemsarica.FindAJobProject.business.services.UserService;
import com.rustemsarica.FindAJobProject.data.entities.UserEntity;


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService userServices;

    @Autowired
    UserDetailService userDetailService;

    @Autowired
    UserContactInfoService userContactInfoService;

    @GetMapping
    public ResponseEntity<?> users(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<UserEntity> response = userServices.getAllUsersPaginate(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId){
        return userServices.getUserById(userId);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        return userServices.deleteUser(userId);
    }

    @PutMapping("/{userId}/detail/update")
    public ResponseEntity<?> updateUserDetail(@PathVariable Long userId, @RequestBody UserDetailDto userDetailDto){
        return userDetailService.update(userId,userDetailDto);
    }
    
    @PutMapping("/{userId}/contact/update")
    public ResponseEntity<?> updateUserContact(@PathVariable Long userId, @RequestBody UserContactInfoDto userContactInfoDto){
        return userContactInfoService.update(userId,userContactInfoDto);
    }
}
