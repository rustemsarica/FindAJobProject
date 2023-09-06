package com.rustemsarica.FindAJobProject.business.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.business.services.SkillService;
import com.rustemsarica.FindAJobProject.data.entities.SkillEntity;
import com.rustemsarica.FindAJobProject.data.entities.UserEntity;
import com.rustemsarica.FindAJobProject.data.repositories.SkillRepository;
import com.rustemsarica.FindAJobProject.data.repositories.UserRepository;

@Service
public class SkillServiceImpl  implements SkillService{

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<?> getSkills(String name) {
        List<SkillEntity> skills = skillRepository.findByNameContaining(name);
        
        return ResponseEntity.ok(skills);
    }

    @Override
    public ResponseEntity<?> addSkillToUser(Long userId, Long skillId) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        Optional<SkillEntity> skillOptional = skillRepository.findById(skillId);
        if (userOptional.isPresent() && skillOptional.isPresent()) {
            UserEntity user = userOptional.get();
            SkillEntity skill = skillOptional.get();
    
            user.getSkills().add(skill);
            userRepository.save(user);
    
            return ResponseEntity.ok("Kullanıcıya beceri eklendi: " + skill.getName());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
