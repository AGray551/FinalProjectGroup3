
package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for App class using JUnit 5.
 */
public class AppTest {

    /**
     * Given the application runs,
     * When main method is executed,
     * Then it should not throw any exceptions.
     */
    @Test
    public void givenApp_whenMainRuns_thenNoException() {
        assertDoesNotThrow(() -> App.main(new String[]{}), "App should run without exceptions");
    }

    /**
     * Simple sanity check.
     */
    @Test
    public void testTrueCondition() {
        assertTrue(true, "True should always be true");
    }
}

