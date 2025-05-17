package org.example.controllers;

import org.example.Carros;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/carros")
public class CarrosController {
    private List<Carros> carros = new ArrayList<>();

    public CarrosController() {
        carros.addAll(List.of(
                new Carros("escort", "dourado"),
                new Carros("golf", "vermelho"),
                new Carros("Voyage", "Preto")
        ));


    }

    @GetMapping
    Iterable<Carros> getCarros() {
        return carros;
    }

    @GetMapping("/{id}")
    Optional<Carros> getCarrosById(@PathVariable String id) {
        for (Carros c : carros) {
            if (c.getId().equals(id)) {
                return Optional.of(c);
            }
        }
        return Optional.empty();
    }

    @PostMapping
    public Carros postCarros(@RequestBody Carros carro) {
        carro.setId(UUID.randomUUID().toString()); // Garante que o carro novo tenha um ID único
        carros.add(carro);
        return carro;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carros> putCarros(@PathVariable String id, @RequestBody Carros carro) {
        for (int i = 0; i < carros.size(); i++) {
            if (carros.get(i).getId().equals(id)) {
                carro.setId(id); // Garante que o ID permaneça o mesmo
                carros.set(i, carro);
                return new ResponseEntity<>(carro, HttpStatus.OK); // Atualizado com sucesso
            }
        }

        // Se não encontrar, cria um novo com o ID fornecido
        carro.setId(id);
        carros.add(carro);
        return new ResponseEntity<>(carro, HttpStatus.CREATED); // Criado
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable String id) {
        // Remove o carro com o ID especificado
        boolean removed = carros.removeIf(carro -> carro.getId().equals(id));

        if (removed) {
            return ResponseEntity.ok().build(); // Retorna 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 caso não tenha encontrado o carro
        }
    }



}

