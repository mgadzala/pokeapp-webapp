package pokeapp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class PokemonList{

    private ArrayList<Integer> id;
    private ArrayList<String> name;
    private ArrayList<String> habitat;

    private ArrayList<String[]> recentlySearched;

    PokemonList(ArrayList<Integer> idList, ArrayList<String> nameList, ArrayList<String[]> habitatLUT) {
        
        recentlySearched = new ArrayList<String[]>();

        id = new ArrayList<Integer>();
        name = new ArrayList<String>();
        habitat = new ArrayList<String>();

        for (int i = 0; i < nameList.size(); i++) {

            id.add(idList.get(i));
            name.add(nameList.get(i));

        }

        for (int i = 0; i < nameList.size(); i++) {
            for (int j = 0; j < habitatLUT.size(); j++) {
                if (name.get(i).equals(habitatLUT.get(j)[0])) {
                    habitat.add(habitatLUT.get(j)[1]);
                }

            } 
        }
    }

    PokemonList(int numberOfPokemonsInPage, int pokemonsOffsetInPage) {

    }

    public String getPokemonList() {

        Map<String, String> map = new HashMap<>();
        JSONArray jsonarr = new JSONArray();

        for (int i = 0; i < id.size(); i++) {

             map.put("name", name.get(i));
             map.put("id", Integer.toString(id.get(i)));
             if (i < habitat.size()) { 
                map.put("habitat", habitat.get(i));
             } else {
                map.put("habitat", "nohabitat");
             }

             jsonarr.put(new JSONObject(map));

             map.clear();

        }

        return jsonarr.toString();

    }

    public String getPokemonsPageWithQuery(int numberOfPokemons, int offset, String query) {

        if (query != null && !query.isEmpty()) {

            return getQueriedPokemonsPage(numberOfPokemons, offset, query);

        } else {
            
            return getPokemonsPageWithoutQuery(numberOfPokemons, offset);
        }

        

    }

    private String getPokemonsPageWithoutQuery(int numberOfPokemons, int offset) {

        Map<String, String> map = new HashMap<>();
        JSONArray jsonarr = new JSONArray();

        for (int i = offset; i < (offset + numberOfPokemons); i++) {

            map.put("name", name.get(i));
            map.put("id", Integer.toString(id.get(i)));
            if (i < habitat.size()) { 
               map.put("habitat", habitat.get(i));
            } else {
               map.put("habitat", "nohabitat");
            }

            jsonarr.put(new JSONObject(map));
            map.clear();

        } 
        return jsonarr.toString();
    }

    private String getQueriedPokemonsPage(int numberOfPokemons, int offset, String query) {

        Map<String, String> map = new HashMap<>();
        JSONArray jsonarr = new JSONArray();
        ArrayList<String[]> queryResult = new ArrayList<String[]>();

        for (int i = 0; i < name.size(); i++) {

            if (name.get(i).contains(query)) {

                queryResult.add(new String[] {
                    name.get(i),
                    Integer.toString(id.get(i)),
                    (i < habitat.size()) ? habitat.get(i) : "nohabitat"
                });

            }

        }

        if ((queryResult.size() - offset) < numberOfPokemons) {
            numberOfPokemons = (queryResult.size() - offset);
        }

        for (int i = offset; i < offset + numberOfPokemons; i++) {

            map.put("name", queryResult.get(i)[0]);
            map.put("id", queryResult.get(i)[1]);
            map.put("haibtat", queryResult.get(i)[2]);

            jsonarr.put(new JSONObject(map));

            map.clear();

        }
       
        return jsonarr.toString();

    }

}