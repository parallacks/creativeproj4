var app = new Vue({
  el: '#app',
  data: {
    number: '',
    current: {},
    max: '',
    loading: true,
    addedTitle: '',
    addedEntry: '',
    comments: {},
    ratingArray:new Array(),
  },
  created: function() {

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
        this.xkcd();
      }
    },
  },
  methods: {
    firstEntry: function() {
      this.number = 1;
    },
    previousEntry: function() {
      this.number = --this.current.num;
    },
    nextEntry: function() {
      this.number = ++this.current.num;
    },
    lastEntry: function() {
      this.number = this.max;
    },
    getRandom: function(max, min = 1) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomEntry: function() {
      this.number = this.getRandom(this.max);
    },
    addJournal: function() {
      let date = new Date();
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({
        title: this.addedTitle,
        text: this.addedEntry,
        day: date.getDate() + " - " + (date.getMonth() + 1) + " - " + date.getFullYear(),
        time: (date.getHours() % 12) + ":" + date.getMinutes()
      });
      this.addedName = '';
      this.addedComment = '';
    },
  }
});
