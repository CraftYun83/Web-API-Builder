var curelement = undefined;

const patheventele = document.getElementById('pathevent');
const plaintextele = document.getElementById('returnplaintext');
const jsontextele = document.getElementById('returnjson');
const exportbuttonele = document.getElementById('exportbutton');
var patheventsubmit = undefined;

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

  download("exportedAPI.eapi", document.getElementById('structure-viewer').textContent)

  document.getElementById('structure-viewer').innerHTML = '<h1 class="title" id="title">Structure Viewer</h1>'+document.getElementById('structure-viewer').innerHTML

}

patheventele.addEventListener('click', event => {
  if (curelement !== "pathevent") {
    document.getElementById("top-bar").innerHTML = ""
    document.getElementById("top-bar").innerHTML +='<div class><h1 id="ecc" class="ecc">https://localhost/<input type="text" id="pathnameinput" name="pathnameinput" size="8"><input type="submit" value="Create" id="pathnamesubmit"></h1>'
    patheventsubmit = document.getElementById('pathnamesubmit');
    patheventsubmit.addEventListener('click', event => {
      if (document.getElementById("pathnameinput").value === "") {
        alert("You have to enter a path before submitting!")
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