package com.Saatake.CadastroUsuarios.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserModel> listar() {
        return userRepository.findAll();
    }

    @PostMapping
    public UserModel cadastrar(@RequestBody UserModel user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public UserModel atualizar(@PathVariable Long id, @RequestBody UserModel user) {
        UserModel usuarioExistente = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        usuarioExistente.setNome(user.getNome());
        usuarioExistente.setEmail(user.getEmail());
        usuarioExistente.setSenha(user.getSenha());
        usuarioExistente.setIdade(user.getIdade());
        usuarioExistente.setTarefas(user.getTarefas());

        return userRepository.save(usuarioExistente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    //Procurar pelo ID
    @GetMapping("/{id}")
    public UserModel buscarPeloID(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
