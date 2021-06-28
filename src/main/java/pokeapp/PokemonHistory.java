package pokeapp;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public class PokemonHistory {
    
    private static ArrayList<JSONObject> historyStack = new ArrayList<JSONObject>();

    public static void addToSearchHistory(JSONObject pokemonInfo) {

        boolean isInTable = false;

        for (int i = 0; i < historyStack.size(); i++) {

            if (historyStack.get(i).getString("name").equals(pokemonInfo.getString("name"))) {
                isInTable = true;
            }

        }

        if (!isInTable) {
            if (historyStack.size() < 10) {
                historyStack.add(0, pokemonInfo);
            } else {
                historyStack.remove(9);
                historyStack.add(0, pokemonInfo);
            }
        }   
    }

    public static String getSearchHistory() {

        JSONArray jsonarr = new JSONArray();

        for (int i = 0; i < historyStack.size(); i++) {
             jsonarr.put(historyStack.get(i));
        }

        return jsonarr.toString();

    }

}
