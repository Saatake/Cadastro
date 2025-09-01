package com.Saatake.CadastroUsuarios.tasks;

import org.springframework.data.jpa.repository.JpaRepository;

@SuppressWarnings("unused")
public interface TaskRepository extends JpaRepository<TaskModel, Long> {
}
