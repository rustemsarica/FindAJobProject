package com.rustemsarica.FindAJobProject.data.entities;

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rustemsarica.FindAJobProject.data.entities.utils.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity extends BaseEntity{
    
    private UserRole role = UserRole.ROLE_USER;

    private String name;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private int failedLoginAttempts = 0;

    @JsonIgnore
    private boolean accountNonLocked = true;

    @ManyToMany
    @JoinTable(name = "user_skills",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<SkillEntity> skills;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    private UserDetailEntity userDetail;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<WorkExperienceEntity> workExperiences;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    private UserContactInfoEntity userContactInfo;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getFailedLoginAttempts() {
        return failedLoginAttempts;
    }

    public void setFailedLoginAttempts(int failedAttempts) {
        this.failedLoginAttempts = failedAttempts;
        
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole userRole) {
        this.role = userRole;
    }

    public Set<SkillEntity> getSkills() {
        return skills;
    }

    public void setSkills(Set<SkillEntity> skills) {
        this.skills = skills;
    }

    public UserDetailEntity getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetailEntity userDetail) {
        this.userDetail = userDetail;
    }

    public List<WorkExperienceEntity> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(List<WorkExperienceEntity> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public UserContactInfoEntity getUserContactInfo() {
        return userContactInfo;
    }

    public void setUserContactInfo(UserContactInfoEntity userContactInfo) {
        this.userContactInfo = userContactInfo;
    }
    
    
}
