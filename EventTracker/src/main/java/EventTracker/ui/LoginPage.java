package EventTracker.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginPage {

    @GetMapping("/login")
    public String hello() {
        return "This is the login page!";
    }
}