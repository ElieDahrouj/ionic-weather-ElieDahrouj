<template>
  <div class="ion-page">
    <imgTitle/>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating" >Recherchez une ville <ion-icon name="search"></ion-icon> <ion-text color="white">*</ion-text></ion-label>
        <ion-input  type="text" @input="city = $event.target.value"></ion-input>
      </ion-item>

      <div class="ion-padding">
        <ion-button @click.prevent="send()" expand="block" type="submit" class="ion-no-margin">Affichez la météo</ion-button>
      </div>

      <ion-card v-if="status">
        <ion-card-header>
          <ion-card-subtitle><b>Longitude: </b>{{this.info.coord.lon}} & <b>Latitude: </b>{{this.info.coord.lat}}</ion-card-subtitle>
          <div class="picture"><img style="width: auto" :src="this.icone" alt=""></div>
          <ion-card-title>{{this.info.name}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Humidité : {{this.info.main.humidity}}</p>
          <p><ion-icon name="thermometer"></ion-icon>{{this.info.main.temp}}° <b>/</b><b style="color: red"><ion-icon name="arrow-down"></ion-icon></b> {{this.info.main.temp_min}}° <b>/</b><b style="color: green"><ion-icon name="arrow-up"></ion-icon></b> {{this.info.main.temp_max}}°</p>
          <p>Température ressentie : {{this.info.main.feels_like}}</p>
          <p>Vitesse du vent : {{this.info.wind.speed}}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import imgTitle from '@/components/Header.vue'
export default {
  name: 'home',
  data(){
    return{
        city:null,
        info:[],
        status:false,
        icone:null
    }
  },
  components: {
      imgTitle
  },
  methods:{
      send(){
          if (this.city !== null) {
              this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&APPID=' + process.env.VUE_APP_SECRET + '&lang=' + this.city + "&units=metric")
                  .then(response => {
                      this.info = []
                      this.info = response.data
                      this.status = true
                      this.icone = "http://openweathermap.org/img/wn/" + this.info.weather[0].icon + "@2x.png"
                  })
                  .catch((errors)=>{
                    this.alert(errors)
                  })
          }
          else{
              this.alert()
          }

      },
      alert (){
          return this.$ionic.alertController.create({
              header: 'Erreur',
              message: "Aucune correspondance trouvée",
              buttons: ['Ok']
          }).then(alert =>
              alert.present()
          );
      }
  },
}
</script>
<style>
  .namePage{
    background-color: #EFFBFF;
  }
  .ion-padding{
    --background: #EFFBFF;
  }
  ion-item{
    --background: transparent;
  }
  .picture{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>