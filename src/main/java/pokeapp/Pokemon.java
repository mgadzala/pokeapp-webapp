package pokeapp;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class Pokemon {
    
    private int id;

    private String name;
    private String height;
    private String weight;

    private int[] stats;


    public Pokemon() {

    }

    public String getPokemonInfo() {

        Map<String, String> map = new HashMap<>();
        JSONArray jsonarr = new JSONArray();

        map.put("name", name);
        map.put("id", Integer.toString(id));
        map.put("height", height);
        map.put("weight", weight);

        jsonarr.put(new JSONObject(map));

        return jsonarr.toString();

    }

    public void setName (String name) {

        this.name = name;

    }

    public void setID (int id) {

        this.id = id;

    }

    public void setHeight (String height) {

        this.height = height;

    }

    public void setWeight (String weight) {

        this.weight = weight;

    }

}
