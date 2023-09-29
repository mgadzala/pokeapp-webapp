package pokeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.json.JSONException;
import java.io.IOException;


@SpringBootApplication
public class PokeAppService {

	public static void main(String[] args) throws IOException, JSONException {
		SpringApplication.run(PokeAppService.class, args);

		new WebsiteAPI();



	}

}
