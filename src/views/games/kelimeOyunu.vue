<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, nextTick } from 'vue';

</script>
<template>
  <!-- <input v-model="chars.kelime" type="text">
  <input v-model="chars.ipucu" type="text">

  <button @click="gonder()">Gönder</button> -->
  <button @click="yeniden()" v-if="bitirButon">Bitir</button>
  <div class="welcomeImg" v-if="harfler.length == 0 && !nameDiv &&!bitirButon">

    <img src="../../assets/KelimeBul.png" width="900" alt="">
    <p>Not:Tüm Harfleri Büyük Yaz!</p>
    <button class="getQuestion" @click="askName()">Başla</button>
    <!-- calis() -->
  </div>


  <div v-if="nameDiv" class="nameDiv">
    <label for="">Harika İsminizi Girin:</label>
    <input maxlength="12" v-model="name" type="text">
    <button @click="calis()">Soru Getir</button>
  </div>
  <div class="container" v-if="harfler.length != 0&&!bitirButon">
    <div class="tip_point">
      <p>{{ ipucu }}</p>

      <h2>puan:{{ puan }}</h2>

    </div>
    <div class="qt">


      <div class="chars" v-for="(textbox, index) in harfler">
        <div v-if="textbox !== ' '" class="aba">
          <input maxlength="1" class="char" :ref="'textbox-' + index" v-model="textboxValues[index]" @input="event => handleInput(index, event)" />


        </div>
        <div v-else class="space"></div>
      </div>
      <button class="check" @click="checkIt()">Kontrol</button>
      <button class="check" @click="getChar()">Harf Al</button>

  </div>
</div>


  <!-- <div  class="box" v-for=" i in kelimeler " :class="a" >
          <h2>{{i}}</h2>
      </div> -->





  <div>
  </div>
  <div class="container2">
  </div>
</template>
<script>
import axios from "axios";

export default {

  data() {
    return {
      textboxes: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },

        // Diğer textboxlar
      ],
      chars: {
        kelime: "",
        ipucu: ""
      },
      value1: '',
      puan: 0,
      value2: '',
      harfler: [],
      harf: "",
      value3: "",
      kelime: "",
      combinedValue: '',
      name: "",
      ipucu: "",
      soru: "",
      kelimeler: [],
      ipucular: [],
      textboxValues: [],
      ab: "",
      namePuan: {

      },
      soruSayisi: 0,
      rastgeleDeger: null,
      random: 0,
      nameDiv: false,
      charArray: [],
      dizi: [],
      random2: 0,
      bitirButon:false,
      textboxes: [
      ]
    }

  },
  mounted() {

    axios.get("https://sunduzgames-default-rtdb.firebaseio.com/sunduzGames.json")
      .then(
        response => {

          for (let key in response.data) {
            var a = response.data[key].text.kelime
            this.kelimeler.push(a)
            this.ipucular.push(response.data[key].text.ipucu)
          }
        }
      )




  },
  methods: {

    askName() {
      this.nameDiv = true;
    },
    handleInput(index, event) {
  if (event.target.value === "" && index > 0) {
    this.$refs['textbox-' + (index - 1)][0].focus(); // Bir önceki textbox'a odaklan
    this.textboxValues[index - 1] = ""; // Bir önceki textbox'ı temizle
  }
  else if (event.target.value !== "" && index < this.harfler.length - 1) {
    this.$refs['textbox-' + (index + 1)][0].focus(); // Bir sonraki textbox'a odaklan
  }
}
,
    getChar() {
  if (this.charArray.length === 0) {
    return; // All characters have been used, exit the function
  }

  const availableIndexes = this.charArray
    .map((char, index) => ({ char, index }))
    .filter(item => this.textboxValues[item.index] === undefined && item.char.deger !== " ") // Exclude filled textboxes
    .map(item => item.index);

  if (availableIndexes.length === 0) {
    return; // No unused characters, exit the function
  }

  this.random2 = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  this.rastgeleDeger = this.charArray[this.random2];
  this.charArray[this.random2].deger = this.charArray[this.random2].deger.toUpperCase();
  this.textboxValues[this.random2] = this.charArray[this.random2].deger;
  this.puan -= 150;

  // Update the refs by waiting for the next tick
  this.$nextTick(() => {
    this.$refs['textbox-' + this.random2][0].focus();
  });
}

    ,
    checkIt() {

      this.value1 = this.textboxValues.join('');
      this.value2 = this.harfler.filter(item => item.trim() !== '');
      this.value3 = this.value2.join('');
      this.value3 = this.value3.toUpperCase();
      this.value1 = this.value1.toUpperCase();

      // alert(this.value1+" "+this.value3)

      if (this.value1 == this.value3) {
        this.puan += this.harfler.length * 100;

        alert("Doğru")
        this.value1 = "";
        if (this.soruSayisi == 5) {
          alert("TEBRİKLER " + this.name + " Puanınız: " + this.puan)
          axios.post("https://sunduzgamepuan-default-rtdb.firebaseio.com/data.json", {
            name: this.name,
            point: this.puan 
          })
          this.bitirButon=true;
        }
        else {
          this.soruSayisi++
          this.textboxValues.length = 0;
        }
        this.calis()



      }
      else {
        alert("Yanlış")
        this.textboxValues.length=0;
        this.puan -= 200
      }
    },
    yeniden(){
window.location.reload();     
    },
    bastan() {
      this.puan = 0;
      this.harfler.length = 0;
      this.charArray.length = 0;
      this.created();
    },

    calis() {
      this.textboxValues.length = 0;
      this.nameDiv = false
    


      var randomIndex = Math.floor(Math.random() * this.kelimeler.length);
      this.harfler.length = 0;
      this.charArray.length = 0;

      // alert(this.kelimeler[randomIndex])

      for (var i = 0; i < this.kelimeler[randomIndex].length; i++) {
        this.harfler.push(this.kelimeler[randomIndex][i]);
        this.charArray.push({ id: i, deger: this.kelimeler[randomIndex][i] });

      }
      // alert(this.harfler)
      this.ipucu = this.ipucular[randomIndex]
      this.kelimeler.splice(randomIndex, 1);
      this.ipucular.splice(randomIndex, 1);

    },


  },

}
</script>
<style>
* {
  color: white;
}

button {
  color: black;
}

input {
  color: black;
}</style>