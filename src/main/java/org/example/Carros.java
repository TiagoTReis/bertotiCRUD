package org.example;

import java.util.UUID;

public class Carros {
    private String id;
    private String name;
    private String cor;

    // Construtor vazio obrigatório para o Spring
    public Carros() {
    }

    public Carros(String id, String name, String cor) {
        this.id = id;
        this.name = name;
        this.cor = cor;
    }

    public Carros(String name, String cor){
        this(UUID.randomUUID().toString(), name, cor);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    // Esse método add() não está sendo usado — pode remover se quiser
    public void add(Carros carros) {
        this.name = name;
    }
}
