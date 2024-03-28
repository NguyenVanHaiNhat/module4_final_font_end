function getCityDetail(cityDetail) {
    console.log(cityDetail);
    return `<tr>
<td>${cityDetail.city.name_city}</td>
<td>${cityDetail.city.name_nation}</td>
<td>${cityDetail.area}</td>
<td>${cityDetail.population}</td>
<td>${cityDetail.GDP}</td>
<td>${cityDetail.description}</td>
<td><button type="button" class="btn btn-primary update-btn" data-wallet-id="${cityDetail.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Update
            </button></td>
<td><button type="button" class="btn btn-primary delete-btn" data-wallet-id="${cityDetail.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
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
                content += getCityDetail(data[i]);
            }
            document.getElementById("content1").innerHTML = content;
        }
    });
}
showAllCityDetail();