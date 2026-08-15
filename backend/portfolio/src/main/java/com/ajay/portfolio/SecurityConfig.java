package com.ajay.portfolio;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth

                        // Public contact form
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/contact"
                        ).permitAll()

                        // Admin-only contact operations
                        .requestMatchers(
                                "/api/contact/**"
                        ).hasRole("ADMIN")

                        // Everything else
                        .anyRequest().permitAll()
                )

                .httpBasic(httpBasic -> {});

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService(
            PasswordEncoder passwordEncoder) {

        UserDetails admin = User
                .withUsername(adminUsername)
                .password(passwordEncoder.encode(adminPassword))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}