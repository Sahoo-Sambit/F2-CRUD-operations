//validate form inputs
function validateForm() {    
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var gpa=document.getElementById("gpa").value;
    var age=document.getElementById("age").value;
    var degree=document.getElementById("degree").value;
    if(name == ""){
        alert("Name is required");
        return false;
    }
    if(email == ""){
        alert("Email is required");
        return false;
    }else if(!email.includes("@")){
        alert("Invalid Email address");
        return false;
    }
    if(gpa == ""){
        alert("GPA is required");
        return false;
    }
    else if(gpa < 0){
        alert("Invalid GPA");
        return false;
    }
    if(age == ""){
        alert("Age is required");
        return false;
    }else if(age < 0){
        alert("Age must be greater than 0");
        return false;
    }
    if(degree == ""){
        alert("Degree is required");
        return false;
    }
    return true;
}

//function to show data
function showData() {
    var studentList;
    if(localStorage.getItem("studentList") == null){
        studentList=[];
    }
    else{
        studentList=JSON.parse(localStorage.getItem("studentList"))
    }
    var html="";
    studentList.forEach(function (element, index) {
        html+="<tr>";
        html+="<td>" + index + "</td>";
        html+="<td>" + element.name + "</td>";
        html+="<td>" + element.email+ "</td>";
        html+="<td>" + element.gpa + "</td>";
        html+="<td>" + element.age + "</td>";
        html+="<td>" + element.degree + "</td>";
        html+='<td><i onclick="deleteData('+index+')" class="fa-solid fa-trash-can"></i><i onclick="updateData('+
        index+')" class="fas fa-edit"></i>';
        html+="</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML=html;
}

//Loads all data when document is loaded
document.onload=showData();

//function to add data
function AddData() {
    //if form is validate
    if(validateForm()==true){
        var name=document.getElementById("name").value;
        var email=document.getElementById("email").value;
        var gpa=document.getElementById("gpa").value;
        var age=document.getElementById("age").value;
        var degree=document.getElementById("degree").value;
        var studentList;
        if(localStorage.getItem("studentList")==null){
            studentList=[];
        }else {
            studentList=JSON.parse(localStorage.getItem("studentList"));
        }
        studentList.push({
            name: name,
            email:email,
            gpa:gpa,
            age: age,
            degree:degree,
        });

        localStorage.setItem("studentList",JSON.stringify(studentList));
        showData();
        document.getElementsByID("name").value="";
        document.getElementsByID("email").value="";
        document.getElementsByID("gpa").value="";
        document.getElementsByID("age").value="";
        document.getElementsByID("degree").value="";
    }
}

//function to delete data
function deleteData(index) {
    var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[];
    }else {
        studentList=JSON.parse(localStorage.getItem("studentList"));
    }
    studentList.splice(index,1);
    localStorage.setItem("studentList",JSON.stringify(studentList))
    showData();
}

//function to edit data
function updateData(index){
    document.getElementById("submit").style.display="none";
    document.getElementById("edit").style.display="block";
    var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[];
    }else {
        studentList=JSON.parse(localStorage.getItem("studentList"));
    }
    document.getElementById("name").value=studentList[index].name;
    document.getElementById("email").value=studentList[index].email;
    document.getElementById("gpa").value=studentList[index].gpa;
    document.getElementById("age").value=studentList[index].age;
    document.getElementById("degree").value=studentList[index].degree;

    document.querySelector("#edit").onclick=function(){
        if(validateForm()==true){
            studentList[index].name=document.getElementById("name").value;
            studentList[index].email=document.getElementById("email").value;
            studentList[index].gpa=document.getElementById("gpa").value;
            studentList[index].age=document.getElementById("age").value;
            studentList[index].degree=document.getElementById("degree").value;
        }
        localStorage.setItem("studentList",JSON.stringify(studentList));
        showData();
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("gpa").value="";
        document.getElementById("age").value="";
        document.getElementById("degree").value="";

        //update button will hide and show for data updation in local storage
        document.getElementById("submit").style.display="block";
        document.getElementById("edit").style.display="none";
    
    }
}