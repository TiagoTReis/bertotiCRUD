package org.example.controllers;

import org.example.Carros;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

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
    Carros postCarros(@RequestBody Carros carro) {
        carros.add(carro);
        return carro;
    }

    @PutMapping("/{id}")
    ResponseEntity<Carros> putCarros(@PathVariable String id,
                                     @RequestBody Carros carro) {
        int carrosIndex = -1;

        for (Carros c : carros) {
            if (c.getId().equals(id)) {
                carrosIndex = carros.indexOf(c);
                carros.set(carrosIndex, carro);
            }
        }

        return (carrosIndex == -1) ?
                new ResponseEntity<>(postCarros(carro), HttpStatus.CREATED) :
                new ResponseEntity<>(carro, HttpStatus.OK);


    }
    @DeleteMapping("/{id}")
    void deleteCarros(@PathVariable String id){
        carros.removeIf(c->c.getId().equals(id));
    }


}

