<template>
  <f7-page name="profile">
    <f7-block-title medium>Мой профиль</f7-block-title>
    <f7-list no-hairlines>
      <f7-list-input
        label="Имя"
        type="text"
        floating-label
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="Пол"
        type="select"
      >
        <option>Не указан</option>
        <option>Мужской</option>
        <option>Женский</option>
      </f7-list-input>

      <f7-list-input
        label="Дата рождения"
        type="datepicker"
        floating-label
        readonly
      ></f7-list-input>

      <f7-list-input
        type="password"
        label="Пароль"
        placeholder="Введите чтобы изменить"
        clear-button
      ></f7-list-input>

    
        <f7-list-input
        type="textarea"
        placeholder="О себе"
      ></f7-list-input>


    <f7-block>
      <f7-button back large round fill>Сохранить</f7-button>
    </f7-block>
  </f7-page>
</template>
