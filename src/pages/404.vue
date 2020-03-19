<template>
  <f7-page>
    <f7-block>
      <img class="padding-vertical" src="/static/notfound.png" width="100%"/>
      <p class="text-align-center">А здесь ничего нет. Совсем ничего :(</p>
    </f7-block>
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