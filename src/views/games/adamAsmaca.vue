<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <div v-if="!nameDiv&&!mainContainer" class="firstArea">
    <img src="../../assets/AdamAsmaca.png" width="900" alt="" srcset="">
    <button class="startButton" @click="askName()">Başla</button>
  </div>
  
  <div v-if="nameDiv&&!mainContainer" class="nameDiv">
    <label for="">Harika İsminizi Girin:</label>
    <input maxlength="12" v-model="name" type="text">
    <button @click="calis()">Soru Getir</button>
  </div>
  
  <div class="container" v-if="mainContainer">
    <div class="harfler">
      <button class="harfButton" v-for="item in harfler2" :key="item">{{ item }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      a: "aa",
      nameDiv: false,
      mainContainer: false,
      name: "",
      cevap: "",
      category: "",
      answers: [],
      categories: [],
      randomSoru: "",
      harfler: [],
      harfler2: []

    }
  },
  methods: {
    askName() {
      this.nameDiv = true;
    },
    calis() {
      this.mainContainer = true;
      var randomIndex = Math.floor(Math.random() * this.answers.length)
      this.randomSoru = this.answers[randomIndex]
      for (var i = 0; i < this.answers[randomIndex].length; i++) {
        this.harfler.push(this.answers[randomIndex][i]);
      }
    }
  },
  created() {
    axios.get("https://adamasmaca-db090-default-rtdb.firebaseio.com/data.json")
      .then(response => {
        for (let i in response.data) {
          this.answers.push(response.data[i].text.answer)
          this.categories.push(response.data[i].text.category)
        }
      });
    // Türkçe harfleri harfler dizisine ekleyin
    this.harfler2 = ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];
  }
}
</script>
