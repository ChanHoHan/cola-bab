package cola.colabab.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Group {
    //private String address_name, category_group_code, category_group_name, category_name, distance, id, phone, place_name, place_url, road_address_name, x, y;



    private Map<String, ArrayList<Map<String, String>>> restaurant_lists;

    public Map<String, ArrayList<Map<String, String>>> getRestaurant_lists() {
        return restaurant_lists;
    }

    public void setRestaurant_lists(Map<String, ArrayList<Map<String, String>>> restaurant_lists) {
        this.restaurant_lists = restaurant_lists;
    }
}
