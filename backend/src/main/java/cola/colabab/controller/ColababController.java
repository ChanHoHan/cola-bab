package cola.colabab.controller;

import cola.colabab.domain.Group;
import cola.colabab.repository.RedisTest;
import cola.colabab.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Map;

@Controller
public class ColababController {

    private final GroupService groupService;

    @Autowired
    public ColababController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/new-group")
    @ResponseBody
    public String createGroup(@RequestBody Map<String, ArrayList<Map<String, String>>> restaurant_lists) {
        // 그룹 생성하고 uuid 리턴
        //this.groupService.createNewGroup(group);
        ArrayList<Map<String, String>> data = restaurant_lists.get("restaurant_lists");
        System.out.println(data);
        return "hi";
    }

    /*
    @GetMapping("/question-lists")
    @ResponseBody
    public int invitePeople(@RequestParam("uuid") String uuid) {
        // uuid 받아서 식당 리스트 return
    }


    @GetMapping("/group-result")
    @ResponseBody
    public voteResult getGroupResult(@RequestParam("uuid") String uuid) {
        // group의 uuid를 받아서 투표 결과를 retrun

    }

    @PatchMapping("/group-result")
    @ResponseBody
    public int updateGroupResult() {

    }*/
}
