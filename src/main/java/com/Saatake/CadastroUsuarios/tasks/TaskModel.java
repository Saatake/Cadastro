package com.Saatake.CadastroUsuarios.tasks;

import com.Saatake.CadastroUsuarios.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "tb_tarefas")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TaskModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDateTime dataCriacao;

    @OneToMany(mappedBy = "tarefas")
    private List<UserModel> user = new ArrayList<UserModel>();

}
