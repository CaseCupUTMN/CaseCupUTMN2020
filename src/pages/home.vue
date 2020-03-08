<template>
  <f7-page name="home" theme-dark>
    <!-- Top Navbar -->
    <f7-navbar :sliding="false" large>
      <f7-nav-title sliding>"EncounterMe"</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large sliding>EncounterMe</f7-nav-title-large>
    </f7-navbar>

    <!-- Page content-->
    <f7-block strong>
      <p>Описание приложения</p>
    </f7-block>
    <f7-block-title>Меню</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="Информация"></f7-list-item>
      <f7-list-item link="/profile/" title="Профиль"></f7-list-item>
    </f7-list>

    
  </f7-page>
</template>
