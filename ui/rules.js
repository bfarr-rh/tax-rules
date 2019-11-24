
function buildSpousalTransferDMN() {
    var text = `{ 
        "model-namespace" : "https://kiegroup.org/dmn/_66B4EAF2-C9EA-4DE8-B59A-CFB67066E8E0", 
        "model-name" : "Spousal_Transfer", 
        "decision-name" : ["Spousal_Transfer"], 
        "dmn-context" : {"breakDown": "aaa",
                    "concessionClaimed":"",
                    "consideration":"",
                    "PPR":"",
                    "propertyType":"",
                    "s18A_28a":"",
                    "s69aj":"",
                    "thirdPartyTrfee":""} }`;
    var dmnObject = JSON.parse(text);
    dmnObject["dmn-context"].breakDown = $('#breakDownSelect').val();
    dmnObject["dmn-context"].concessionClaimed = $('#concessionClaimedSelect').val();
    dmnObject["dmn-context"].consideration = $('#considerationSelect').val();
    dmnObject["dmn-context"].PPR = $('#PPRSelect').val();
    dmnObject["dmn-context"].propertyType = $('#propertyTypeSelect').val();
    dmnObject["dmn-context"].s18A_28a = $('#s18A_28aSelect').val();
    dmnObject["dmn-context"].s69aj = $('#s69ajSelect').val();
    dmnObject["dmn-context"].thirdPartyTrfee = $('#thirdPartyTrfeeSelect').val();
    $('#step2_json').val(JSON.stringify(dmnObject));
}
function buildKnockoutRuleObj() {
    var text = `
    {
        "lookup": "myStatelessSession",
          "commands": [{
              "insert": {
                "object": {
                    "org.kie.example.traffic.traffic_violation.FormData": {
                        "propertyDetails" : "",
                        "transactionDetails" : "",
                        "concessionType" : "",
                        "transferees" : ""
                    }
                }
            }
          },
          {
            "start-process": {
              "processId": "SRO_Land_Tax.KnockOutRules"
        
            }
          },
          {
            "fire-all-rules": ""
          },
          {
            "get-objects": {
              "out-identifier": "objects"
            }
          }]
        }`;
        
    var knockoutRuleObject = JSON.parse(text);
    //alert(JSON.stringify(knockoutRuleObject));
    //alert( knockoutRuleObject.commands[0].insert.object["org.kie.example.traffic.traffic_violation.FormData"].propertyDetails);
    knockoutRuleObject.commands[0].insert.object["org.kie.example.traffic.traffic_violation.FormData"].propertyDetails = $('#propertyDetailsSelect').val();
    knockoutRuleObject.commands[0].insert.object["org.kie.example.traffic.traffic_violation.FormData"].transactionDetails = $('#transactionDetailsSelect').val();
    knockoutRuleObject.commands[0].insert.object["org.kie.example.traffic.traffic_violation.FormData"].concessionType = $('#concessionTypeSelect').val();
    knockoutRuleObject.commands[0].insert.object["org.kie.example.traffic.traffic_violation.FormData"].transferees = $('#transfereesInput').val();

    $('#step1_json').val(JSON.stringify(knockoutRuleObject));
};

$(document).ready(function() {

    

    $('#step1_showhidetechdetails').click(function() {
        $('#step1_TechnicalDetails').dialog({
            width: 800,
            modal: true,
            height: "auto"
        });
       
        
    });
    $('#step2_showhidetechdetails').click(function() {
        $('#step2_TechnicalDetails').dialog({
            width: 800,
            modal: true,
            height: "auto"
        });
    });

    $('#step1_button').click(function () {
        buildKnockoutRuleObj();
        jQuery.support.cors = true;
        var urlToCall = $('#step1_url').val().replace('{containerId}', $('#containerid').val());
        $.ajax(
            {
                type: "POST",
                url: urlToCall,
                data: $('#step1_json').val(),
                contentType: "application/json; charset=utf-8",
                headers: {
                        'Accept': 'application/json',
                        'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                    },
                dataType: "json",
                success: function (data) {
                    $('#step1_jsonresult').val(JSON.stringify(data));

                    //result":{"execution-results":{"results":[{"value":0,"key":""},{"value":[{"org.kie.example.traffic.traffic_violation.FormData":{"propertyDetails":"Transfer of land use entitlement","result":"ELM",
                    var resultString = JSON.stringify(data.result["execution-results"].results[1].value[0]["org.kie.example.traffic.traffic_violation.FormData"].result);
                    $("#step1_result").html(resultString);
                },
                error: function (msg, url, line) {
                    alert('error trapped msg = ' + msg + ', url = ' + url + ', line = ' + line);

                }
            });
     });

     $('#step2_button').click(function () {
        buildSpousalTransferDMN();
        jQuery.support.cors = true;
        var urlToCall = $('#step2_url').val().replace('{containerId}', $('#containerid2').val());
        $.ajax(
            {
                type: "POST",
                url: urlToCall,
                data: $('#step2_json').val(),
                contentType: "application/json; charset=utf-8",
                headers: {
                        'Accept': 'application/json',
                        'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                    },
                dataType: "json",
                success: function (data) {
                    $('#step2_jsonresult').val(JSON.stringify(data));
                    //alert(data.result["dmn-evaluation-result"]["dmn-context"].Spousal_Transfer["Duty"]);
                    var dutyresult = data.result["dmn-evaluation-result"]["dmn-context"].Spousal_Transfer["Duty"];
                    $('#step2_dutyresult').html(dutyresult);
                    var sectionresult = data.result["dmn-evaluation-result"]["dmn-context"].Spousal_Transfer["SectionAct"];
                    $('#step2_sectionresult').html(sectionresult);
                    //result":{"execution-results":{"results":[{"value":0,"key":""},{"value":[{"org.kie.example.traffic.traffic_violation.FormData":{"propertyDetails":"Transfer of land use entitlement","result":"ELM",
                    //var resultString = JSON.stringify(data.result["execution-results"].results[1].value[0]["org.kie.example.traffic.traffic_violation.FormData"].result);
                    //$("#step1_result").html(resultString);
                },
                error: function (msg, url, line) {
                    alert('error trapped msg = ' + msg + ', url = ' + url + ', line = ' + line);

                }
            });
     });

     $('#step3a_button').click(function () {
        var urlToCall = $('#step3a_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
        doPut(urlToCall,0);
     });

    $('#step3b_button').click(function () {
        var urlToCall = $('#step3b_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
        doPut(urlToCall,0);
     });

     $('#step3c_button').click(function () {
        var urlToCall = $('#step3c_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
             doPut(urlToCall,4);
          });

    $('#step4_button').click(function () {
        jQuery.support.cors = true;

        $.ajax(
            {
                type: "GET",
                url: $('#step4_url').val(),
                contentType: "application/json; charset=utf-8",
                headers: {
                        'Accept': 'application/json',
                        'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                    },
                dataType: "json",
                success: function (data) {

                    var formattedData = JSON.stringify(data, null, '\t');
                    $('#step4_json').val(formattedData);
                    var s = '';
                    var firstItem;
                    jQuery.each(data["task-summary"], function(index, item) {
                        if (!firstItem && item["task-proc-inst-id"] == $('#processInstanceId').val() &&
                            item["task-name"] == 'Hoa Approval') {
                            firstItem = item["task-id"];
                            $('#currentTaskId').val(firstItem);
                        }
                        if (item["task-proc-inst-id"] == $('#processInstanceId').val() &&
                                                    item["task-name"] == 'Hoa Approval') {
                            s = s + ' ' + item["task-id"];
                        }
                    });
                    alert("These Hoa Approval tasks are available for current process :" + s);
                    if (firstItem) {
                        alert("Defaulting using task of " + firstItem );
                    }
                },
                error: function (msg, url, line) {
                    alert('error trapped msg = ' + msg + ', url = ' + url + ', line = ' + line);

                }
            });
     });



 $('#step6a_button').click(function () {
        var urlToCall = $('#step6a_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
        doPut(urlToCall,0);
     });

    $('#step6b_button').click(function () {
        var urlToCall = $('#step6b_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
        doPut(urlToCall,6);
     });


$('#step7a_button').click(function () {
        jQuery.support.cors = true;
        var urlToCall = $('#step7_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{processInstanceId}', $('#processInstanceId').val());
        $.ajax(
            {
                type: "GET",
                url: urlToCall,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                        'Accept': '*/*',
                        'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                    },
                success: function (data) {
                    var formattedData = JSON.stringify(data, null, '\t');
                    $('#step7a_json').val(formattedData);
                },
                error: function (msg, url, line) {
                    alert('error trapped msg = ' + msg + ', url = ' + url + ', line = ' + line);

                }
            });
     });

    $('#step7b_button').click(function () {
        jQuery.support.cors = true;
        var urlToCall = $('#step7_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{processInstanceId}', $('#processInstanceId').val());
        var jsonToSend = $('#step7b_json').val();
        $.ajax(
            {
                type: "POST",
                url: urlToCall,
                data: jsonToSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                        'Accept': '*/*',
                        'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                    },
                complete: function(xhr) {
                     if (xhr.readyState == 4) {
                         if (xhr.status == 201) {
                             alert("Updated");
                             $("#tabs").tabs("option", "active", 7);
                         }
                     } else {
                         alert("Failed");
                     }
                 }
            });
     });

     $('#step8_button').click(function () {
        var urlToCall = $('#step8_url').val().replace('{containerId}', $('#containerid').val());
        urlToCall = urlToCall.replace('{taskid}', $('#currentTaskId').val());
             doPut(urlToCall,8);
          });



     function doPut(urlToCall, tabid) {
        jQuery.support.cors = true;

         $.ajax(
             {
                 type: "PUT",
                 url: urlToCall,
                 contentType: "application/json; charset=utf-8",
                 headers: {
                         'Accept': '*/*',
                         'Authorization': "Basic " + btoa($("#username1").val() + ":" + $("#password1").val())
                     },
                 complete: function(xhr) {
                     if (xhr.readyState == 4) {
                         if (xhr.status == 201) {
                             alert("Updated");
                             if (tabid > 0) {
                                $("#tabs").tabs("option", "active", tabid);
                             }
                         }
                     } else {
                         alert("Failed");
                     }
                 }
             });

     }

});