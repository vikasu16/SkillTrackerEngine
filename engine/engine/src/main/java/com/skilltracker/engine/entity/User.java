package com.skilltracker.engine.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {

	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  @Column(name="userId")
	  private Integer id;
	  
	  @Column(name="firstName")
	  private String firstname;
	  
	  @Column(name="lastName")
	  private String lastname;
	  
	  @Column(name="userEmail")
	  private String email;
	  
	  @Column(name="password")
	  private String password;
	  
	  @Column(name="userName")
	  private String username;
	  
	  @Column(name="bioDescription")
	  private String bioDescription;
	  
	  @Column(name="createdDate")
	  private LocalDateTime createdDate;

	  
	  @OneToMany(mappedBy = "user")
	  private List<Skill> skills;
	  
	  @Override
	  public Collection<? extends GrantedAuthority> getAuthorities() {
	    return null;
	  }

	  @Override
	  public String getPassword() {
	    return password;
	  }

	  @Override
	  public String getUsername() {
	    return email;
	  }

	  @Override
	  public boolean isAccountNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isAccountNonLocked() {
	    return true;
	  }

	  @Override
	  public boolean isCredentialsNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isEnabled() {
	    return true;
	  }

}
