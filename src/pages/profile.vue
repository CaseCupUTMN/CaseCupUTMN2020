<template>
  <f7-page name="Profile" theme-dark >
    <f7-navbar title="EncouterMe" back-link="Back"></f7-navbar>
    <f7-block-title>Мой профиль</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="text"
        placeholder="Ваше имя"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="E-mail"
        type="email"
        placeholder="E-mail"
      ></f7-list-input>
      <f7-list-input

        type="password"
        placeholder="Ваш пароль"
         :value="password"
         @input="password = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        type="tel"
        placeholder="Телефон"
      ></f7-list-input>

      <f7-list-input
        label="Пол"
        type="select"
        >
        <option>Не выбрано</option>
        <option>Мужской</option>
        <option>Женский</option>
      </f7-list-input>

      <f7-list-input
        type="date"
        placeholder="Дата рождения"
      ></f7-list-input>


      <f7-list-input
        type="textarea"
        placeholder="О себе"
      ></f7-list-input>
    </f7-list>
   
    
    </f7-page>
</template>
