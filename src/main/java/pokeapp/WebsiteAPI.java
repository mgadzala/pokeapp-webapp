package pokeapp;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.tomcat.util.http.fileupload.impl.IOFileUploadException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemon/")
@CrossOrigin
public class WebsiteAPI {

    private PokemonList pokemonList;
    private Pokemon pokemon;


    public WebsiteAPI() throws IOException{

        pokemonList = PokeAPIWrapper.createPokemonList();
    
    }

    //API Calls
    @GetMapping("/list")
    public String getPokemonList() {
        return pokemonList.getPokemonList();
    }

    @GetMapping
    public String getPokemonGrid(@RequestParam int limit, @RequestParam int offset, @RequestParam(required = false) String q) {
        return pokemonList.getPokemonsPageWithQuery(limit, offset, q);

    }

    @GetMapping("/details")
    public String getPokemonCard(@RequestParam int id) throws IOException{;
        pokemon = PokeAPIWrapper.createPokemonInfo(id);
        return pokemon.getPokemonInfo();

    }

/*     @GetMapping("/searchhistory")
    public String getPokemonCard() {;
        return pokemonList.getSearchHistory();
    } */



}
