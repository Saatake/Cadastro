package com.Saatake.CadastroUsuarios.user;

import org.springframework.data.jpa.repository.JpaRepository;

@SuppressWarnings("unused")
public interface UserRepository extends JpaRepository<UserModel, Long> {
}
