$(document).ready(function() {

  //setup the form data validator
  $('.soc_form').parsley({
      successClass: 'success',
      errorClass: 'error',
      classHandler: function(el) {
        return el.$element.closest('.control-group');
      },
      errorsWrapper: '<span class=\"help-inline\"></span>',
      errorTemplate: '<span></span>'
  });

  //post, create new SOC
  soc_form.submit(function(){
    $("#title").val($("#titlecode option:selected").text());
    jQuery.post("/api/soc", soc_form.serialize(), function (data, textStatus, jqXHR) {
      console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
      //redirect to previous page after successful form submission
      window.location=referringURL;
    });
    return false;
  });

  //put, update existing SOC
  soc_form_update.submit(function(){
    var obj_id = $("input[name=id]").val();
    $("#title").val($("#titlecode option:selected").text());
    jQuery.ajax({
      url: "/api/soc/"+obj_id,
      data: soc_form_update.serialize(),
      type: 'PUT'
    }).done(function() {
      //redirect to soc list after renaming it
      window.location='/soc/';
    });
    return false;
  });

   // #.put()
  //someone clicked Archive on the update form
  $("#archive").click(function(){
    var obj_id = $("input[name=id]").val();
    var confirm = window.confirm("Are you sure you want to Archive this SOC? You won't have access to the datapoints and tags associated with it anymore.");
    if (confirm===true){
      jQuery.ajax({
        url: "/api/soc/"+obj_id+"/archive",
        data: "archive=true",
        type: 'PUT'
      }).done(function() {
        //redirect to soc list after archiving a soc
        window.location='/soc/';
      });
    }
    return false;
  });
});
