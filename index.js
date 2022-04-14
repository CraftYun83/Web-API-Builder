const patheventele = document.getElementById('pathevent');
const plaintextele = document.getElementById('returnplaintext');
const jsontextele = document.getElementById('returnjson');
const connectdbele = document.getElementById('connectdb');
const clearbuttonele = document.getElementById('clearbutton');
const exportbuttonele = document.getElementById('exportbutton');
var curelement = undefined;
var patheventsubmit = undefined;
var defaultpath = false
var returnText = ""
var templateTextfront = ""
var templateTextback = ""
var txt = ""
var returnTextt = ""
var connecteddb = false
var fcount = 1

function IsJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportAPI() {

  document.getElementById("title").parentNode.removeChild(document.getElementById("title"))

  returnText = ""
  txt = ""
  returnTextt = ""
  templateTextfront = "from flask import Flask \nimport json \napp = Flask(__name__) \n"
  templateTextback = "\napp.run(host='0.0.0.0', port=80)"
  fcount = 1

  for (let i = 0; i < document.getElementById('structure-viewer').childNodes.length; i++) {
      txt = document.getElementById('structure-viewer').childNodes[i].textContent
      if (txt.includes("On POST request of")) {
          returnText += '@app.route("'+txt.replace('On POST request of ', "").replace(' do: ', "")+'")\n'
          returnText += 'def path'+fcount.toString()+"():\n"
          fcount++
      } else if (txt.includes("Return JSON >> ")) {
          returnText += "    return json.loads('"+txt.replace("Return JSON >> ", "")+"')\n"
      } else if (txt.includes('Return "')) {
          returnText += '    return "'+txt.replace('Return ', "").replace('"', "")+"\n"
      } else if (txt.includes("Connected to: ")) {
        templateTextfront = "import pymongo\n"+templateTextfront+"client = pymongo.MongoClient('"+txt.replace("Connected to: ", "")+"')\n"
      }
  }

  if (!defaultpath) {
    returnText = '@app.route("/")\ndef index():\n    return "Hello! Welcome to my API generated using FourMC‘s API Generation Tool."\n'+returnText
  }

  returnTextt = templateTextfront+returnText+templateTextback

  download("server.py", returnTextt)

  document.getElementById('structure-viewer').innerHTML = '<h1 class="title" id="title">Structure Viewer</h1>'+document.getElementById('structure-viewer').innerHTML

}

function pathevent() {
  if (curelement !== "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div><h1 id="ecc" class="ecc">https://localhost/<input type="text" id="pathnameinput" name="pathnameinput" size="8"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
    patheventsubmit = document.getElementById('pathnamesubmit');
    patheventsubmit.addEventListener('click', event => {
      if (document.getElementById("pathnameinput").value === "") {
        if (!defaultpath) {
          document.getElementById("structure-viewer").innerHTML += "<h1>On POST request of / do: </h1>"
          document.getElementById("top-bar").innerHTML = ""
          patheventsubmit.onclick = function () {}
          curelement = "pathevent"
          defaultpath = true
        } else {
          alert("You have to enter a path before submitting!")
        }
      } else {
        document.getElementById("structure-viewer").innerHTML += "<h1>On POST request of /"+document.getElementById("pathnameinput").value.toString().toLowerCase()+" do: </h1>"
        document.getElementById("top-bar").innerHTML = ""
        patheventsubmit.onclick = function () {}
        curelement = "pathevent"
      }
    });
  } else {
    alert("You cannot add a path event right after a path event, add a return element first.")
  }
}

function plaintext() {
  if (curelement === "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div><h1 id="ecc" class="ecc">Return <input type="text" id="pathnameinput" name="pathnameinput" size="8"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
    patheventsubmit = document.getElementById('pathnamesubmit');
    patheventsubmit.addEventListener('click', event => {
      if (document.getElementById("pathnameinput").value === "") {
        alert("You have to enter a response before submitting!")
      } else {
        document.getElementById("structure-viewer").innerHTML += '<h1>Return "'+document.getElementById("pathnameinput").value+'"</h1>'
        document.getElementById("top-bar").innerHTML = ""
        patheventsubmit.onclick = function () {}
        curelement = "plaintext"
      }
    });
  } else if (curelement == undefined) {
    alert("You need to add a path before adding a response.")
  } else {
    alert("You cannot have a return statement right after a return statement. Add a path first.")
  }
}

function jsontext() {
  if (curelement === "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div><h1 id="ecc" class="ecc">Return JSON >> <input type="text" id="pathnameinput" name="pathnameinput" size="12"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
    patheventsubmit = document.getElementById('pathnamesubmit');
    patheventsubmit.addEventListener('click', event => {
      if (document.getElementById("pathnameinput").value === "") {
        alert("You have to enter a response before submitting!")
      } else {
        if (IsJsonString(document.getElementById("pathnameinput").value)) {
          document.getElementById("structure-viewer").innerHTML += '<h1>Return JSON >> '+document.getElementById("pathnameinput").value+'</h1>'
          document.getElementById("top-bar").innerHTML = ""
          curelement = "jsontext"
        } else {
          alert("Your JSON is not valid.")
        }
      }
    });
  } else if (curelement == undefined) {
    alert("You need to add a path before adding a response.")
  } else {
    alert("You cannot have a return statement right after a return statement. Add a path first.")
  }
}

function connectdb() {
  if (!connecteddb) {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div><h1 id="ecc">MongoDB URI >><input type="submit" value="Connect" id="cdbsubmit"></h1><input type="text" id="cdbinput" name="pathnameinput" size="80">'
    patheventsubmit = document.getElementById('cdbsubmit');
    patheventsubmit.addEventListener('click', event => {
      if (document.getElementById("cdbinput").value === "") {
        alert("You have to enter a valid URI before submitting!")
      } else {
        document.getElementById("structure-viewer").innerHTML += '<h1>Connected to: '+document.getElementById("cdbinput").value+'</h1>'
        document.getElementById("top-bar").innerHTML = ""
        connecteddb = true
      }
    });
  } else {
    alert("Your API is already connected to a database!")
  }
}

function clearWorkspace() {
  if (window.confirm("Are you sure you want to clear the workspace?")) {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("structure-viewer").innerHTML = '<h1 class="title" id="title">Structure Viewer</h1>'
  }
}

patheventele.addEventListener('click', pathevent);

plaintextele.addEventListener('click', plaintext);

jsontextele.addEventListener('click', jsontext);

exportbuttonele.addEventListener('click', exportAPI);

connectdbele.addEventListener('click', connectdb);

clearbuttonele.addEventListener('click', clearWorkspace);
