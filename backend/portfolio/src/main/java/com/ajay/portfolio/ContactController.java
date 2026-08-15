package com.ajay.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // =========================
    // SUBMIT CONTACT FORM
    // =========================
    @PostMapping
    public ResponseEntity<String> submitContact(
            @RequestBody Contact contact) {

        contactRepository.save(contact);

        return ResponseEntity.ok("Message sent successfully!");
    }

    // =========================
    // GET ALL CONTACT MESSAGES
    // =========================
    @GetMapping
    public ResponseEntity<List<Contact>> getContacts() {

        List<Contact> contacts = contactRepository.findAll();

        return ResponseEntity.ok(contacts);
    }

    // =========================
    // DELETE CONTACT MESSAGE
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable Long id) {

        if (!contactRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        contactRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}