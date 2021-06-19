package pokeapp;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.tomcat.util.http.fileupload.impl.IOFileUploadException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemon/")
public class WebsiteAPI {

    private PokeAPIWrapper pokeAPIWrapper;
    private ArrayList<String> pokemonNameList;

    public WebsiteAPI() throws IOException{

        pokeAPIWrapper = new PokeAPIWrapper();
        pokemonNameList = pokeAPIWrapper.getList();
    
    }

    @GetMapping("/list")
    public ArrayList<String> getList() {
        return pokemonNameList;
    }
    
}
