document.getElementById("bt").addEventListener("click", () => {
  if (document.getElementById("int").value == "") {
    alert("can't be empty");
  } else if (document.getElementById("int").value.includes("stupid")) {
    alert("You Are The Stupid");
    setTimeout(getRepos(document.getElementById("int").value), 200);
  } else {
    getRepos(document.getElementById("int").value);
  }

  function getRepos(username) {
    let request = new XMLHttpRequest();
    request.open("GET", `https://api.github.com/users/${username}/repos`);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        show(JSON.parse(request.responseText));
      } else if (request.readyState !== 4 && request.status === 404) {
        alert("Not Found");
      }
    };

    function show(arr) {
      document.querySelector(".form").style.display = "none";
      document.body.innerHTML += `<table>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Last Update</th>
      </tr>
      </table>`;
      for (let i = 0; i < arr.length; i++) {
        let ht = `
            <tr>
            <td>${arr[i].name}</td>
            <td><a href = "${arr[i].html_url}">Click</a></td>
            <td>${arr[i].updated_at}</td>
          </tr>
            `;
        document.querySelector("table").innerHTML += ht;
      }
    }
  }
});
