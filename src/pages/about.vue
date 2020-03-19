<template>
  <f7-page name="about">
    <f7-block-title medium>Об игре Encounter Me!</f7-block-title>
    <f7-block></f7-block>
  </f7-page>
</template>
<script>
export default {
   mounted() {
    this.$f7ready((f7) => {
       document.getElementById("logo").style.display="none";
    })
      } 
}  
</script>
