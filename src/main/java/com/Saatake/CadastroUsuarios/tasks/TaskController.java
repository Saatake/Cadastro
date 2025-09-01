package com.Saatake.CadastroUsuarios.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tarefas")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<TaskModel> buscarTarefas() {
        return taskRepository.findAll();
    }

    @PostMapping
    public TaskModel cadastrarTarefa(@RequestBody TaskModel task) {
       return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public TaskModel atualizarTarefa(@PathVariable Long id, @RequestBody TaskModel task) {
        TaskModel tarefaExistente = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada!"));

        tarefaExistente.setNome(task.getNome());
        tarefaExistente.setDescricao(task.getDescricao());
        tarefaExistente.setStatus(task.getStatus());
        tarefaExistente.setDataCriacao(task.getDataCriacao());
        tarefaExistente.setUser(task.getUser());

        return taskRepository.save(tarefaExistente);
    }

    @DeleteMapping("/{id}")
    public void deletarTarefa(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public TaskModel buscarTarefaPorID(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null);
    }
}
