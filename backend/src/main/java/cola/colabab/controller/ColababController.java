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
    public responseGroupUuid createGroup(@RequestBody Map<String, ArrayList<Map<String, String>>> restaurant_lists) {
        // 그룹 생성하고 uuid 리턴
        //this.groupService.createNewGroup(group);
        ArrayList<Map<String, String>> data = restaurant_lists.get("restaurant_lists");
        String group_uuid = this.groupService.createNewGroup(data);
        responseGroupUuid group = new responseGroupUuid(group_uuid);
        return group;
    }

    @GetMapping("/question-lists")
    @ResponseBody
    public responseQuestionLists getQuestionLists(@RequestParam("group_uuid") String uuid) {
        // uuid 받아서 식당 리스트 return
        // 검증 코드 작성할 것
        ArrayList<ArrayList<String> > restaurant = this.groupService.getGroupRestaurantListsByGroupUuid(uuid);
        responseQuestionLists questionLists = new responseQuestionLists(restaurant);
        return questionLists;
    }

    static class responseGroupUuid {
        private String group_uuid;

        public responseGroupUuid(String group_uuid) {
            this.group_uuid = group_uuid;
        }

        public String getGroup_uuid() {
            return group_uuid;
        }

        public void setGroup_uuid(String group_uuid) {
            this.group_uuid = group_uuid;
        }
    }

    static class responseQuestionLists {
        private ArrayList<ArrayList<String> > question_lists;

        public responseQuestionLists(ArrayList<ArrayList<String>> question_lists) {
            this.question_lists = question_lists;
        }

        public ArrayList<ArrayList<String>> getQuestion_lists() {
            return question_lists;
        }

        public void setQuestion_lists(ArrayList<ArrayList<String>> question_lists) {
            this.question_lists = question_lists;
        }
    }

    @PatchMapping("/group-result")
    @ResponseBody
    public responseUpdateGroupResult updateGroupResult(@RequestBody Map<String, Object> result_lists) {
        // RequestBody : 닉네임, 결과 정보
        /*
            {
                "nickname" : "nick",
                "result" : [],
                "group_uuid" : "uuid"
            }
         */
        try {
            Object nickname = result_lists.get("nickname");
            Object result = result_lists.get("result");
            Object groupUuid = result_lists.get("group_uuid");
            boolean status = this.groupService.updateResultAndNickname(nickname, result, groupUuid);
            System.out.println(status);
            responseUpdateGroupResult res = new responseUpdateGroupResult(status);
            System.out.println(res);
            return res;
        } catch (Exception e) {
            System.out.println(e);
        }
        responseUpdateGroupResult res = new responseUpdateGroupResult(false);
        return res;
    }



    static class responseUpdateGroupResult {
        private String status ;

        public responseUpdateGroupResult(boolean status) {
            if (status) this.status = "200";
            else this.status = "fail";
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    @GetMapping("/group-result")
    @ResponseBody
    public responseGetGroupResult getGroupResult(@RequestParam("group_uuid") String uuid) {
        // group의 uuid를 받아서 투표 결과를 retrun
        ArrayList<ArrayList<String> > result = this.groupService.getResultLists(uuid);
        responseGetGroupResult res = new responseGetGroupResult(result);
        return res;
    }

    static class responseGetGroupResult {
        private ArrayList<ArrayList<String> > result_lists;

        public responseGetGroupResult(ArrayList<ArrayList<String> > result_lists) {
            this.result_lists = result_lists;
        }

        public ArrayList<ArrayList<String>> getResult_lists() {
            return result_lists;
        }

        public void setResult_lists(ArrayList<ArrayList<String>> result_lists) {
            this.result_lists = result_lists;
        }
    }

}
