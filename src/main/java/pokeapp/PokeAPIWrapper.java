package pokeapp;

import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONException;

public class PokeAPIWrapper {

    private PokemonList pokemonList;

    private static ArrayList<Integer> pokeminIDList  = new ArrayList<Integer>();
    private static ArrayList<String> pokemonNameList = new ArrayList<String>();
    private static ArrayList<String[]> pokemonHabitatLUT = new ArrayList<String[]>();

    PokeAPIWrapper() throws IOException, JSONException {



    };

    public static PokemonList createPokemonList() throws IOException, JSONException {

        ArrayList<String[]> nameAndLink = new  ArrayList<String[]>(); 
        nameAndLink = JSONObjectParser.createPokemonNameAndURLListFromJSON
                            (URLtoAPIManager.getTotalListOfPokemonURL());

        for (int row = 0; row < nameAndLink.size(); row++) {
            String[] currentRow = nameAndLink.get(row);
            pokemonNameList.add(row, currentRow[0]);
            pokeminIDList.add(row, extractIdFromString(currentRow[1]));
           
        }


        pokemonHabitatLUT = JSONObjectParser.createPokemonHabitatLUTFromJSON(URLtoAPIManager.getHabitatURL());

        return new PokemonList(pokeminIDList, pokemonNameList, pokemonHabitatLUT);

    }

    private static int extractIdFromString(String str) {

        int id = 0;

        str = str.substring(0, str.lastIndexOf('/'));
        str = str.substring(str.lastIndexOf('/', str.length()));
        str = str.substring(1, str.length());

        id = Integer.parseInt(str);

        return id;

    }

    public static Pokemon createPokemonInfo(int id) throws IOException{

        Pokemon pokemon = new Pokemon();

        pokemon = JSONObjectParser.createPokemonInfoFromJSON(
            URLtoAPIManager.getPokemonInfoFromURL(id),
            pokemon
            );

        return pokemon;

    } 


}
