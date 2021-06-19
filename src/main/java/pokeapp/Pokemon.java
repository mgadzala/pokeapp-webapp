package pokeapp;


public class Pokemon {
    
    private String name;
    private int id;
    private int height;
    private int weight;

    private String artwork_url;

    private int statHP;
    private int effortHP;
    private int statATT;
    private int effortATT;
    private int statDEF;
    private int effortDEF;
    private int statSATT;
    private int effortSATT;
    private int statSDEF;
    private int effortSDEF;
    private int statSPEED;
    private int effortSPEED;

    

    public Pokemon(String name) {
        this.name = name;
        System.out.println(name);
    }

    public Pokemon() {

    }

    public void printName() {
        
        System.out.println(this.name);

    }


}
