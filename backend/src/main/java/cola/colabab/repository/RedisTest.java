package cola.colabab.repository;

import cola.colabab.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class RedisTest {
    StringRedisTemplate redisTemplate;

    @Autowired
    public RedisTest(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.testList();
    }

    public void testList() {

        // room
        GroupService s = new GroupService();

        final String roomUUID = s.createUUID(); // 방 uuid 생성
        final HashOperations<String, String, String> stringObjectObjectHashOperations = redisTemplate.opsForHash();

        stringObjectObjectHashOperations.put(roomUUID, "nickname", s.createUUID());
        stringObjectObjectHashOperations.put(roomUUID, "restaurant_lists", s.createUUID());

        String nicknameUUID = stringObjectObjectHashOperations.get(roomUUID, "nickname");
        String restaurantUUID = stringObjectObjectHashOperations.get(roomUUID, "restaurant_lists");
        System.out.println("nicknameUUID = " + nicknameUUID);

        // nickname_set
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        setOperations.add(nicknameUUID, "나는 문어");
        ArrayList<String> nicknameList = new ArrayList<>(setOperations.members(nicknameUUID));
        System.out.println("nickname list : " + nicknameList);

        // restaurant_list
        redisTemplate.opsForList().rightPush(restaurantUUID, "김포\n\nfd6\n\n김포\n\n간식\n\n\n\n123\n\n010-0000-0000\n\n빠리\n\nnaver.com\n\n김포 공공로\n\n123\n\n23");
        redisTemplate.opsForList().rightPush(restaurantUUID, "서울\n\nfd6\n\n서울\n\n간식\n\n\n\n123\n\n010-1234-4567\n\n빠리\n\ndaum.com\n\n서울 공공로\n\n124\n\n25");

        RedisOperations<String, String> listOperations = redisTemplate.opsForList().getOperations();
        System.out.println(listOperations.opsForList().range(restaurantUUID, 0, -1));


        // nickname 별로 결과
        redisTemplate.opsForList().rightPush(nicknameList.get(0) + roomUUID, "2");
        redisTemplate.opsForList().rightPush(nicknameList.get(0) + roomUUID, "1");
        redisTemplate.opsForList().rightPush(nicknameList.get(0) + roomUUID, "2");
        redisTemplate.opsForList().rightPush(nicknameList.get(0) + roomUUID, "0");
        System.out.println(listOperations.opsForList().range(nicknameList.get(0) + roomUUID, 0, -1));

    }
}
