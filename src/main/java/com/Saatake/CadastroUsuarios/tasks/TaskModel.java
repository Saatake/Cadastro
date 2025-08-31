package com.Saatake.CadastroUsuarios.tasks;

import com.Saatake.CadastroUsuarios.user.UserModel;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList
import class.UserModel


@Entity
@Table(name = "tb_tarefas")
public class TaskModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private TaskStatus status;
    private LocalDateTime dataCriacao;

    @OneToMany(mappedBy = "tarefas")
    private List<UserModel> user = new ArrayList<UserModel>();

    public TaskModel() {
    }

    public TaskModel(String nome, String descricao, TaskStatus status, LocalDateTime dataCriacao) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
        this.dataCriacao = dataCriacao;
    }=

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
