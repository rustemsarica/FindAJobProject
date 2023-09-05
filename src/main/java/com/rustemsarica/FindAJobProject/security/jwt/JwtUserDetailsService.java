package com.rustemsarica.FindAJobProject.security.jwt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rustemsarica.FindAJobProject.data.entities.UserContactInfoEntity;
import com.rustemsarica.FindAJobProject.data.entities.UserDetailEntity;
import com.rustemsarica.FindAJobProject.data.entities.UserEntity;
import com.rustemsarica.FindAJobProject.data.entities.utils.UserRole;
import com.rustemsarica.FindAJobProject.data.repositories.UserContactInfoRepository;
import com.rustemsarica.FindAJobProject.data.repositories.UserDetailRepository;
import com.rustemsarica.FindAJobProject.data.repositories.UserRepository;
import com.rustemsarica.FindAJobProject.security.jwtRequests.JwtRegisterRequest;

@Service
public class JwtUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository  userRepository;

    
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private UserContactInfoRepository userContactInfoRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = (UserEntity) userRepository.findByUsername(username).get();

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }

    public UserEntity save(JwtRegisterRequest user) {
        
        UserEntity newUser = new UserEntity();
        newUser.setName(user.getName());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        if(user.getRole().equals("ADMIN")){
            newUser.setRole(UserRole.ROLE_ADMIN);
        }
        UserEntity savedUser = userRepository.save(newUser); 

        
        UserContactInfoEntity contactInfoEntity = new UserContactInfoEntity();
        contactInfoEntity.setUser(savedUser);
        userContactInfoRepository.save(contactInfoEntity);

        UserDetailEntity userDetailEntity = new UserDetailEntity();
        userDetailEntity.setUser(savedUser);
        userDetailRepository.save(userDetailEntity);
        return savedUser;
    }

}
