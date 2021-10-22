import Vue from 'vue'

var studArray = [
    {
        "ID" : "1",
    "PIB": "Budovskiy Danil",
    "group": "RPZ_18_2_9",
    "year": "2003",
    "pr": true
    },
    {
        "ID" : "2",
        "PIB": "Artem Kharchenko",
    "group": "RPZ_18_2_9",
    "year": "2003",
    "pr": false
    },
    {
        "ID" : "3",
        "PIB": "Sergey Voloshko",
    "group": "RPZ_18_2_9",
    "year": "2002",
    "pr": true
    },
    {
        "ID" : "4",
        "PIB": "Evgeniy Mormul",
    "group": "RPZ_18_2_9",
    "year": "2002",
    "pr": true
    },
    ]
    new Vue ({
    el: '#app',
    data: {
        studs: studArray,
        search: ''
        
    },
    methods: {
      removeElement: function (ID) {
       this.studs =  this.studs.filter(elem => elem.ID!=ID);
       /* this.studs.splice(ID - 1, 1); */
      }
    }
    
    })
        