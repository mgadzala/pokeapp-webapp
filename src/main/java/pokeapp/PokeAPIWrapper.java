package pokeapp;

import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONException;

public class PokeAPIWrapper {

    private static final String pokemonListURL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
    private ArrayList<String> pokemonNameList;
    private static ArrayList<Pokemon> pokemonClassList;

    PokeAPIWrapper() throws IOException, JSONException {

        pokemonNameList = createPokemonNameList();
        pokemonClassList = serializePokemonDataInClasses();
        printClassNames();

    };

    private ArrayList<String> createPokemonNameList() throws IOException, JSONException {

        return JSONObjectParser.createPokemonNameListFromJSON(pokemonListURL);

    }

    private ArrayList<Pokemon> serializePokemonDataInClasses() throws IOException {

        return JSONObjectParser.createPokemonClassListfromJSON();

    }

    public ArrayList<String> getList() {

        return pokemonNameList;

    }

    public void printClassNames() {

        for (int i = 0; i < pokemonClassList.size(); i++) {
            pokemonClassList.get(i).printName();
        }

    }

}
