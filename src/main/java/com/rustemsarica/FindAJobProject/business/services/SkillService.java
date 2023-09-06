package com.rustemsarica.FindAJobProject.business.services;

import org.springframework.http.ResponseEntity;


public interface SkillService {
    public ResponseEntity<?> getSkills(String name);

    public ResponseEntity<?> addSkillToUser(Long userId, Long skillId);
}
