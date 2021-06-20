package pokeapp;

import java.io.IOException;

public class URLtoAPIManager {

    private static String urlAPI = "https://pokeapi.co/api/v2/";
    private static String pokemon = "pokemon";
    private static String habitat = "pokemon-habitat/";

    public static String getPaginatedListURL(int numberOfobjects) {

        return urlAPI + pokemon + "?limit=" + Integer.toString(numberOfobjects) + "&offset=0";

    }

    public static String getTotalListOfPokemonURL() throws IOException {

        String totalCount = Integer.toString(JSONObjectParser.getTotalNumberOfPokemons(urlAPI + pokemon));

        return urlAPI + pokemon + "?limit=" + totalCount + "&offset=0";

    }

    public static String getHabitatURL() {

        return urlAPI + habitat;

    }

    public static String getPokemonInfoFromURL(int id) {

        return urlAPI + pokemon + "/" + Integer.toString(id);

    }
}
