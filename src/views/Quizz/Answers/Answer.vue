<template>
  <h4>Pytanie: {{question.Question}}</h4>
<!--jedonkrotny wybór-->
  <div v-if='question.type=="radio"'>
    <div class="odp" @click='radioChose("a")'>{{question.odpA}}</div>
    <div class="odp" @click='radioChose("b")'>{{question.odpB}}</div>
    <div class="odp" @click='radioChose("c")'>{{question.odpC}}</div>
    <div class="odp" @click='radioChose("d")'>{{question.odpD}}</div>
  </div>
<!--  wielokrotny wybór-->
  <div v-if='question.type=="box"'>
    <div class="odp" @click='toggleChose("a")'>{{question.odpA}}</div>
    <div class="odp" @click='toggleChose("b")'>{{question.odpB}}</div>
    <div class="odp" @click='toggleChose("c")'>{{question.odpC}}</div>
    <div class="odp" @click='toggleChose("d")'>{{question.odpD}}</div>
    <button @click="check">zatwierdz</button>
  </div>
<!--  prawda/fałsz-->
  <div v-if='question.type=="TF"'>
    <div @click="openCheck">Prawda</div>
    <div @click="openCheck">Fałsz</div>
  </div>
<!--otwarte-->
  <div v-if='question.type=="open"'>
    <input type="text" v-model="answers">
    <button @click="openCheck">zatwierdz</button>
  </div>
<!--lista Rozwijana-->
  <div v-if='question.type=="List"'>

    <select v-model="answers">
      <option disabled value="">Wybierz jedno</option>
      <option>{{question.odpA}}</option>
      <option>{{question.odpB}}</option>
      <option>{{question.odpC}}</option>
      <option>{{question.odpD}}</option>
    </select>
    <button @click="openCheck">zatwierdz</button>
  </div>
<!--Sortowanie DO ZROBIENIA-->

<!--  <div v-if='question.type=="Sort"'>-->
<!--    <div class="sort">-->
<!--      <div class="dropZone" v-on:dragenter="onDragEnter" v-on:dragleave="onDragLeave" >-->
<!--        <div v-for="odp in question.sortanswer" :key="odp">-->
<!--          <div class="dropable" v-on:dragstart="onDragStart" v-on:dragend="onDragEnd" draggable="true">{{ odp }}</div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="dropZone" v-on:dragenter="onDragEnter" v-on:dragleave="onDragLeave">-->
<!--        <div v-for="chosen in answers" :key="chosen">-->
<!--          <div class="dropable" draggable="true" v-on:dragstart="onDragStart" v-on:dragend="onDragEnd2">{{chosen}}</div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--  <button @click="Sorting">zatwierdz</button>-->
<!--uzupełnianie słowa-->
  <div v-if='question.type=="Word"'>
    <input type="text" v-model="answers">
    <button @click="openCheck">zatwierdz</button>
  </div>
<!--  Linie-->
  <div v-if='question.type=="Line"'>
  </div>

</template>

<script>

export default {
  name: "Answer",
  props:['id',"input"],
  data(){
    return{
      question:[],
      setAnswer:false,
      answers:[],
      unsortAnswer:[],
      isDragging:false,
      draggableplace:false,
    }
  },
  async mounted() {
    fetch(this.input+"/"+ this.id)
        .then(res => res.json())
        .then(data => this.question = data)
        .catch(err => console.log(err.message))
  },
  methods:{

    // onDragStart(event){
    //   this.isDragging = true
    //   const tempDragItem= event.target.innerHTML
    //   // console.log('złapano '+JSON.stringify(tempDragItem))
    //   console.log('złapano '+ tempDragItem)
    //   event.dataTransfer.setData('text/plain',tempDragItem)
    // },
    // onDragEnd(event){
    //   // opuszczono w dobre miejsce
    //   const data=(event.dataTransfer.getData('text/plain'))
    //   this.isDragging = false
    //     console.log('puszczono: '+ data)
    //     this.answers.push(data)
    //     this.question.sortanswer.filter((data) => {
    //       return this.question.sortanswer !== data
    //     })
    // },
    // onDragEnd2(event){
    //   // opuszczono w dobre miejsce
    //   const data=(event.dataTransfer.getData('text/plain'))
    //   this.isDragging = false
    //   console.log('puszczono: '+ data)
    //   this.answers.push(data)
    //   this.question.sortanswer.filter((item) => {
    //     return this.question.sortanswer !== item
    //   })
    // },
    //
    //
    // onDragEnter(event){
    //   this.draggableplace=true
    // },
    // onDragLeave(event){
    //   this.draggableplace=false
    // },





    radioChose(answer){
      if(answer==this.question.correct){
      console.log("porawna odp")
      }else{
        console.log("Błędna odp")
      }
    },
    toggleChose(answer){
      if(!this.answers.includes(answer)){
        this.answers.push(answer)
      }
      else{
        this.answers=this.answers.filter((item) => {
          return answer !==item
        })
      }
    },
    check(){
      // console.log(this.answers+" | "+this.question.correct)
      // console.log(this.answers.length+" | "+this.question.correct.length)
      if(!this.setAnswer){
        if(this.answers.length==this.question.correct.length){
          // if(this.answers.length>1){
            this.answers.sort()
            this.question.correct.sort()
            if(JSON.stringify(this.answers) === JSON.stringify(this.question.correct)){
              console.log("poprawna odpowiedz")
              this.$emit('score',1)
            }
            else{
              console.log("błedna odp")
            }
        }else{
          console.log("błędna odpowiedz")
        }
        this.setAnswer=true
      }else{
        console.log("odpowiedziano już")
      }
    },
    openCheck(){
      if(!this.setAnswer){
        // console.log(this.answers + " | "+this.question.correct)
        if(this.answers == this.question.correct){
          console.log("poprawna odpowiedz")
          this.$emit('score',1)
        }else{
          console.log("błędna odpowiedz")
        }
      }
      else{
        console.log("odpowiedziano już")
      }
    },
    changePos(value){
      console.log(value)
    }
  }
}
</script>

<style scoped>
.odp{
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: aquamarine;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
}

.odp:hover{
  background-color: #108ec4;
}
.dropable{
  width:fit-content;
  height: fit-content;
  background-color: greenyellow;
  border-radius: 8px;
  padding: 15px;
  margin:15px;
}
.dropZone{
  display: flex;
  width: 270px;
  height: 235px;
  background-color: gray;
  border-radius: 12px;
  margin:10px;
  padding: 8px;
}
.sort{
  display: flex;
}
</style>