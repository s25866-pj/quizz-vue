<template>
<h1>Nowe pytania do Quizzu</h1>

  <div class="QAType" >
    <input type="range" name="" id="" min="1" max="3" step="1" v-model="value" @change="updateLevel" :style="{background: levelColor }" />
    {{levelName}}
    <div>Rodzaj pytania:</div>
    <div id="levelIndicator" :style="{color:levelColor }" @click="changeType"><b>{{typeName}}</b></div>

  </div>

  <input type="text" name="" id="" placeholder="Treść pytania..." v-model="question">
  <div id="container">

  <div v-if='type=="radio"'>
    <div>
      <input type="text" name="" id="" v-model="odpA">
      <label><input type="radio" name="odp" id="" value="a" v-model="correct">
        Odpowiedz A
      </label>
    </div>
    <div>
      <input type="text" name="" id="" v-model="odpB">
      <label>
        <input type="radio" name="odp" id=""  value="b" v-model="correct">
        Odpowiedz B
      </label>
    </div>
    <div>
      <input type="text" name="" id="" v-model="odpC">
      <label>
        <input type="radio" name="odp" id=""  value="c" v-model="correct">
        Odpowiedz C
      </label>
    </div>
    <div>
      <input type="text" name="" id="" v-model="odpD">
      <label>
        <input type="radio" name="odp" id=""  value="d" v-model="correct">
        Odpowiedz D
      </label>
    </div>
  </div>
  <div v-if='type=="box"'>
    <div><input type="text" name="" id="" v-model="odpA"><label><input type="checkbox" name="" id="" value="a" v-model="correct">Odpowiedz A</label></div>
    <div><input type="text" name="" id="" v-model="odpB"><label><input type="checkbox" name="" id="" value="b" v-model="correct">Odpowiedz B</label></div>
    <div><input type="text" name="" id="" v-model="odpC"><label><input type="checkbox" name="" id="" value="c" v-model="correct">Odpowiedz C</label></div>
    <div><input type="text" name="" id="" v-model="odpD"><label><input type="checkbox" name="" id="" value="d" v-model="correct">Odpowiedz D</label></div>

  </div>
  <div v-if='type=="open"'>
    <div>
      Odpowiedz:
      <input type="text" name="" id="" v-model="correct">
    </div>
  </div>
  <div v-if='type=="TF"'>
    <div><label><input type="radio" name="odp" id="" value="true" v-model="correct"> Prawda</label></div>
    <div><label><input type="radio" name="odp" id="" value="false" v-model="correct"> Fałsz</label></div>
  </div>
  <div v-if='type=="List"'>
    <div><input type="text" name="" id="" v-model="odpA"> <input type="radio" name="odp" id="" value="a" v-model="correct"></div>
    <div><input type="text" name="" id="" v-model="odpB"> <input type="radio" name="odp" id="" value="b" v-model="correct"></div>
    <div><input type="text" name="" id="" v-model="odpC"> <input type="radio" name="odp" id="" value="c" v-model="correct"></div>
    <div><input type="text" name="" id="" v-model="odpD"> <input type="radio" name="odp" id="" value="d" v-model="correct"></div>
  </div>
  <div v-if='type=="Word"'>
    <input type="text" name="" id="">
  </div>

</div>
  {{correct}}
  <button @click="handleNewQ">Dodaj pytanie</button>
</template>

<script>
export default {
  name: "NewQA",
  data(){
    return{
      type:"radio",
      typeName:"Jednokrotnego wyboru",
      levelColor:"#009900",
      value:"1",
      levelName:"EASY",
      question:'',
      odpA:'',
      odpB:'',
      odpC:'',
      odpD:'',
      correct:[],
      newQ:[]
    }
  },
  methods:{
    changeType(){
      if(this.type==="radio"){
        this.type="box"
        this.typeName="Wielokrotnego wyboru"
      }else if(this.type==="box"){
        this.type="open"
        this.typeName="Otwarte"
      }else if(this.type==="open"){
        this.type="TF"
        this.typeName="Prawda/Fałsz"
      }else if(this.type==="TF"){
        this.type="List"
        this.typeName="Lista"
      }else if(this.type==="List"){
        this.type="Word"
        this.typeName="Uzupełnianie słowa"
      }else if(this.type==="Word"){
        this.type="radio"
        this.typeName="Jednokrotnego wyboru"
      }
    },
    updateLevel(){
      if(this.value=="1"){
        this.levelColor="#009900"
        this.levelName="EASY"
      }
      if(this.value=="2"){
        this.levelColor="#997300"
        this.levelName="MEDIUM"
      }
      if(this.value=="3"){
        this.levelColor="#800000"
        this.levelName="HARD"
      }
    },
    handleNewQ(){
      if(this.type=="radio" || this.type=="box" ||this.type=="List"){
        this.newQ={
        Question: this.question,
        odpA: this.odpA,
        odpB: this.odpB,
        odpC: this.odpC,
        odpD: this.odpC,
        correct: this.correct,
        }
      }
      else if(this.type=="open" || this.type=="Word"){
        this.newQ={
          Question: this.question,
          correct: this.correct
        }
      }
      else if(this.type=="TF"){
        this.newQ={
          Question: this.question,
          correct: this.correct
        }
      }
      // console.log(this.newQ)

      switch (this.value) {
        case "1":
          fetch('http://localhost:3000/QAEasy',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.newQ)
          })
              break
        case "2":
          fetch('http://localhost:3000/QAMedium',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(this.newQ)
          })
              break
        case "3":
          fetch('http://localhost:3000/QAHard',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.newQ)

          })
              break
      }

    }
  }
}
</script>
<style scoped>
.QAType{
  width: 600px;
  height: 100px;
  border: 3px solid black;
  border-radius: 14px;
  padding: 10px;
  text-align: center;
  margin:20px 0 50px 0;
}
.QAType > *{
  /*position:relative;*/
  cursor: pointer;
}
input[type="range"]{
  -webkit-appearance: none;
  background-color: transparent;
  width: 350px;
}
#container{
  font-weight: 900;
}
input[type="text"]{
  width: 450px;
  height: 45px;
  background-color: transparent;
  border:none;
  border-bottom:1px solid #00b3ff;
  font-size: 35px;
  color:white;



  word-wrap: break-word;
  word-break: break-all;
}


</style>