package com.ajay.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class PortfolioController {

    @GetMapping("/api/portfolio")
    public Map<String, Object> getPortfolio() {
        return Map.of(
                "name", "Ajay Nayak",
                "role", "CSE (AI & ML) Student",
                "college", "Vidya Jyothi Institute of Technology",
                "message", "Welcome to my portfolio!"
        );
    }
}