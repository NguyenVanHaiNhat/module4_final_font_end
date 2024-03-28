function getCity(cityDetail) {
    console.log(cityDetail);
    return `<tr>
<td>${cityDetail.name_city}</td>
<td>${cityDetail.city.name_nation}</td>
<td><button type="button" class="btn btn-primary update-btn" data-city-id="${cityDetail.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Update
            </button></td>
<td><button type="button" class="btn btn-primary delete-btn" data-city-id="${cityDetail.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                Delete
            </button></td>
</tr>
`
}

function showAllCityDetail(){
    $.ajax({
        crossDomain: true,
        type: "GET",
        url: "http://localhost:8080/api/citydetails",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i]);
            }
            document.getElementById("content1").innerHTML = content;
        }
    });
}
function showAllCity(){
    $.ajax({
        crossDomain: true,
        type: "GET",
        url: "http://localhost:8080/api/city",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i]);
            }
        }
    });
}
showAllCity()
cityOption();
function cityOption() {
    $.ajax({
        crossDomain: true,
        type: "get",
        url: "http://www.localhost:8080/api/city",
        contentType: "application/json",
        success: function (cities) {
            let select = document.getElementById("city");
            select.innerHTML = '';
            for (let city of cities) {
                let option = document.createElement("option");
                option.text = city.name_nation;
                option.value = city.id;
                select.appendChild(option);
            }
        }
    });
}
cityOption1();
function cityOption1() {
    $.ajax({
        crossDomain: true,
        type: "get",
        url: "http://www.localhost:8080/api/city",
        contentType: "application/json",
        success: function (cities) {
            let select = document.getElementById("city1");
            select.innerHTML = '';
            for (let city of cities) {
                let option = document.createElement("option");
                option.text = city.name_nation;
                option.value = city.id;
                select.appendChild(option);
            }
        }
    });
}
showAllCityDetail();
function createNewCity(){
    event.preventDefault()
    let newCityDetail = {
        "name_city": document.getElementById("name_city").value,
        "city": {
            "id": document.getElementById("city").value
        },
        "area" : document.getElementById("area").value,
        "population" : document.getElementById("population").value,
        "GDP" : document.getElementById("GDP").value,
        "description" : document.getElementById("description").value,
    }
    console.log(JSON.stringify(newCityDetail));
    $.ajax({
        crossDomain: true,
        type: "POST",
        url: "http://localhost:8080/api/citydetails",
        contentType: "application/json",
        data: JSON.stringify(newCityDetail),
        success: function () {
            showAllCityDetail();
        }
    })
}
function updateCity(){
    event.preventDefault()
    let walletId = document.getElementById("updateWalletId").value; // Lấy ID của ví cần cập nhật
    let newCityDetail = {
        "name_city": document.getElementById("name_city1").value,
        "city": {
            "id": document.getElementById("city1").value
        },
        "area" : document.getElementById("area1").value,
        "population" : document.getElementById("population1").value,
        "GDP" : document.getElementById("GDP1").value,
        "description" : document.getElementById("description1").value,
    }
    console.log(JSON.stringify(newCityDetail));
    $.ajax({
        crossDomain: true,
        type: "PUT",
        url: "http://localhost:8080/api/citydetails/" + walletId,
        contentType: "application/json",
        data: JSON.stringify(newCityDetail),
        success: function () {
            showAllCityDetail();
        }
    })
}
function deleteCity() {
    let walletId = document.getElementById("updateWalletId").value; // Lấy ID của ví cần cập nhật
    $.ajax({
        crossDomain: true,
        type: "DELETE",
        url: "http://localhost:8080/api/citydetails/" + walletId,
        success: function () {
            showAllCityDetail();
        },
        error: function (xhr, status, error) {
            console.error("Error deleting wallet:", error);
        }
    });
}
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("update-btn") || event.target.classList.contains("delete-btn")) {
        let cityId = event.target.getAttribute("data-city-id");
        console.log(cityId);
        // Đặt giá trị của ID vào trường ẩn trong modal
        document.getElementById("updateWalletId").value = cityId;
        document.getElementById("DeleteWalletId").value = cityId;
    }
});