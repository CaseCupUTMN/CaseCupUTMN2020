<template>
  <f7-page name="profile">
    <f7-block-title medium>Мой профиль</f7-block-title>
    <f7-list no-hairlines>
      <f7-list-input
        placeholder="Ваше имя"
        type="text"
        floating-label
        clear-button
        :value="name"
        @input="name=$event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Пол"
        type="select"
        :value="gender"
        @change="gender = $event.target.value"
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
        @change="birthday = $event.target.value"  
      ></f7-list-input>
        <f7-block-footer>
        <f7-link @click="editPassword()">Изменить пароль</f7-link>
        </f7-block-footer>
    </f7-list>
    <f7-block>
      <f7-button large round fill @click="save">Сохранить</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import cordovaApp from '../js/cordova-app.js';
import routes from '../js/routes.js';
export default {
     data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'cloud.seon.app.encounterMe!', // App bundle ID
          name: 'EncounterMe!', // App name
          theme: 'md', // Material design for all platforms
          autoDarkTheme: true,

          // App routes
          routes: routes,

          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },

          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        
        },
        name: '',
        gender: 'Не указан',
        birthday:'',
        newpassword:'',
      
      }
    },
    methods: {
      editPassword() {
        const app = this.$f7;
        app.dialog.password('Введите новый пароль','Изменение пароля', (password) => {
          if(password){
            if(password.length>5){
                this.errorAlert("Функция пока что не работает");
            }
            else{
              this.errorAlert("Пароль должен содержать как минимум 5 символов");
            }
          }
        })
      },
      errorAlert(error){
          this.$f7.dialog.alert(error);    
      },
      save(){
        
        if(this.name=='' || this.birthday=='' || this.gender=='' || this.gender=='Не указан'){
            this.errorAlert('Не все поля заполнены!');
        }else{
          
           this.$f7.request({
             url:"https://app.seon.cloud/hiddencodes/v1.0/profile",
             method:"PUT",
             data: 
             {
             token:localStorage.token,
             profile:{
                displayName:this.name,
                sex:this.gender,
                birthday:this.birthday
              }
             
            },dataType:"json", error(errors) {
                console.log(errors);
            },success(data){
               
            }
              });
            
            this.$f7.dialog.alert("Профиль отредактирован");
            this.$f7router.back();
        }
        
      }
    },
    mounted() {
    this.$f7ready((f7) => {
      document.getElementById("logo").style.display="none";
    })
      }    
}
</script>