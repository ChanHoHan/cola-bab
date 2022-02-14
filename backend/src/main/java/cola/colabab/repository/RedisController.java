package cola.colabab.repository;

import cola.colabab.domain.Group;
import cola.colabab.service.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Repository
public class RedisController {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private Utils utils;
    private ArrayList<String> restaurantTemplate = new ArrayList<>(Arrays.asList("address_name", "category_group_code", "category_group_name", "category_name", "distance", "id", "phone", "place_name", "place_url", "road_address_name", "x", "y"));

    @Autowired
    public RedisController() {
        this.utils = new Utils();
    }

    // 메인 화면 -> 디테일 화면

    private boolean createGroupUUID(Group group) {
        try {
            String groupUuid = group.getGroup_uuid(); // 방 uuid 생성
            HashOperations<String, String, String> stringStringStringHashOperations = redisTemplate.opsForHash();
            stringStringStringHashOperations.put(groupUuid, "nickname", group.getNickname_uuid()); // nicknames set 저장을 위한 UUID
            stringStringStringHashOperations.put(groupUuid, "restaurant_lists", group.getRestaurant_uuid()); // restaurants list 저장을 위한 UUID
            stringStringStringHashOperations.put(groupUuid, "result", group.getRestaurant_uuid()); // result list 저장을 위한 UUID
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private String createRestaurantListsElement(Map<String, String> restaurantData) {
        String transformedRestaurant = "";
        for (int i = 0 ; i < restaurantTemplate.size() ; i++) {
            transformedRestaurant += restaurantData.get(restaurantTemplate.get(i));
            transformedRestaurant += "\n\n";
        }
        System.out.println(transformedRestaurant);
        return transformedRestaurant;
    }

    private boolean createRestaurantLists(ArrayList<Map<String, String> > data, Group group) {
        try {
            data.forEach(
                    restaurantData-> {
                        redisTemplate.opsForList().rightPush(group.getRestaurant_uuid(), createRestaurantListsElement(restaurantData));
                    }
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // nickName uuid 받아오기
    private String getNicknameUuidByGroupUuid(String groupUuid) {
        HashOperations<String, String, String> stringStringStringHashOperations = redisTemplate.opsForHash();
        return stringStringStringHashOperations.get(groupUuid, "nickname");
    }

    // restaurant uuid 받아오기
    private String getRestaurantUuidByGroupUuid(String groupUuid) {
        HashOperations<String, String, String> stringStringStringHashOperations = redisTemplate.opsForHash();
        return stringStringStringHashOperations.get(groupUuid, "restaurant_lists");
    }

    // result uuid 받아오기
    private String getResultUuidByGroupUuid(String groupUuid) {
        HashOperations<String, String, String> stringStringStringHashOperations = redisTemplate.opsForHash();
        return stringStringStringHashOperations.get(groupUuid, "result");
    }

    // 식당 리스트 받아오기
    private ArrayList<ArrayList<String> > getRestaurantListsByGroupUuid(String groupUuid) {
        String restaurantUUID = getRestaurantUuidByGroupUuid(groupUuid);
        RedisOperations<String, String> listOperations = redisTemplate.opsForList().getOperations();
        List<String> restaurantLists = listOperations.opsForList().range(restaurantUUID, 0, -1); // ArrayList
        ArrayList<ArrayList<String> > returnList = new ArrayList<>();
        for (int i = 0 ; i < restaurantLists.size() ; i++) {
            String[] tmp = restaurantLists.get(i).split("\n\n");
            ArrayList<String> tArrayList = new ArrayList<>();
            for (int j = 0 ; j < tmp.length ; j++) {
                tArrayList.add(tmp[j]);
            }
            returnList.add(tArrayList);
        }
        return returnList;
    }

    private ArrayList<String> getNicknameListsByGroupUuid(String groupUuid) {
        String nicknameUuid = getNicknameUuidByGroupUuid(groupUuid);
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        ArrayList<String> nicknameList = new ArrayList<>(setOperations.members(nicknameUuid));
        return nicknameList;
    }

    private boolean createResult(Group group, int num) {
        try {
            for (int i = 0 ; i < num ; i++) {
                redisTemplate.opsForList().rightPush(group.getResult_uuid(), "0");
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean createGroup(Group group, ArrayList<Map<String, String>> data) {
        try {
            if (createGroupUUID(group) && createRestaurantLists(data, group) && createResult(group, data.size())) {
                this.getRestaurantListsByGroupUuid(group.getGroup_uuid());
                return true;
            }
            return false;
        } catch(Exception e) {
            return false;
        }
    }


    public ArrayList<ArrayList<String> > getGroupRestaurantLists(String uuid) {
        try {
            return this.getRestaurantListsByGroupUuid(uuid);
        } catch(Exception e) {
            return new ArrayList<>();
        }
    }

    public void addNicknameSet(Object objectNickname, Object objectGroupUuid) {
        String nickname = (String)objectNickname;
        String groupUuid = (String)objectGroupUuid;
        System.out.println(nickname);
        System.out.println(groupUuid);
        String nicknameUuid = this.getNicknameUuidByGroupUuid(groupUuid);
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.add(nicknameUuid, nickname);
    }

    public void updateNicknameResult(Object objectNickname, Object objectGroupUuid, Object objectResult) {
        String nickname = (String)objectNickname;
        String groupUuid = (String)objectGroupUuid;
        String nicknameResultUuid = nickname + groupUuid;
        ArrayList<Integer> resultLists = (ArrayList<Integer>) objectResult;

        Long listLength = redisTemplate.opsForList().size(nicknameResultUuid);
        if (listLength > 0) { // 결과가 이미 있으면 삭제
            for (int i = 0 ; i < listLength ; i++) {
                redisTemplate.opsForList().leftPop(nicknameResultUuid);
            }
        }
        for (int i = 0 ; i < resultLists.size() ; i++) {
            redisTemplate.opsForList().rightPush(nicknameResultUuid, Integer.toString(resultLists.get(i)));
        }
    }

    public ArrayList<ArrayList<String> > getGroupResult(Object objectGroupUuid) {
        // [["0", "1", ... ], [] .. ]
        String groupUuid = (String)objectGroupUuid;
        ArrayList<String> groupResultLists = getNicknameListsByGroupUuid(groupUuid);
        ArrayList<ArrayList<String> > resultList = new ArrayList<>();

        for (int i = 0 ; i < groupResultLists.size() ; i++) {
            ArrayList<String> tmp = (ArrayList<String>) redisTemplate.opsForList().range(groupResultLists.get(i) + groupUuid, 0, -1);
            if (resultList.size() == 0) {
                resultList = new ArrayList<>();
                for (int j = 0 ; j < tmp.size() ; j++) {
                    resultList.add(new ArrayList<String>());
                }
            }
            System.out.println(1234);
            for (int j = 0 ; j < tmp.size() ; j++) {
                resultList.get(j).add(tmp.get(j));
            }
        }
        System.out.println(resultList);
        return resultList;
    }
}
