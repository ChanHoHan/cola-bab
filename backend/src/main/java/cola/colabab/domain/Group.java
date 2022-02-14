package cola.colabab.domain;

import cola.colabab.service.Utils;

public class Group {

    private String group_uuid, nickname_uuid, restaurant_uuid, result_uuid;

    public Group() {
        Utils util = new Utils();
        this.group_uuid = util.createUUID();
        this.nickname_uuid = util.createUUID();
        this.restaurant_uuid = util.createUUID();
        this.result_uuid = util.createUUID();
    }

    public String getGroup_uuid() {
        return group_uuid;
    }

    public void setGroup_uuid(String group_uuid) {
        this.group_uuid = group_uuid;
    }

    public String getNickname_uuid() {
        return nickname_uuid;
    }

    public void setNickname_uuid(String nickname_uuid) {
        this.nickname_uuid = nickname_uuid;
    }

    public String getRestaurant_uuid() {
        return restaurant_uuid;
    }

    public void setRestaurant_uuid(String restaurant_uuid) {
        this.restaurant_uuid = restaurant_uuid;
    }

    public String getResult_uuid() {
        return result_uuid;
    }

    public void setResult_uuid(String result_uuid) {
        this.result_uuid = result_uuid;
    }
}
