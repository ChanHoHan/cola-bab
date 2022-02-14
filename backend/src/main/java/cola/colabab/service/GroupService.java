package cola.colabab.service;

import cola.colabab.domain.Group;
import cola.colabab.repository.RedisController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class GroupService {
    private RedisController redisController;

    @Autowired
    public GroupService(RedisController redisController) {
        this.redisController = redisController;
    }

    /**
     *
     * 새로운 그룹 생성
     * @param newData
     * @return
     */
    public String createNewGroup(ArrayList<Map<String, String>> newData) {
        //그룹 만들기
        Group group = new Group();
        String group_uuid = group.getGroup_uuid();
        if (!this.redisController.createGroup(group, newData)) return "error";
        return group_uuid;
    }

    /**
     * uuid 받아서 그룹 리스트 반환
     */
    public ArrayList<ArrayList<String> > getGroupRestaurantListsByGroupUuid(String uuid) {
        return this.redisController.getGroupRestaurantLists(uuid);
    }

    /**
     * 닉네임과 결과 받아서, 닉네임, 결과 각각 업데이트
     */
    public boolean updateResultAndNickname(Object nickname, Object result, Object groupUuid) {
        // 기존 닉네임인지 확인해서 순서 정하기
        this.redisController.addNicknameSet(nickname, groupUuid);
        this.redisController.updateNicknameResult(nickname, groupUuid, result);
        return true;
    }

    public ArrayList<ArrayList<String> > getResultLists(Object groupUuid) {
        // 그룹 uuid 받아서 result 리턴
        ArrayList<ArrayList<String> > resultList = this.redisController.getGroupResult(groupUuid);
        return resultList;
    }
}
