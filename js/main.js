const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const changethemeBtn = document.querySelector('button[class="themebut"]');
const changefontBtn = document.querySelector('button[class="fontsty"]');
var themechange_button = document.getElementById("themechange");
var infobut = document.getElementById("infobut");
var color_theme = 0;
var langpick = 0;
lang_chn(1)
// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){  addBtn.classList.add("active")}  // //if the user value isn't only spaces active the add button
  else{ addBtn.classList.remove("active")} //unactive the add button
}
themegenerate(); // create theme for the entire website
showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null)  listArray = []; //if localstorage has no data,create a blank array
  else listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null)listArray = [];
  else listArray = JSON.parse(getLocalStorageData); 
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0) deleteAllBtn.classList.add("active"); //if array length is greater than 0,active the delete button
  else  deleteAllBtn.classList.remove("active"); //unactive the delete button
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" name="plusbut" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
  bwtheme (1);
  var plusbutton = document.getElementsByName('plusbut');
  for (var i = 0; i<plusbutton.length; i++){plusbutton[i].style.background=color_theme}
  info_Text(1);
  change_font(1); // pick random font

}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null)listArray = []; //if localstorage has no data,create a blank array
  else{  //transforming json string into a js object
    listArray = JSON.parse(getLocalStorageData); 
    listArray = []; //create a blank array
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}

// --added-- ONGUN

function themegenerate() {
var all_items = document.getElementsByName('a');
var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
function populate(a) {
  for ( var i = 0; i < 6; i++ ) { a += hexValues[ Math.round( Math.random() * 14 )]}
  return a;
}
var newColor1 = populate('#');
var newColor2 = populate('#');
var angle = Math.round( Math.random() * 360 );
var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
document.body.style.background = gradient;
document.body.style.backgroundAttachment = "fixed";
color_theme = gradient;
var plusbutton = document.getElementsByName('plusbut');
for (var i = 0; i<plusbutton.length; i++){plusbutton[i].style.background=color_theme}
document.getElementById("result").innerHTML = "🎨(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";;
}

function bwtheme (decider) {
  if (localStorage.getItem("themepick") === null) {
    localStorage.setItem('themepick', "white")
  }
  var theme_Text = (themechange_button.className).length;
  var all_text = document.getElementsByName('text'); // header, nav texts
  var lists = document.getElementsByTagName('li') // to do list elements
  var popup_bg = document.getElementById('popupbg');
  var infotext = document.getElementById('result');
  var infotext2 = document.getElementById('font_view_text');

  var todofield = document.getElementById('todof'); // todo enter field
  var all_items = document.getElementsByName('a'); // buttons
  var theme_color = localStorage.getItem("themepick");
  
  if (decider<1){ // if user clicks sun/moon icon
   if ( localStorage.getItem("themepick").length>4) { // current white, next one dark theme
    themechange_button.className = "btn btn-light btn-md float-end"
    themechange_button.innerHTML   = "<i class='fa fa-sun'></i>"
    color = "#282828";
    txt_color = "white";
    secondary_color = "#282828";
    third_color = "#424242";
    localStorage.setItem("themepick","dark"); //set the item in localstorage

    }
  else { // current dark, next one white theme
    themechange_button.className = "btn btn-dark btn-md float-end"
    themechange_button.innerHTML   = "<i class='fa fa-moon'></i>"
    color = "#f2f2f2";
    txt_color = "black";
    secondary_color = "#f2f2f2";
    third_color = "#E0E0E0";
    localStorage.setItem("themepick","light"); //set the item in localstorage

    } 
  }
  else { // when page refreshes starts over, add/remove/clear buttons clicked
    if ( localStorage.getItem("themepick").length>4) { // current dark theme - 29, next dark theme
      themechange_button.className = "btn btn-dark btn-md float-end"
      themechange_button.innerHTML   = "<i class='fa fa-moon'></i>"
      color = "#f2f2f2";
      txt_color = "black";
      secondary_color = "#f2f2f2";
      third_color = "#E0E0E0";
      localStorage.setItem("themepick","light"); //set the item in localstorage

    }
  else {
      themechange_button.className = "btn btn-light btn-md float-end"
      themechange_button.innerHTML   = "<i class='fa fa-sun'></i>"
      color = "#282828";
      txt_color = "white";
      secondary_color = "#282828";
      third_color = "#424242";
      localStorage.setItem("themepick","dark"); //set the item in localstorage
    } 
  }

  for (var i = 0; i<lists.length; i++){lists[i].style.backgroundColor=third_color; lists[i].style.color=txt_color}
  for (var i = 0; i<all_text.length; i++){all_text[i].style.color=txt_color; all_text[i].style.backgroundColor=secondary_color;}
  for (var i = 0; i<all_items.length; i++){all_items[i].style.backgroundColor=  third_color; all_items[i].style.color=  txt_color;}
  popup_bg.style.backgroundColor = secondary_color;
  todofield.style.backgroundColor = third_color;
  todofield.style.borderColor = color;
  todofield.style.color = txt_color;
  infotext.style.color = txt_color;
  infotext2.style.color = txt_color;

}

function change_font (decider) {
  if (localStorage.getItem("savedfont") === null) {
    localStorage.setItem('savedfont', "Epilogue")
  }
  var current_font = localStorage.getItem("savedfont")
  if (decider>0) {
     selected = current_font;
  }
  else {
    var fontType = ['Andada Pro','Epilogue','Inter','Encode Sans', 'Manrope',
                'Lora','Playfair Display','Archivo','Roboto', 
                'Cormorant','Spectral','Raleway','Work Sans','Lato',
                 'Oswald','Nunito','Source Sans Pro','Oxygen','Open Sans']
    var number = [Math.floor(Math.random() * fontType.length)]
    var selected = fontType[number];
  }

  document.getElementById("result").style.fontFamily = selected;
  var all_text = document.getElementsByName('text');
  var all_items = document.getElementsByName('a');
  var lists = document.getElementsByTagName('li') // to do list elements
  for (var i = 0; i<all_items.length; i++){all_items[i].style.fontFamily = selected;}
  for (var i = 0; i<all_text.length; i++){all_text[i].style.fontFamily = selected;}
  for (var i = 0; i<lists.length; i++){lists[i].style.fontFamily = selected;}
  document.getElementById("todof").style.fontFamily  = selected;  // todo enter field
  document.getElementById("font_view_text").style.fontFamily  = selected;  // todo enter field
  document.getElementById("font_view_text").innerHTML = "🖍️" +selected ;  // Selected font display
  localStorage.setItem("savedfont",selected); 
}

function info_Text(decider) {
  if (localStorage.getItem("infotsit") === null) {
    localStorage.setItem('infotsit', "false")
  }
  var x = document.getElementById("result");
  var y = document.getElementById("font_view_text");
  var info_situ = localStorage.getItem("infotsit")
  if (decider<1) {
    if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
    y.style.visibility = "visible";
    localStorage.setItem("infotsit","true"); 
    } else {
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
    localStorage.setItem("infotsit","false"); 
    }
  }
  else {
    if (info_situ.length>4) {x.style.visibility = "hidden"; y.style.visibility = "hidden";}
    else   {x.style.visibility = "visible"; y.style.visibility = "visible";}
  }

}

function lang_chn(decider) {
  var all_text = document.getElementsByName('text'); // header, nav texts
  var all_items = document.getElementsByName('a'); // buttons
  var todofield = document.getElementById('todof'); // todo enter field
  if (localStorage.getItem("langsel") === null) {
    localStorage.setItem('langsel', -1)
  }
  if (decider<1) {var current_language = parseInt(localStorage.getItem("langsel"))+1;}
  else {var current_language = parseInt(localStorage.getItem("langsel"));}

  if (current_language<1 ||current_language>3 ){ // english
    all_text[0].innerHTML = "Fungi: to do list application ";
    all_text[2].innerHTML = "Contact";
    all_text[6].innerHTML = "Portfolio";
    all_text[1].innerHTML = "You have " +"<span class='pendingTasks'></span> " + " pending tasks"
    showTasks()
    todofield.placeholder = "Add your new to do element"
    all_items[0].innerHTML = "Clear All"
    all_items[1].innerHTML = "Change theme <i class='fas fa-palette'></i>"
    all_items[2].innerHTML = "Change Font-style <i class='fas fa-pen'></i> "
    all_items[3].innerHTML = "Change Language <i class='fas fa-globe-americas'></i>"
    localStorage.setItem("langsel",0); 

  }
  else if (current_language<2){ // turkish
    all_text[0].innerHTML = "Fungi: yapılacaklar listesi uygulaması ";
    all_text[1].innerHTML = "<span class='pendingTasks'></span> " + " bekleyen eleman var"
    showTasks()
    todofield.placeholder = "Listeye yeni eleman ekle"
    all_text[2].innerHTML = "İletişim";
    all_text[6].innerHTML = "Portföy";
    all_items[0].innerHTML = "Hepsini sil"
    all_items[1].innerHTML = "Tema değiştir <i class='fas fa-palette'></i>"
    all_items[2].innerHTML = "Yazı stili değiştir <i class='fas fa-pen'></i> "
    all_items[3].innerHTML = "Dil değiştir <i class='fas fa-globe-americas'></i>"
    localStorage.setItem("langsel",1); 
  }
  else if (current_language<3){ // german
    all_text[0].innerHTML = "Fungi: to do listen App";
    all_text[1].innerHTML = "Insgesamt Element " + "<span class='pendingTasks'></span> " 
    showTasks()
    todofield.placeholder = "Neues Element zur Liste hinzufügen"
    all_text[2].innerHTML = "Kommunikation";
    all_text[6].innerHTML = "Portfolio";
    all_items[0].innerHTML = "Alles löschen"
    all_items[1].innerHTML = "Theme ändern <i class='fas fa-palette'></i>"
    all_items[2].innerHTML = "Schriftstil ändern <i class='fas fa-pen'></i> "
    all_items[3].innerHTML = "Sprache ändern <i class='fas fa-globe-americas'></i>"
    localStorage.setItem("langsel",2); 

  }
  else if (current_language<4){ // polish
    all_text[0].innerHTML = "Fungi: listy rzeczy do zrobienia";
    all_text[2].innerHTML = "Kontakt";
    all_text[6].innerHTML = "Portfel";
    all_text[1].innerHTML = "Liczba oczekujących zadań " +"<span class='pendingTasks'></span> " 
    showTasks()
    todofield.placeholder = "Dodaj nowy element do zrobienia"
    all_items[0].innerHTML = "Usuń wszystko"
    all_items[1].innerHTML = "Zmień motyw <i class='fas fa-palette'></i>"
    all_items[2].innerHTML = "Zmień styl czcionki <i class='fas fa-pen'></i> "
    all_items[3].innerHTML = "Zmień język <i class='fas fa-globe-americas'></i>"
   // if (decider<1) {localStorage.setItem("langsel",-1) ;} // çalışıyor
  //  else { localStorage.setItem("langsel",2); }
    localStorage.setItem("langsel",3); 
   // localStorage.setItem("langsel",-1); 

    //current_language = -1;
  }
  
}
// button actions
changethemeBtn.onclick = ()=> { themegenerate()} // total theme
themechange_button.onclick = ()=> {bwtheme(0)} // black / white
changefontBtn.onclick = () => { change_font(0)} // font change button
infobut.onclick = ()=> {info_Text(0)} // info button to display font theme
document.querySelector('button[class="lanbut"]').onclick = ()=> {lang_chn(0)}


