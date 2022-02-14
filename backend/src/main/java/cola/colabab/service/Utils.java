package cola.colabab.service;

import java.util.UUID;

public class Utils {
    // uuid 만들기
    public String createUUID() {
        String uuid = UUID.randomUUID().toString();
        return uuid;
    }
}
