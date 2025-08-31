package com.Saatake.CadastroUsuarios.user;

import com.Saatake.CadastroUsuarios.tasks.TaskModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "tb_cadastro")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String nome;
    private String email;
    private Integer idade;

    @ManyToOne
    @JoinColumn(name = "tarefas_id") //Foreign Key
    private  TaskModel tarefas;



}
