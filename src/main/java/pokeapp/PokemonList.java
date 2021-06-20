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

    private ArrayList<String> recentlySearched;

    PokemonList(ArrayList<Integer> idList, ArrayList<String> nameList, ArrayList<String[]> habitatLUT) {
        
        recentlySearched = new ArrayList<String>();

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
        System.out.println("XD");
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

    public String getPagePokemons(int numberOfPokemons, int offset) {

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

    public String getSearchResults(String query) {

        Map<String, String> map = new HashMap<>();
        JSONArray jsonarr = new JSONArray();

        int searchHits = 0;

        for (int i = 0; i < id.size(); i++) {

            if (name.get(i).contains(query)) {
                searchHits++;
                map.put("name", name.get(i));
                map.put("id", Integer.toString(id.get(i)));
                if (i < habitat.size()) { 
                    map.put("habitat", habitat.get(i));
                } else {
                    map.put("habitat", "nohabitat");
                }

                if (searchHits == 1) {

                    boolean skip = false;

                    for (int k = 0; k < recentlySearched.size(); k++) {
                        if (name.get(i).equals(recentlySearched.get(k))) {
                            skip = true;
                            break;
                        }
                    }

                    if (!skip) {

                        recentlySearched.add(0, name.get(i));

                        if (recentlySearched.size() > 10) {
                            recentlySearched.remove(recentlySearched.size() - 1);
                        }

                    }


                }

                jsonarr.put(new JSONObject(map));

                map.clear();

            }
             
        }



        return jsonarr.toString();

    }

}