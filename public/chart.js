let aaa


// ##############################
/*! */
      
// all data from database
let allData = JSON.parse(document.getElementById("inputForChart").value)
let allVisitors = JSON.parse(document.getElementById("inputForVisitors").value)
console.log(allVisitors);
  let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }


    // document.getElementById("searchByDate").value = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())}`
    // showChart()
    let theDate = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())}`
    if (document.getElementById("searchByTime")) {
      document.getElementById("searchByTime").value = "today"
      document.getElementById("from_searchByDate").value = theDate
      document.getElementById("at_searchByDate").value = theDate
    }

    let x_axes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]

    showChart_Orders_Status(0,10,theDate,x_axes,11,13)

    if (document.getElementById("from_searchByDate")) {
      document.getElementById("from_searchByDate").oninput = () => {
        from_at_change()
      }
    document.getElementById("at_searchByDate").oninput = () => {
        from_at_change()
      }
  
    }

function from_at_change() {
  let theOrder = [],
      theVisitorOfTime = []
  // allData.forEach((order) => {
  let minValue = from_searchByDate.value.split("-").join(""),
      maxValue = at_searchByDate.value.split("-").join("")
      // constValue = order.addedIn.slice(0,10).split("-").join("")

  if(!from_searchByDate.value && !at_searchByDate.value){
    selectChange(document.getElementById("searchByTime"))
      console.log("not date ♥");

  }else if(from_searchByDate.value && !at_searchByDate.value){
      console.log("yes from & not at ♥");

      theOrder = allData.filter(order => minValue <= order.addedIn.slice(0,10).split("-").join("") )
      theVisitorOfTime = allVisitors.filter(visitor => minValue <= visitor.addedIn.slice(0,10).split("-").join("") )
      // if (minValue <= constValue) {
      //     console.log("min => " , minValue , "const => ", constValue);
      //     theOrder.push(order)
      // }else{
      //     // product.parentElement.classList.add("NotValidDate")
      // }
      
  }else if(!from_searchByDate.value && at_searchByDate.value){
      console.log("not from & yes at ♥");
      theOrder = allData.filter(order => maxValue >= order.addedIn.slice(0,10).split("-").join("") )
      theVisitorOfTime = allVisitors.filter(visitor => maxValue >= visitor.addedIn.slice(0,10).split("-").join("") )
      // if (maxValue >= constValue) {
      //     // product.parentElement.classList.remove("NotValidDate")
      // }else{
      //     // product.parentElement.classList.add("NotValidDate")
      // }
      
  }else if(from_searchByDate.value && at_searchByDate.value){
      console.log("date ♥");
      theOrder = allData.filter(order => minValue <= order.addedIn.slice(0,10).split("-").join("") && maxValue >= order.addedIn.slice(0,10).split("-").join("") )
      theVisitorOfTime = allVisitors.filter(visitor => minValue <= visitor.addedIn.slice(0,10).split("-").join("") && maxValue >= visitor.addedIn.slice(0,10).split("-").join("") )
      // if (minValue <= constValue && maxValue >= constValue) {
      //     // product.parentElement.classList.remove("NotValidDate")
      // }else{
      //     // product.parentElement.classList.add("NotValidDate")
      // }
      
  }

      // console.log(product.innerText.slice(0,10).split("-").join("") ,  from_searchByDate.value.split("-").join("") , at_searchByDate.value.split("-").join("") );

  // })
  

  // showChart_Orders_Status_from_at(theOrder)
  let lastDate = new Date().setFullYear(+Array.from(document.getElementById("at_searchByDate").value).splice(0,4).join(""),+Array.from(document.getElementById("at_searchByDate").value).splice(5,2).join("") - 1,+Array.from(document.getElementById("at_searchByDate").value).splice(8,2).join(""))
  let firstDate = new Date().setFullYear(+Array.from(document.getElementById("from_searchByDate").value).splice(0,4).join(""),+Array.from(document.getElementById("from_searchByDate").value).splice(5,2).join("") - 1,+Array.from(document.getElementById("from_searchByDate").value).splice(8,2).join(""))
  let result = ( lastDate - firstDate ) / 1000 / 60 / 60 / 24
  console.log(result);
  let x_axes,
      quantite_Start,
      quantite_End;
  if (result < 1) {
    x_axes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    quantite_Start = 11
    quantite_End = 13
    showChart_Orders_Status_from_at(theOrder,x_axes,quantite_Start,quantite_End,theVisitorOfTime)
  } else if (result < 2) {
    // let startHour = +Array.from(document.getElementById("from_searchByDate").value).splice(8,2).join("")
    // let lastHour = +Array.from(document.getElementById("at_searchByDate").value).splice(8,2).join("")
    // let last = []
    // for (let i = 0; i < 24 - startHour; i++) {
    //   last.push(startHour + i)
      
    // }
    // for (let i = 0; i <= lastHour; i++) {
    //   last.push(i)
      
    // }
    // x_axes = last.map(num => num < 10 ? `0${num}` : `${num}`)
    // console.log(x_axes,"zz");
    x_axes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    quantite_Start = 11
    quantite_End = 13
    showChart_Orders_Status_from_at(theOrder,x_axes,quantite_Start,quantite_End,theVisitorOfTime)
  } else if (result < 31) {
    let startDay = +Array.from(document.getElementById("from_searchByDate").value).splice(8,2).join("")
    let lastDay = +Array.from(document.getElementById("at_searchByDate").value).splice(8,2).join("")
    // let last = []
    // for (let i = 0; i < 31 - startDay; i++) {
    //   last.push(startDay + i )
      
    // }
    // for (let i = 0; i <= lastDay; i++) {
    //   last.push(i)
      
    // }
    
    // x_axes = last.map(num => `${num}`)
    
    x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24","25","26","27","28","29","30","31"]
    
  
    let myAxe = [...x_axes.slice(startDay < 10 ? x_axes.indexOf(`0${startDay}`)  : x_axes.indexOf(`${startDay}`) ),...x_axes.slice(0,startDay < 10 ? x_axes.indexOf(`0${startDay}`)  : x_axes.indexOf(`${startDay}`) ),...x_axes.slice(startDay < 10 ? x_axes.indexOf(`0${startDay}`)  : x_axes.indexOf(`${startDay}`), lastDay < 10 ? x_axes.indexOf(`0${lastDay}`) + 1 : x_axes.indexOf(`${lastDay}`) + 1 )] 
    // console.log(myAxe, startDay < 10 ? `0${startDay}` : `${startDay}`, "éééééééééé", startDay < 10 ? x_axes.indexOf(`0${startDay}`) : x_axes.indexOf(`${startDay}`) );
    x_axes = myAxe
    quantite_Start = 8
    quantite_End = 10
    showChart_Orders_Status_from_at(theOrder,x_axes,quantite_Start,quantite_End,theVisitorOfTime)
  } else if (result >= 31) {
    // let startMonth = +Array.from(document.getElementById("from_searchByDate").value).splice(5,2).join("")
    // let lastMonth = +Array.from(document.getElementById("at_searchByDate").value).splice(5,2).join("")
    // let last = []
    // for (let i = 0; i < 12 - startMonth; i++) {
    //   last.push(startMonth + i )
      
    // }
    // for (let i = 0; i <= lastMonth; i++) {
    //   last.push(i)
      
    // }
    // x_axes = last.map(num => `${num}`)
    x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    // let myAxe = [...x_axes.slice(startMonth < 10 ? x_axes.indexOf(`0${startMonth}`)  : x_axes.indexOf(`${startMonth}`) ),...x_axes.slice(0,startMonth < 10 ? x_axes.indexOf(`0${startMonth}`)  : x_axes.indexOf(`${startMonth}`) ),...x_axes.slice(startMonth < 10 ? x_axes.indexOf(`0${startMonth}`)  : x_axes.indexOf(`${startMonth}`), lastMonth < 10 ? x_axes.indexOf(`0${lastMonth}`) + 1 : x_axes.indexOf(`${lastMonth}`) + 1 )] 
    // console.log(myAxe, startDay < 10 ? `0${startDay}` : `${startDay}`, "éééééééééé", startDay < 10 ? x_axes.indexOf(`0${startDay}`) : x_axes.indexOf(`${startDay}`) );
    // x_axes = myAxe


    quantite_Start = 5
    quantite_End = 7
    showChart_Orders_Status_from_at(theOrder,x_axes,quantite_Start,quantite_End,theVisitorOfTime)
  }
  
}



if (document.getElementById("searchByTime")) {
  document.getElementById("searchByTime").oninput = (eo) => {
    selectChange(eo.target)
  }
}
function selectChange(target) {
  if (target.value == "today") {

    let theDate = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())}`
    let x_axes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]

    showChart_Orders_Status(0,10,theDate,x_axes,11,13)

    document.getElementById("from_searchByDate").value = theDate
    document.getElementById("at_searchByDate").value = theDate
  } else if (target.value == "yesterday") {

    let theDate = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate() - 1)}`
    let x_axes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    
    showChart_Orders_Status(0,10,theDate,x_axes,11,13)

    document.getElementById("from_searchByDate").value = theDate
    document.getElementById("at_searchByDate").value = theDate

  } else if (target.value == "this month") {

    console.log("this month");
    let theDate = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}`
    let x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24","25","26","27","28","29","30","31"]

    showChart_Orders_Status(0,7,theDate,x_axes,8,10)

    document.getElementById("from_searchByDate").value = ""
    document.getElementById("at_searchByDate").value = ""
    
  } else if (target.value == "last month") {

    console.log("last month");
    let theDate = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth())}`
    let x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24","25","26","27","28","29","30","31"]

    showChart_Orders_Status(0,7,theDate,x_axes,8,10)

    document.getElementById("from_searchByDate").value = ""
    document.getElementById("at_searchByDate").value = ""

  } else if (target.value == "this year") {

    console.log("this year");
    let theDate = `${checkDate(date.getFullYear())}`
    let x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    showChart_Orders_Status(0,4,theDate,x_axes,5,7)
    
    document.getElementById("from_searchByDate").value = ""
    document.getElementById("at_searchByDate").value = ""

  } else if (target.value == "last year") {

    console.log("last year");
    let theDate = `${checkDate(date.getFullYear() - 1)}`
    let x_axes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    showChart_Orders_Status(0,4,theDate,x_axes,5,7)
    
    document.getElementById("from_searchByDate").value = ""
    document.getElementById("at_searchByDate").value = ""

  }
}
function showChart_Orders_Status_from_at(theOrder,x_axes,quantite_Start,quantite_End,theVisitorOfTime) {
    // array contains all labels value for chart ( order && status)
    let labelsValuesForOrders = [],
    labelsValuesForStatus = [],
    labelsValuesForCollections = [],
    labelsValuesForAmount = [];

// all values for status chart
let status = ["confirmed","prepared","shipped","delivered","paid","outofstock","unreached","canceled","refused","awaiting_return","returned","pending"]
let colorForStatus = ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50","#ff9800","#ff03d3","#f44336","#ff0000","#444444","#000000","#ffc107"]

// all values for collection chart
let collections = ["glasses","shoes","accessories","panties","shirts"]
let colorForCollections = ["#ff6384","#4bc0c0","#ffcd56","#c9cbcf","#36a2eb"]

// loop for orders chart
for (let i = 0; i < x_axes.length; i++) {
  let quantitleForOrders = 0
  let amountForOrders = 0
  theOrder.forEach((order) => {
    if (order.addedIn.slice(quantite_Start,quantite_End) == x_axes[i]) {
      quantitleForOrders++
      amountForOrders += +order.total
    }
  })
  labelsValuesForOrders.push(quantitleForOrders)
  labelsValuesForAmount.push(amountForOrders)
}

// loop for status chart
for (let i = 0; i < status.length; i++) {
  let quantitleForStatus = 0
  theOrder.forEach((order) => {
    if (order.status[order.status.length - 1].statue == status[i]) {
      quantitleForStatus++
    }
  })
  labelsValuesForStatus.push(quantitleForStatus)
}
// create variable contain all value for status chart
let labelDataResultForStatut = {
  status : [],
  quantite : [],
  color : []
 }
 labelsValuesForStatus.forEach((item,index) => {
  if (item != 0) {
    labelDataResultForStatut.status.push(status.splice(index,1))
    labelDataResultForStatut.quantite.push(labelsValuesForStatus.splice(index,1))
    labelDataResultForStatut.color.push(colorForStatus.splice(index,1))

  }
});

  // loop for collections chart
  for (let i = 0; i < collections.length; i++) {
    let quantitleForCollections = 0
    theOrder.forEach((order) => {
      order.products.forEach((prod) => {
        if (prod.type == collections[i]) {
          quantitleForCollections++
        }
      })
     
    })
    labelsValuesForCollections.push(quantitleForCollections)
  }

  // create variable contain all value for collections chart
  let labelDataResultForCollections = {
    collections : collections,
    quantite : labelsValuesForCollections,
    color : colorForCollections
   };

  labelChartForOrders(x_axes,labelsValuesForOrders)
  labelChartForAmounts(x_axes,labelsValuesForAmount)
  labelChartForStatus(labelDataResultForStatut)
  labelChartForCollections(labelDataResultForCollections)
  updateValuesForTopWidget(theOrder,theVisitorOfTime)
  document.getElementById("searchByTime").value = "time"
  console.log(theVisitorOfTime,"jjjjjjjjj");
}
function showChart_Orders_Status(theOrder_Start,theOrder_End,theDate,x_axes,quantite_Start,quantite_End) {
  // array contains all labels value for chart ( order && status)
  let labelsValuesForOrders = [],
      labelsValuesForStatus = [],
      labelsValuesForCollections = [],
      labelsValuesForAmount = [];
  
  // all values for status chart
  let status = ["confirmed","prepared","shipped","delivered","paid","outofstock","unreached","canceled","refused","awaiting_return","returned","pending"]
  let colorForStatus = ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50","#ff9800","#ff03d3","#f44336","#DF2E38","#444444","#000000","#ffc107"]
  // let colorForStatus = ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50","#ff9800","#ff03d3","#f44336","#ff0000","#444444","#000000","#ffc107"]
  
  // all values for collection chart
  let collections = ["glasses","shoes","accessories","panties","shirts"]
  let colorForCollections = ["#ff6384","#4bc0c0","#ffcd56","#c9cbcf","#36a2eb"]
  // let colorForCollections = ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50"]
  

  // let dataForShow = []

  // filter orders with time ( days || month || years )
  let theOrder = allData.filter(order => order.addedIn.slice(theOrder_Start,theOrder_End) == theDate)
  let theVisitorOfTime = allVisitors.filter(visitor => visitor.addedIn.slice(theOrder_Start,theOrder_End) == theDate)

  // loop for orders chart
  for (let i = 0; i < x_axes.length; i++) {
    let quantitleForOrders = 0
    let amountForOrders = 0
    theOrder.forEach((order) => {
      if (order.addedIn.slice(quantite_Start,quantite_End) == x_axes[i]) {
        quantitleForOrders++
        amountForOrders += +order.total
      }
    })
    labelsValuesForOrders.push(quantitleForOrders)
    labelsValuesForAmount.push(amountForOrders)
  }

  // loop for status chart
  for (let i = 0; i < status.length; i++) {
    let quantitleForStatus = 0
    theOrder.forEach((order) => {
      if (order.status[order.status.length - 1].statue == status[i]) {
        quantitleForStatus++
      }
    })
    labelsValuesForStatus.push(quantitleForStatus)
  }
  // create variable contain all value for status chart
  let labelDataResultForStatut = {
    status : [],
    quantite : [],
    color : []
   }
   labelsValuesForStatus.forEach((item,index) => {
    if (item != 0) {
      labelDataResultForStatut.status.push(status.splice(index,1))
      labelDataResultForStatut.quantite.push(labelsValuesForStatus.splice(index,1))
      labelDataResultForStatut.color.push(colorForStatus.splice(index,1))

    }
  });

    // loop for collections chart
    for (let i = 0; i < collections.length; i++) {
      let quantitleForCollections = 0
      theOrder.forEach((order) => {
        order.products.forEach((prod) => {
          if (prod.type == collections[i]) {
            quantitleForCollections++
          }
        })
       
      })
      labelsValuesForCollections.push(quantitleForCollections)
    }

    // create variable contain all value for collections chart
    let labelDataResultForCollections = {
      collections : collections,
      quantite : labelsValuesForCollections,
      color : colorForCollections
     };
 
  labelChartForOrders(x_axes,labelsValuesForOrders)
  labelChartForAmounts(x_axes,labelsValuesForAmount)
  labelChartForStatus(labelDataResultForStatut)
  labelChartForCollections(labelDataResultForCollections)
  updateValuesForTopWidget(theOrder,theVisitorOfTime)
}
function labelChartForOrders(x_axes,labelsValuesForOrders) {

  let ctx = document.querySelector('#orderChart canvas');
  ctx.remove()
  document.getElementById('orderChart').innerHTML += '<canvas></canvas>'
  ctx = document.querySelector('#orderChart canvas');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x_axes,
      datasets: [{
        label: '# Orders',
        data: labelsValuesForOrders,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function labelChartForAmounts(x_axes,labelsValuesForAmount) {

  let ctx = document.querySelector('#amountChart canvas');
  ctx.remove()
  document.getElementById('amountChart').innerHTML += '<canvas></canvas>'
  ctx = document.querySelector('#amountChart canvas');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: x_axes,
      datasets: [{
        label: '# Amount MAD',
        data: labelsValuesForAmount,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function labelChartForStatus(labelDataResultForStatut) {

  let ctx = document.querySelector('#statusChart canvas');
  ctx.remove()
  document.getElementById('statusChart').innerHTML += '<canvas></canvas>'
  ctx = document.querySelector('#statusChart canvas');

// ["confirmed","prepared","shipped","delivered","paid","outofstock","unreached","canceled","refused","awaiting_return","returned","pending"]
// ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50","#ff9800","#ff03d3","#f44336","#ff0000","#444444","#000000","#ffc107"]
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labelDataResultForStatut.status,
      datasets: [{
        label: 'Orders',
        data: labelDataResultForStatut.quantite,
        backgroundColor: labelDataResultForStatut.color,
        hoverOffset:  10
      }]
    }
  });
}
function labelChartForCollections(labelDataResultForCollections) {

  let ctx = document.querySelector('#collectionsChart canvas');
  ctx.remove()
  document.getElementById('collectionsChart').innerHTML += '<canvas></canvas>'
  ctx = document.querySelector('#collectionsChart canvas');

// ["confirmed","prepared","shipped","delivered","paid","outofstock","unreached","canceled","refused","awaiting_return","returned","pending"]
// ["#00d4cb","#03a9f4","#2196f3","#8bc34a","#4caf50","#ff9800","#ff03d3","#f44336","#ff0000","#444444","#000000","#ffc107"]
console.log(labelDataResultForCollections);
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labelDataResultForCollections.collections,
      datasets: [{
        label: 'products',
        data: labelDataResultForCollections.quantite,
        backgroundColor: labelDataResultForCollections.color,
        hoverOffset:  10
      }]
    }
  });
}
function updateValuesForTopWidget(theOrder,theVisitorOfTime) {
  // values for top widget ( total orders || total price)

  let totalOrders = theOrder.length,
      totalVisitors = theVisitorOfTime.length,
      convertionRate = totalOrders / totalVisitors * 100
      totalPrices = 0;
  
  theOrder.forEach((order) => {
    totalPrices += +order.total;
  })
  Array.from(convertionRate.toString()).forEach((num,ind) => {
    if (num == ".") {
        convertionRate = Array.from(convertionRate.toString()).slice(0,ind + 3).join("")
    }
})
  document.getElementById("totalOrders").innerHTML = totalOrders
  document.getElementById("totalVisitors").innerHTML = totalVisitors
  document.getElementById("convertionRate").innerHTML = `${totalVisitors != 0 ? convertionRate || 0 : 0}<span>%</span>`

  document.getElementById("totalAmount").innerHTML = `${totalPrices}<span>MAD</span>`

}