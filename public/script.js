var app = new Vue({
  el: '#app',
  data: {
    number: '-1',
    // current: {},
    max: '',
    full: false,
    addedTitle: '',
    addedEntry: '',
    items: {},
    entry:{},
  },
  created: function() {
    this.getItems();
  },
  computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
    number: function(value, oldValue) {
      if (oldValue === '') {
        this.max = value;
      } else {
        this.getEntry();
      }
    },
  },
  methods: {
    getItems: function() {
      axios.get("http://localhost:4321/api/items").then(response => {
        this.items = response.data;
        if(this.items.length>0)
          this.full=true;
        else {
          this.full=false;
        }
        return true;
      }).catch(err => {});
    },
    firstEntry: function() {
      this.number = 0;
    },
    previousEntry: function() {
      console.log(this.items.length);
      if(this.number>0)
        --this.number;
    },
    nextEntry: function() {
      if(this.number<this.items.length-1)
        ++this.number;
    },
    lastEntry: function() {
      this.number = this.items.length-1;
    },
    getRandom: function(max, min = 0) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomEntry: function() {
      console.log(this.items.length);
      if(this.items.length>0){
        this.number = this.getRandom(this.items.length-1);
      }
    },
    getEntry: function(){
      if(this.items.length>this.number)
        this.entry=this.items[this.number];
    },
    addJournal: function() {
      let date = new Date();
      axios.post("http://localhost:4321/api/items", {
        title:this.addedTitle,
        text: this.addedEntry,
        day: date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear(),
        time: (date.getHours() % 12) + ":" + date.getMinutes()
      }).then(response => {
        this.addedTitle="";
        this.addedEntry = "";
        this.getItems();
        // if(this.number<0)
          this.number=0;
        this.getEntry();
        return true;
      }).catch(err => {});

    },
    deleteEntry: function(){
      axios.delete("http://localhost:4321/api/items/"+this.entry.id).then(response =>{
        this.getItems();
        this.number=0;
        // if(this.items.length=0)
        //   this.full=false;
        return true;
      }).catch(err=>{});
    },
  }
});
