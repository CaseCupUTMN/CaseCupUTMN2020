<template>
  <f7-page name="new-game">
    <f7-block-title medium>Новая игра</f7-block-title>
    <f7-list no-hairlines>
      <f7-list-input
        label="Название"
        type="text"
        floating-label
        clear-button
      ></f7-list-input>

      <f7-list-input
        label="Дата проведения"
        type="datepicker"
        floating-label
        readonly
      ></f7-list-input>

      <f7-list-item title="Кол-во участников">
        <f7-stepper :value="0" :min="0" :max="50" :step="1" :autorepeat="true" :autorepeat-dynamic="true"></f7-stepper>
      </f7-list-item>

      <f7-list-input
        type="textarea"
        label="Описание"
        floating-label
        resizable
      ></f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button href="/game/:id" large round fill>Далее</f7-button>
    </f7-block>
  </f7-page>
</template>