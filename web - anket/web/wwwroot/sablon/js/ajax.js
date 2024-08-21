//Dosya Yükleme
{
    function uploadFile() {
        var formData = new FormData();
        var fileName = document.getElementById("FileName").value;
        var fileInput = document.getElementById("File");
        var responseMessage = document.getElementById("responseMessage");

        if (!fileName) {
            document.getElementById("FileNameValidation").innerText = "Dosya adı gerekli.";
            return;
        } else {
            document.getElementById("FileNameValidation").innerText = "";
        }

        if (fileInput.files.length === 0) {
            document.getElementById("FileValidation").innerText = "Lütfen bir dosya seçin.";
            return;
        } else {
            document.getElementById("FileValidation").innerText = "";
        }

        formData.append("FileName", fileName);
        formData.append("File", fileInput.files[0]);

        $.ajax({
            url: '/DenemeAjax/Upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                responseMessage.innerHTML = '<div class="alert alert-success">' + response.message + '</div>';
            },
            error: function (xhr, status, error) {
                responseMessage.innerHTML = '<div class="alert alert-danger">Dosya yükleme başarısız.</div>';
            }
        });
    }
}
//Cevaplar ve İstatistikler
{
    $("#btnar").click(function () {
        $.ajax({
            contentType: "application/json",
            dataType: "json",
            type: "GET",
            url: "/Admin/Statistic/ReadAnswer/",
            success: function (data) {
                let tablehtml = "<table class='table table-bordered'> <tr><th>ID</th><th>Cevap</th><th>Soru ID</th></tr>";
                $.each(data, function (index, value) {
                    tablehtml += `<tr><td>${value.surveyAnswer_Id}</td><td>${value.answer}</td><td>${value.surveyQuestion_Id}</td></tr>`;
                });
                tablehtml += "</table>";
                $("#ranswer").html(tablehtml);
            }
        });
    });
    function setStyle(value) {
        const styleValue = value !== "" ? parseInt(value) : "";  // Convert string to integer if not empty
        console.log(styleValue);
        document.getElementById('txtStyle').value = styleValue;
    }
}
//Toast
{
    function showSuccessToast(message) {
        Toastify({
            text: message,
            duration: 3000, // Toast mesajının görünme süresi
            gravity: "top", // Toast mesajının konumu (top veya bottom)
            position: 'center', // Toast mesajının konumu (left, center, right)
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Başarılı işlemler için arka plan rengi
        }).showToast();
    }

    function showErrorToast(message) {
        Toastify({
            text: message,
            duration: 3000, // Toast mesajının görünme süresi
            gravity: "top", // Toast mesajının konumu (top veya bottom)
            position: 'center', // Toast mesajının konumu (left, center, right)
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Hata durumları için arka plan rengi
        }).showToast();
    }
}
//Tooltip
{
    document.addEventListener('DOMContentLoaded', function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });
}

//SEÇENEK
{


    // Create
    $("#btnoc").click(function () {
        let ocvalues = {
            SurveyQuestion_Id: $("#txtocquestionid").val(),
            Option: $("#txtocoption").val(),
            Status: $("#txtocstatus").val()
        };

        $.ajax({
            type: "post",
            url: "/Admin/OptionAjax/CreateOption/",
            data: ocvalues,
            success: function (func) {
                let result = jQuery.parseJSON(func);
                let SurveyOption_Id = result.SurveyOption_Id;
                let SurveyQuestion_Id = result.SurveyQuestion_Id;
                let Option = result.Option;
                let Status = result.Status;

                showSuccessToast("SEÇENEK BAŞARIYLA EKLENDİ !\n\n" + ocvalues.Name);

                // Determine status text and class
                let statusText = Status ? "AKTİF" : "PASİF";
                let statusClass = Status ? "text-success" : "text-danger";

                // Append new survey to the table
                let newRow = `
                <tr>
                    <td class="centered">${SurveyOption_Id}</td>
                    <td>${SurveyQuestion_Id}</td>
                    <td>${Option}</td>
                    <td class="centered ${statusClass}"><b>${statusText}</b></td>
                    <td class="centered">
                        <a class="btn btn-warning update-option" data-option-id=${SurveyOption_Id} data-bs-toggle="modal" data-bs-target="#updateOption" role="button"><b>DÜZENLE</b></a>
                    </td>
                    <td class="centered">
                        <a class="btn btn-danger delete-option" data-option-id=${SurveyOption_Id} role="button"><b>SİL</b></a>
                    </td>
                </tr>`;

                $("#roption tbody").append(newRow);

                // Optionally, clear the form fields after creation
                $("#txtocquestionid").val('');
                $("#txtocoption").val('');
                $("#txtocstatus").val('');

                // Optionally, close the modal here
                $('#createOption').modal('hide');
            }
        });
    });
    //Read
    $(document).ready(function () {
        // Extract SurveyQuestion_Id from the URL if present
        let urlParams = new URLSearchParams(window.location.search);
        let surveyQuestionId = urlParams.get('SurveyQuestion_Id');

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            type: "GET",
            url: "/Admin/OptionAjax/ReadOption/",
            data: { SurveyQuestion_Id: surveyQuestionId }, // Pass the parameter here
            success: function (data) {
                let tablehtml = `
					<table class='table table-striped table-hover table-bordered'>
						<thead class="thead-dark">
							<tr class="centered">
								<th>ID</th>
								<th>BULUNDUĞU SORU</th>
								<th>SEÇENEK</th>
								<th>STATÜ</th>
								<th colspan="2">
									<a data-bs-toggle="modal" data-bs-target="#createOption" class="btn btn-success create-option" role="button"><b>YENİ OLUŞTUR</b></a>
								</th>
							</tr>
						</thead>
						<tbody>`;
                $.each(data, function (index, value) {
                    let statusText = value.status ? "AKTİF" : "PASİF";
                    let statusClass = value.status ? "text-success" : "text-danger";
                    console.log(value);
                    tablehtml += `
						<tr>
							<td class="centered">${value.surveyOption_Id}</td>
							<td>${value.surveyQuestion_Id}</td>
							<td>${value.option}</td>
							<td class="centered ${statusClass}"><b>${statusText}</b></td>
							<td class="centered">
								<a class="btn btn-warning update-option" data-option-id=${value.surveyOption_Id} data-bs-toggle="modal" data-bs-target="#updateOption" role="button"><b>DÜZENLE</b></a>
							</td>
							<td class="centered">
								<a class="btn btn-danger delete-option" data-option-id=${value.surveyOption_Id} role="button"><b>SİL</b></a>
							</td>
						</tr>`;
                });
                tablehtml += `
						</tbody>
					</table>`;
                $("#roption").html(tablehtml);
            }
        });
    });


    // Update
    $(document).ready(function () {
        $('#roption').on('click', '.update-option', function (e) {
            e.preventDefault();

            let id = $(this).data('option-id');
            let row = $(this).closest('tr'); // Get the row to be updated

            // Fetch survey details
            $.ajax({
                type: "GET",
                url: "/Admin/OptionAjax/GetOptionDetails/" + id,
                data: { id: id },
                success: function (response) {
                    if (response) {
                        $("#txtouquestionid").val(response.surveyQuestion_Id);
                        $("#txtouoption").val(response.option);
                        $("#txtoustatus").val(response.status);
                    }
                },
                error: function () {
                    showErrorToast("Hata!");
                }
            });

            // Update survey when the update button is clicked
            $('#btnou').off('click').on('click', function () {
                let valuesforu = {
                    SurveyOption_Id: id,
                    SurveyQuestion_Id: $("#txtouquestionid").val(),
                    Option: $("#txtouoption").val(),
                    Status: $("#txtoustatus").val()
                };

                $.ajax({
                    type: "POST",
                    url: "/Admin/OptionAjax/UpdateOption/",
                    data: valuesforu,
                    success: function () {
                        showSuccessToast("Seçenek Başarıyla Güncellendi");

                        // Update the table row with the new values
                        let statusText = valuesforu.Status ? "AKTİF" : "PASİF";
                        let statusClass = valuesforu.Status ? "text-success" : "text-danger";

                        row.find('td:eq(1)').text(valuesforu.SurveyQuestion_Id); // Update Name
                        row.find('td:eq(2)').text(valuesforu.Option); // Update Description
                        row.find('td:eq(3)').removeClass('text-danger text-success').addClass(statusClass).html('<b>' + statusText + '</b>'); // Update Status

                        // Optionally, close the modal here
                        $('#updateOption').modal('hide');
                    }
                });
            });
        });
    });
    //Delete
    $(document).ready(function () {
        $('#roption').on('click', '.delete-option', function (e) {
            e.preventDefault();

            let id = $(this).data('option-id');
            let row = $(this).closest('tr'); // Get the row to be deleted

            $.ajax({
                url: "/Admin/OptionAjax/DeleteOption/" + id,
                type: "post",
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    showSuccessToast("Seçenek Başarıyla Silindi");

                    // Remove the row from the table
                    row.remove();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    showErrorToast("Seçenek silinirken bir hata oluştu.");
                }
            });
        });
    });

}


//SORU
{


    function getSurveyIdFromUrl() {
        // Mevcut URL'yi al
        const urlParams = new URLSearchParams(window.location.search);

        // Survey_Id parametresini oku
        const surveyId = urlParams.get('Survey_Id');

        // Survey_Id'yi int türüne dönüştür
        return surveyId ? parseInt(surveyId, 10) : null;
    }

    function getQuestionIdFromUrl() {
        // Mevcut URL'yi al
        const urlParams = new URLSearchParams(window.location.search);

        // Survey_Id parametresini oku
        const questionId = urlParams.get('SurveyQuestion_Id');

        return questionId;
    }
    //Create
    $("#btnqc").click(function () {
        let qcvalues = {
            Description: $("#txtqcdescription").val(),
            Style: $("#txtqcstyle").val(),
            Status: $("#txtqcstatus").val(),
            Queue: $("#txtqcqueue").val(),
            Survey_Id: $("#txtqcsurveyid").val()
        };

        $.ajax({
            type: "post",
            url: "/Admin/QuestionAjax/CreateQuestion/",
            data: qcvalues,
            success: function (funcqc) {
                let result = jQuery.parseJSON(funcqc);
                let SurveyQuestion_Id = result.SurveyQuestion_Id;
                if (qcvalues.Style == 2 || qcvalues.Style == 4 || qcvalues.Style == 5) {
                    showSuccessToast("Soru Başariyla Eklendi\n" + qcvalues.Description + " sorusu icin secenek eklemeye yönelndiriliyorsunuz.");
                    setTimeout(function () {
                        window.location.href = '/Admin/OptionAjaxWithId/?SurveyQuestion_Id=' + SurveyQuestion_Id;
                    }, 5000);
                } else {
                    showSuccessToast("Soru Başariyla Eklendi");
                }
            }
        });
    });

    // Read


    $(document).ready(function () {
        const surveyId = getSurveyIdFromUrl();

        $.ajax({
            contentType: "application/json",
            dataType: "json",
            type: "GET",
            url: "/Admin/QuestionAjax/ReadQuestion/",
            data: { Survey_Id: surveyId }, // Survey_Id parametresini gönder
            success: function (data) {
                let tablehtml = `
                <table class='table table-striped table-hover table-bordered'>
                    <thead class="thead-dark">
                        <tr class="centered">
                            <th>ID</th>
                            <th>BULUNDUĞU ANKET</th>
                            <th>SIRA NO</th>
                            <th>AÇIKLAMA</th>
                            <th>STATÜ</th>
                            <th>STİL</th>
                            <th colspan="2">
                                <a data-bs-toggle="modal" data-bs-target="#createQuestion" class="btn btn-success create-question" role="button"><b>YENİ OLUŞTUR</b></a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>`;
                $.each(data, function (index, value) {
                    let statusText = value.status ? "AKTİF" : "PASİF";
                    let statusClass = value.status ? "text-success" : "text-danger"; // Duruma göre renk sinifi
                    let styleText;
                    let styleButton = ""; // Initialize empty string for button

                    switch (value.style) {
                        case 0:
                            styleText = "Kısa Yanıt";
                            break;
                        case 1:
                            styleText = "Paragraf";
                            break;
                        case 2:
                            styleText = "Çoktan Seçmeli";
                            styleButton = `<a href="/Admin/OptionAjax/?SurveyQuestion_Id=${value.surveyQuestion_Id}" class="btn btn-primary"
                                       data-bs-toggle="tooltip"
                                       data-bs-placement="top"
                                       title="Anketin Sorularini Duzenlemek Icin Tikla">
                                       <b>${styleText}</b>
                                    </a>`;
                            break;
                        case 3:
                            styleText = "Dosya Yükleme";
                            break;
                        case 4:
                            styleText = "Onay Kutusu";
                            styleButton = `<a href="/Admin/OptionAjax/?SurveyQuestion_Id=${value.surveyQuestion_Id}" class="btn btn-primary"
                                       data-bs-toggle="tooltip"
                                       data-bs-placement="top"
                                       title="Anketin Sorularini Duzenlemek Icin Tikla">
                                       <b>${styleText}</b>
                                    </a>`;
                            break;
                        case 5:
                            styleText = "Açılır Menü";
                            styleButton = `<a href="/Admin/OptionAjax/?SurveyQuestion_Id=${value.surveyQuestion_Id}" class="btn btn-primary"
                                       data-bs-toggle="tooltip"
                                       data-bs-placement="top"
                                       title="Anketin Sorularını Düzenlemek İçin Tıkla">
                                       <b>${styleText}</b>
                                    </a>`;
                            break;
                        case 6:
                            styleText = "Tarih";
                            break;
                        case 7:
                            styleText = "Saat";
                            break;
                        case 8:
                            styleText = "Tarih ve Saat";
                            break;
                        default:
                            styleText = "Bilinmiyor";
                    }

                    tablehtml += `<tr>
                    <td>${value.surveyQuestion_Id}</td> 
                    <td>${value.survey_Id}</td>
                    <td class="centered">${value.queue}</td>
                    <td>${value.description}</td>
                    <td class="centered ${statusClass}"><b>${statusText}</b></td>
                    <td class="centered">
                        ${styleButton ? styleButton : `<b>${styleText}</b>`}
                    </td>
                    <td class="centered">
                        <a class="btn btn-warning update-question" data-question-id="${value.surveyQuestion_Id}" data-bs-toggle="modal" data-bs-target="#updateQuestion" role="button"><b>DÜZENLE</b></a>
                    </td>
                    <td class="centered">
                        <a class="btn btn-danger delete-question" data-question-id="${value.surveyQuestion_Id}" role="button"><b>SİL</b></a>
                    </td>
                </tr>`;
                });
                tablehtml += "</tbody></table>";
                $("#rquestion").html(tablehtml);

                // Re-bind events for dynamically created elements
                bindEvents();
            }
        });
    });



    // Function to bind events
    function bindEvents() {
        // Update
        $(document).on('click', '.update-question', function (e) {
            e.preventDefault();
            let id = $(this).data('question-id');
            let row = $(this).closest('tr'); // Get the row to be updated

            $.ajax({
                type: "GET",
                url: "/Admin/QuestionAjax/GetQuestionDetails/" + id,
                success: function (response) {
                    if (response) {
                        $("#txtqusurveyid").val(response.survey_Id);
                        $("#txtqustyle").val(response.style);
                        $("#txtqudescription").val(response.description);
                        $("#txtququeue").val(response.queue);
                        $("#txtqustatus").val(response.status);
                    } else {
                        showErrorToast("Soru bilgileri yuklenemedi.");
                    }
                },
                error: function () {
                    showErrorToast("Hata!");
                }
            });

            $("#btnqu").off('click').on('click', function () {
                let valuesforu = {
                    SurveyQuestion_Id: id,
                    Survey_Id: $("#txtqusurveyid").val(),
                    Style: $("#txtqustyle").val(),
                    Description: $("#txtqudescription").val(),
                    Queue: $("#txtququeue").val(),
                    Status: $("#txtqustatus").val()
                };
                $.ajax({
                    type: "post",
                    url: "/Admin/QuestionAjax/UpdateQuestion/",
                    data: valuesforu,
                    success: function (fun4) {
                        showSuccessToast("Soru Basariyla Guncellendi");

                        // Update the table row with the new values
                        let statusText = valuesforu.Status ? "AKTİF" : "PASİF";
                        let statusClass = valuesforu.Status ? "text-success" : "text-danger";

                        row.find('td:eq(1)').text(valuesforu.Survey_Id);
                        row.find('td:eq(5)').text(valuesforu.Style);
                        row.find('td:eq(3)').text(valuesforu.Description);
                        row.find('td:eq(2)').text(valuesforu.Queue);
                        row.find('td:eq(4)').removeClass('text-danger text-success').addClass(statusClass).html('<b>' + statusText + '</b>');

                        // Optionally, close the modal here
                        $('#updateQuestion').modal('hide');
                    }
                });
            });
        });

        // Delete
        $(document).on('click', '.delete-question', function (e) {
            e.preventDefault();
            let id = $(this).data('question-id');
            let row = $(this).closest('tr'); // Get the row to be deleted
            $.ajax({
                url: "/Admin/QuestionAjax/DeleteQuestion/" + id,
                type: "post",
                contentType: "application/json",
                dataType: "Json",
                success: function () {
                    showSuccessToast("Soru Başariyla Silindi");
                    // Remove the row from the table
                    row.remove();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    showErrorToast("Soru silinirken bir hata oluştu.");
                }
            });
        });
    }

}



//Anket
{
    // Create
    $("#btnsc").click(function () {
        let scvalues = {
            Name: $("#txtscname").val(),
            Description: $("#txtscdescription").val(),
            Status: $("#txtscstatus").val()
        };

        $.ajax({
            type: "post",
            url: "/Admin/SurveyAjax/CreateSurvey/",
            data: scvalues,
            success: function (func) {
                let result = jQuery.parseJSON(func);
                let Survey_Id = result.Survey_Id;
                let Name = result.Name;
                let Description = result.Description;
                let Status = result.Status;

                showSuccessToast("ANKET BAŞARIYLA EKLENDİ !\n\n" + scvalues.Name);

                // Determine status text and class
                let statusText = Status ? "AKTİF" : "PASİF";
                let statusClass = Status ? "text-danger" : "text-success";

                // Append new survey to the table
                let newRow = `
                <tr>
                    <td class="centered">${Survey_Id}</td>
                    <td>${Name}</td>
                    <td>${Description}</td>
                    <td class="centered ${statusClass}"><b>${statusText}</b></td>
                    <td class="centered">
                        <a href="/Admin/QuestionAjax/?Survey_Id=${Survey_Id}" class="btn btn-primary"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           title="Anketin Sorularını Düzenlemek İçin Tıkla">
                           <b>SORULARA GİT</b>
                        </a>
                    </td>
                    <td class="centered">
                        <a class="btn btn-warning update-survey" data-survey-id=${Survey_Id} data-bs-toggle="modal" data-bs-target="#updateSurvey" role="button"><b>DÜZENLE</b></a>
                    </td>
                    <td class="centered">
                        <a class="btn btn-danger delete-survey" data-survey-id=${Survey_Id} role="button"><b>SİL</b></a>
                    </td>
                </tr>`;

                $("#rsurvey tbody").append(newRow);

                // Optionally, clear the form fields after creation
                $("#txtscname").val('');
                $("#txtscdescription").val('');
                $("#txtscstatus").val('');

                // Optionally, close the modal here
                $('#createSurvey').modal('hide');
            }
        });
    });
    //Read
    $(document).ready(function () {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            type: "GET",
            url: "/Admin/SurveyAjax/ReadSurvey/",
            success: function (data) {
                let tablehtml = `
					<table class='table table-striped table-hover table-bordered'>
						<thead class="thead-dark">
							<tr class="centered">
								<th>ID</th>
								<th>İSİM</th>
								<th>AÇIKLAMA</th>
								<th>STATÜ</th>
								<th colspan="4">
									<a data-bs-toggle="modal" data-bs-target="#createSurvey" class="btn btn-success update-survey" role="button"><b>YENİ OLUŞTUR</b></a>
								</th>
							</tr>
						</thead>
						<tbody>`;
                $.each(data, function (index, value) {
                    let statusText = value.status ? "AKTİF" : "PASİF";
                    let statusClass = value.status ? "text-success" : "text-danger"; // Duruma göre renk sınıfı

                    tablehtml += `
						<tr>
							<td class="centered">${value.survey_Id}</td>
							<td>${value.name}</td>
							<td>${value.description}</td>
							<td class="centered ${statusClass}"><b>${statusText}</b></td>
							<td class="centered">
								<a href="/Admin/QuestionAjax/?Survey_Id=${value.survey_Id}" class="btn btn-primary"
								   data-bs-toggle="tooltip"
								   data-bs-placement="top"
								   title="Anketin Sorularını Düzenlemek İçin Tıkla">
								   <b>SORULARA GİT</b>
								</a>
							</td>
							<td class="centered">
								<a class="btn btn-warning update-survey" data-survey-id=${value.survey_Id} data-bs-toggle="modal" data-bs-target="#updateSurvey" role="button"><b>DÜZENLE</b></a>
							</td>
							<td class="centered">
								<a class="btn btn-danger delete-survey" data-survey-id=${value.survey_Id} role="button"><b>SİL</b></a>
							</td>
						</tr>`;
                });
                tablehtml += `
						</tbody>
					</table>`;
                $("#rsurvey").html(tablehtml);
            }
        });
    });
    // Update
    $(document).ready(function () {
        $('#rsurvey').on('click', '.update-survey', function (e) {
            e.preventDefault();

            let id = $(this).data('survey-id');
            let row = $(this).closest('tr'); // Get the row to be updated

            // Fetch survey details
            $.ajax({
                type: "GET",
                url: "/Admin/SurveyAjax/GetSurveyDetails/" + id,
                data: { id: id },
                success: function (response) {
                    if (response) {
                        $("#txtsuname").val(response.name);
                        $("#txtsudescription").val(response.description);
                        $("#txtsustatus").val(response.status);
                    }
                },
                error: function () {
                    showErrorToast("Hata!");
                }
            });

            // Update survey when the update button is clicked
            $('#btnsu').off('click').on('click', function () {
                let valuesforu = {
                    Survey_Id: id,
                    Name: $("#txtsuname").val(),
                    Description: $("#txtsudescription").val(),
                    Status: $("#txtsustatus").val()
                };

                $.ajax({
                    type: "POST",
                    url: "/Admin/SurveyAjax/UpdateSurvey/",
                    data: valuesforu,
                    success: function () {
                        showSuccessToast("Anket Başarıyla Güncellendi");

                        // Update the table row with the new values
                        let statusText = valuesforu.Status ? "AKTİF" : "PASİF";
                        let statusClass = valuesforu.Status ? "text-danger" : "text-success";

                        row.find('td:eq(1)').text(valuesforu.Name); // Update Name
                        row.find('td:eq(2)').text(valuesforu.Description); // Update Description
                        row.find('td:eq(3)').removeClass('text-danger text-success').addClass(statusClass).html('<b>' + statusText + '</b>'); // Update Status

                        // Optionally, close the modal here
                        $('#updateSurvey').modal('hide');
                    }
                });
            });
        });
    });
    // Delete
    $(document).ready(function () {
        $('#rsurvey').on('click', '.delete-survey', function (e) {
            e.preventDefault();

            let id = $(this).data('survey-id');
            let row = $(this).closest('tr'); // Get the row to be deleted

            $.ajax({
                url: "/Admin/SurveyAjax/DeleteSurvey/" + id,
                type: "post",
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    showSuccessToast("Anket Başarıyla Silindi");

                    // Remove the row from the table
                    row.remove();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    showErrorToast("Anket silinirken bir hata oluştu.");
                }
            });
        });
    });
    //Status
    {
        function setStatus(value) {
            const status = value === 'true';  // Convert string to boolean
            console.log(status);
            document.getElementById('txtsustatus').value = status;
        }
        function setStatus(value) {
            const status = value === 'true';  // Convert string to boolean
            console.log(status);
            document.getElementById('txtscstatus').value = status;
        }
    }
    //Selector
    {
        function setSurveyId(value) {
            document.getElementById('txtsuid').value = value;
        }
        function setSurveyId(value) {
            document.getElementById('txtsdid').value = value;
        }
    }
}