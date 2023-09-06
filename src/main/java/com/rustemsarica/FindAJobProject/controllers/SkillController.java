package com.rustemsarica.FindAJobProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.FindAJobProject.business.services.SkillService;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    SkillService skillService;

    @GetMapping
    public ResponseEntity<?> getSkills(@RequestParam String q){
        return skillService.getSkills(q);
    }

    @PostMapping("/{userId}/addSkill")
    public ResponseEntity<?> addUserSkill(@PathVariable Long userId, @RequestParam(value = "skillId", required = true) Long skillId){
        return skillService.addSkillToUser(userId,skillId);
    }
}
