package cola.colabab.service;

import cola.colabab.domain.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@Service
public class GroupService {

    /*
    * 새로운 그룹 생성
    * */
    public String createNewGroup(ArrayList<Map<String, String>> newData) {

        String uuid = createUUID();
        //그룹 만들기
        return uuid;
    }

    // uuid 만들기
    public String createUUID() {
        String uuid = UUID.randomUUID().toString();
        return uuid;
    }
}
