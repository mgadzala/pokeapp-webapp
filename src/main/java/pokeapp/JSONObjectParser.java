package pokeapp;

import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONObjectParser {

    private static JSONObject json;

    private static void readJSONFileToObject(String url) throws IOException {

        json = JSONObjectReader.readJsonFromUrl(url);

    }

    public static ArrayList<String[]> createPokemonNameAndURLListFromJSON(String url) throws IOException {

        readJSONFileToObject(url);
        
        ArrayList<String[]> outputArray = new ArrayList<String[]>();
        JSONArray array = json.getJSONArray("results");
        for (int i = 0; i < array.length(); i++)
        {
            outputArray.add(new String[] {
                array.getJSONObject(i).getString("name").toString(),
                array.getJSONObject(i).getString("url").toString()
            });
        }

        return outputArray;

    }

    public static ArrayList<String[]> createPokemonHabitatLUTFromJSON(String url) throws IOException {

        readJSONFileToObject(url);

        ArrayList<String[]> outputArray = new ArrayList<String[]>();
        
        int numberOfHabitats = json.getInt("count");


        for (int i = 1; i <= numberOfHabitats; i++)
        {
            readJSONFileToObject(url + '/' + Integer.toString(i));

            String nameOfHabitat = json.getString("name");
            JSONArray array = json.getJSONArray("pokemon_species");

            for (int j = 0; j < array.length(); j++) {
            outputArray.add(new String[] {
                array.getJSONObject(j).getString("name").toString(),
                nameOfHabitat});
            }
        }

        return outputArray;

    }

    public static int getTotalNumberOfPokemons(String url) throws IOException{

        readJSONFileToObject(url);

        int numberOfPokemons = json.getInt("count");

        return numberOfPokemons;

    }

    public static Pokemon createPokemonInfoFromJSON(String url, Pokemon pokemon) throws IOException {

        readJSONFileToObject(url);

        pokemon.setName(json.getString("name"));
        pokemon.setID(json.getInt("id"));
        pokemon.setHeight(Integer.toString(json.getInt("height")));
        pokemon.setWeight(Integer.toString(json.getInt("weight")));

        return pokemon;

    }

}
