package com.ecommerceuas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
import com.ecommerceuas.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/products/**", "/files/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/products/checkout").permitAll()

                .requestMatchers(HttpMethod.POST, "/products/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/products/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/products/**").hasAuthority("ADMIN")
                .requestMatchers("/files/**").hasAuthority("ADMIN")
                
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .authenticationProvider(authenticationProvider());

        return http.build();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // PERBAIKAN UTAMA ADA DISINI:
        // Gunakan Constructor Injection (masukkan variable ke dalam kurung)
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}