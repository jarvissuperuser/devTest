var $ = $?$:{};

var root = {
    forms:document.querySelectorAll("form"),
    mockTableData:{
        students:[
            {
                profile:{"name":"test", "surname":"tester"},
                uid:"123",
                grade:"3",
                class:"7",
                modules:[
                    "math","content","english","shona"
                ]
            },
            {
                profile:{"name":"rest", "surname":"rester"},
                uid:"124",
                grade:"3",
                class:"7",
                modules:[
                    "math","ndebele","english","shona","science"
                ]
            }
        ],
        educators:[
            {
                profile:{"name":"fest", "surname":"fester"},
                uid:"125",
                modules:[
                    "math","content"
                ],
                pupils:[]
            },
            {
                profile:{"name":"jest", "surname":"jester"},
                uid:"126",
                modules:[
                    "math","content"
                ]
            }

        ],
        parents:[
            {},
            {}
        ]

    },
    logged:{
        uid:1,
        AUTH:"Session"
    },
    tableHideList:[2,4,5],
    destination:"http://localhost:3000"
};
$(document).ready(function(){
    if (window.location.hash === ""){
        window.location.hash ="#register";
    }else{
        formsSPA();
    }
    $(window).on(
        "hashchange",
        function(e){
            formsSPA();
            $('title').text(location.hash.substring(1));
            //formReady();
        }
    );
    formReady();

});
let formReady = function () {
    var forms = root.forms;
    forms.forEach(function (form,idx) {
        console.log(form.id);
        $('#'+form.id).on('submit',function (e) {
            e.preventDefault();
            var data = $('#'+form.id).serializeArray();
            var well_dressed = {};
            data.forEach(function(element){
                well_dressed[element.name] = element.value;
            });
            //console.log({form:data,index:idx});
            switch (location.hash){
                case "#login":
                    well_dressed["submit"] = 'login';
                    post(well_dressed);
                    break;
                case "#register":
                    well_dressed["submit"] = 'add_user';
                    post(well_dressed);
                    break;
                case "#recover":
                    well_dressed["submit"] = 'reset_password';
                    post(well_dressed);
                    break;
                default:
                    alert("Big error");
            }

            // console.log({form:data,index:idx});
            //sendToServer("http://localhost/datasv.php",data);

        } );
    });

};

function formsSPA(){
    var forms = root.forms;
    $(forms).each(
        function(id,form){
            var hashLocation = window.location.hash.substr(1);
            if (form.id === hashLocation)
                $(form).fadeIn("fast");
            else
                $(form).hide("");

        }
    );
}

function navMan(hash) {
    $('.nav-link')

}

function tableCreate(data,depth){
    //$("#data").empty();
    if (data){
        var table = document.createElement("table");
        var header = table.createTHead();
        table.style = "text-align:center";
        var rowCount = 0;
        var row = header.insertRow(0);
        for(key in data[0]){
            var cell = row.insertCell(rowCount++);
            cell.innerHTML = valueProcessor(undefined,key).toUpperCase().bold();
            cell.style.padding = "10px 30px 10px ";
            if (hideCell(rowCount)){
                cell.classList.add("w3-hide-small");
            }
        };
        data.forEach(function(entry,key){
            row  = table.insertRow(key+1);
            var rowExtract = data[key];
            var count = 0;
            for(p in rowExtract){
                var cell = row.insertCell(count++);
                cell.innerHTML = valueProcessor(rowExtract[p],p);
                if (hideCell(count)){
                    cell.classList.add("w3-hide-small");
                }
            }
        });
        table.style.borderSpacing = 0;
        header.style = "background-color:black;color:white";
        table.style.whiteSpace = "normal";
        $("#data").html(table);
        $("td").on("click",function(){
            var val = $(this).parent().find(":nth-child("+ depth +")").text();
            console.log(val);
        });
    }
}
function valueProcessor(str,key){
    switch(key){
        case "uid":
            return str?str:"students number";
        case "profile":
            return str?str.name + " " + str.surname :"name";
        default:
            return str?str:key;
    }
}
function hideCell(num){
    var a = false;
    root.tableHideList.some(function(entry,key){
        a = entry === num;
        return  a;
    });
    return a;
}

function post(data) {
    switch (location.hash) {
        case "#login":
            $.post(root.destination +"/users/auth",data,function (res) {
                console.log(res);
            },'JSON');
            break;
        case "#register":
            $.ajax({
                type: 'PUT',
                url: root.destination + "/users/auth",
                contentType: 'application/json',
                data: JSON.stringify(data),
            }).done(function (res) {
                console.log('SUCCESS',res);
            }).fail(function (msg) {
                console.log('FAIL', msg);
            }).always(function (msg) {
                console.log('ALWAYS');
            });
            break;
        case "#password":
            $.ajax({
                type: 'UPDATE',
                url: root.destination + "/users/auth",
                contentType: 'application/json',
                data: JSON.stringify(data),
            }).done(function (res) {
                console.log('SUCCESS',res);
            }).fail(function (msg) {
                console.log('FAIL', msg);
            }).always(function (msg) {
                console.log('ALWAYS');
            });
            break;

    }
}


/**
 * function is deprecated.
 */
function sendToServer(addr,data){
    var reorgData = {};
    data.forEach(function (d) {
        reorgData[d.name] = d.value;
    });
    reorgData["submit"] = location.hash.substring(1);
    $.post(addr,reorgData,function (response) {
        alert(response);
    });
}