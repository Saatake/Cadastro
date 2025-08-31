package com.Saatake.CadastroUsuarios.user;

import com.Saatake.CadastroUsuarios.tasks.TaskModel;
import jakarta.persistence.*;


import package.TaskModel

@Entity
@Table(name = "tb_cadastro")
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


    public UserModel() {
    }

    public UserModel(String nome, String email, Integer idade) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }
}
