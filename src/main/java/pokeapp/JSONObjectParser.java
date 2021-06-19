package pokeapp;

import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONObjectParser {

    private static JSONObject json;

    private static ArrayList<String> pokemonNameList = new ArrayList<String>();
    private static ArrayList<String> pokemonURLList  = new ArrayList<String>();
    private static ArrayList<Pokemon> pokemonClassList = new ArrayList<Pokemon>();

    public static void readJSONFileToObject(String url) throws IOException {

        json = JSONObjectReader.readJsonFromUrl(url);

    }

    public static ArrayList<String> createPokemonNameListFromJSON(String url) throws IOException {

        readJSONFileToObject(url);
        
        JSONArray array = json.getJSONArray("results");
        for (int i = 0; i < array.length(); i++)
        {

            pokemonNameList.add(array.getJSONObject(i).getString("name").toString());
            // Collect url to detailed info about specific pokemon
            pokemonURLList.add(array.getJSONObject(i).getString("url").toString());
            

        }

        return pokemonNameList;

    }

    public static ArrayList<Pokemon> createPokemonClassListfromJSON() throws IOException {


        for (String str : pokemonURLList) {
            readJSONFileToObject(str);
            System.out.println(json.getString("name"));
            Pokemon pokemon = new Pokemon(json.getString("name"));
            pokemonClassList.add(pokemon);
        }

        return pokemonClassList;


    }



    

}
