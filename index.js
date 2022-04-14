var curelement = undefined;

const patheventele = document.getElementById('pathevent');
const plaintextele = document.getElementById('returnplaintext');
const jsontextele = document.getElementById('returnjson');
const exportbuttonele = document.getElementById('exportbutton');
var returnText = ""
var txt = ""
var returnTextt = ""
var patheventsubmit = undefined;
var fcount = 1
var defaultpath = false

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
      }
  }

  if (!defaultpath) {
    returnText = '@app.route("/")\ndef index():\n    return "Hello! Welcome to my API generated using FourMC‘s API Generation Tool."\n'+returnText
  }

  returnTextt = "from flask import Flask \nimport json \napp = Flask(__name__) \n# Put extra code here. \napp.run(host='0.0.0.0', port=80)".replace("# Put extra code here. ", returnText)

  download("server.py", returnTextt)

  document.getElementById('structure-viewer').innerHTML = '<h1 class="title" id="title">Structure Viewer</h1>'+document.getElementById('structure-viewer').innerHTML

}

patheventele.addEventListener('click', event => {
  if (curelement !== "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div class><h1 id="ecc" class="ecc">https://localhost/<input type="text" id="pathnameinput" name="pathnameinput" size="8"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
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
        document.getElementById("structure-viewer").innerHTML += "<h1>On POST request of /"+document.getElementById("pathnameinput").value+" do: </h1>"
        document.getElementById("top-bar").innerHTML = ""
        patheventsubmit.onclick = function () {}
        curelement = "pathevent"
      }
    });
  } else {
    alert("You cannot add a path event right after a path event, add a return element first.")
  }
});

plaintextele.addEventListener('click', event => {
  if (curelement === "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div class><h1 id="ecc" class="ecc">Return <input type="text" id="pathnameinput" name="pathnameinput" size="8"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
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
});

jsontextele.addEventListener('click', event => {
  if (curelement === "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div class><h1 id="ecc" class="ecc">Return JSON >> <input type="text" id="pathnameinput" name="pathnameinput" size="12"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
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
});

exportbuttonele.addEventListener('click', exportAPI);
